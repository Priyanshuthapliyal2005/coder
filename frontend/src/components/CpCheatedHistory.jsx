import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserId } from './UserIdContext';
import { FaSpinner, FaTimes } from 'react-icons/fa';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ITEMS_PER_PAGE = 5;

const CpCheated = () => {
  const { userId, setUserId } = useUserId();
  const [contestData, setContestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const response = await axios.get(`https://codeforces.com/api/user.status?handle=${userId}`);
        const result = response.data;
        if (result.status !== 'OK') {
          setError(`UserId ${userId} not found!`);
          setLoading(false);
        } else {
          const solved = result.result
            .filter(
              submission =>
                submission.author.participantType === 'CONTESTANT' ||
                submission.author.participantType === 'OUT_OF_COMPETITION'
            )
            .reduce((acc, submission) => {
              if (!acc[submission.contestId]) {
                acc[submission.contestId] = {
                  contestId: submission.contestId,
                  problems: 0,
                  skippedProblems: 0,
                };
              }
              acc[submission.contestId].problems++;
              if (submission.verdict === 'SKIPPED') {
                acc[submission.contestId].skippedProblems++;
              }
              return acc;
            }, {});

          const cheated = Object.values(solved).filter(
            contest => contest.problems > 1 && contest.skippedProblems === contest.problems
          );

          for (const contest of cheated) {
            const contestInfo = await axios.get(`https://codeforces.com/api/contest.standings?contestId=${contest.contestId}&handles=${userId}`);
            if (contestInfo.data.status === 'OK') {
              contest.contestName = contestInfo.data.result.contest.name;
              contest.submissionLink = `https://codeforces.com/submissions/${userId}/contest/${contest.contestId}`;
            }
          }

          setContestData(cheated);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (userId) {
      fetchContestData();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p className="p-4">Error: {error}</p>;
  }

  const handleNewSearch = () => {
    setUserId('');
  };

  const totalPages = Math.ceil(contestData.length / ITEMS_PER_PAGE);
  const currentData = contestData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[600px] border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md hover:border-gray-500 dark:hover:border-gray-500">
        <CardHeader>
          <CardTitle>Codeforces Cheat Detector</CardTitle>
          <CardDescription>Check if the user has cheated in contests.</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Cheating History for {userId}</h2>
          <p>{userId} Cheated in {contestData.length} Contest(s)!!</p>
          <div className="flex space-x-2 mt-2">
            <Button onClick={() => setShowResults(true)} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md">
              View Cheated Contests
            </Button>
            <Button onClick={handleNewSearch} className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-md">
              Search Another User
            </Button>
          </div>
          {showResults && (
            <div className="fixed inset-0 bg-white bg-opacity-90 flex justify-center items-center z-50">
              <Card className="relative w-full max-w-4xl border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md hover:border-gray-500 dark:hover:border-gray-500">
              <Button
                  onClick={() => setShowResults(false)}
                  className="absolute top-0 right-0 mt-2 mr-2"
                >
                  <FaTimes />
                </Button>
                <CardHeader>
                  <CardTitle>Cheated Contests</CardTitle>
                </CardHeader>
                <CardContent>
                  {contestData.length === 0 ? (
                    <p>The user is legit. No cheating detected.</p>
                  ) : (
                    <div>
                      <table className="w-full mt-4">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="py-2 px-4">Contest ID</th>
                            <th className="py-2 px-4">Contest Name</th>
                            <th className="py-2 px-4">Link</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentData.map((contest, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                              <td className="py-2 px-4">{contest.contestId}</td>
                              <td className="py-2 px-4">{contest.contestName}</td>
                              <td className="py-2 px-4">
                                <Button
                                  onClick={() => window.open(contest.submissionLink, '_blank')}
                                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md"
                                >
                                  View Submissions
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="flex justify-between items-center mt-4">
                        <Button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-md"
                        >
                          Previous
                        </Button>
                        <p>Page {currentPage} of {totalPages}</p>
                        <Button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-md"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">Note: The data is fetched from Codeforces API.</p>
                </CardFooter>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CpCheated;
