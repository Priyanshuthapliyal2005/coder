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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import useScreenWidth from './useScreenWidth';

const LeetcodeContestHistory = () => {
  const { userId, setUserId } = useUserId();
  const [contestHistory, setContestHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const screenWidth = useScreenWidth();

  const contestsPerPage = screenWidth <= 768 ? 4 : 10;

  useEffect(() => {
    const fetchContestHistory = async () => {
      try {
        const response = await axios.post('https://leetcode-proxy.onrender.com/graphql', {
          query: `
            query userContestRankingHistory($username: String!) {
              userContestRankingHistory(username: $username) {
                attended
                problemsSolved
                ranking
                rating
                contest {
                  title
                  startTime
                }
              }
            }
          `,
          variables: { username: userId },
        });
        setContestHistory(response.data.data.userContestRankingHistory || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (userId) {
      fetchContestHistory();
    }
  }, [userId]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin" />
      </div>
    );
  if (error) return <p className="p-4">Error: {error}</p>;

  const contestHistoryWithPrevRating = contestHistory.map((contest, index) => {
    const prevRating = index === 0 ? 1500 : contestHistory[index - 1].rating;
    return { ...contest, prevRating };
  });

  const filteredContestHistory = contestHistoryWithPrevRating.filter(
    (contest) => !(contest.problemsSolved === 0 && contest.prevRating === contest.rating)
  );

  const indexOfLastContest = currentPage * contestsPerPage;
  const indexOfFirstContest = indexOfLastContest - contestsPerPage;
  const currentContests = filteredContestHistory.slice(indexOfFirstContest, indexOfLastContest);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredContestHistory.length / contestsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNewSearch = () => {
    setUserId('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-2xl border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md hover:border-gray-500 dark:hover:border-gray-500">
        <CardHeader>
          <CardTitle>Leetcode Contest History</CardTitle>
          <CardDescription>Check the user Leetcode Contest History.</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Contest History for {userId}</h2>
          <p>{userId} participated in {filteredContestHistory.length} Contest(s)!!</p>
          <div className="flex space-x-2 mt-2">
            <Button onClick={() => setShowResults(true)} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md">
              View Contest History
            </Button>
            <Button onClick={handleNewSearch} className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-md">
              Search Another User
            </Button>
          </div>
          {showResults && (
            <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 flex justify-center items-center">
              <Card className="w-full border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md hover:border-gray-500 dark:hover:border-gray-500" style={{ margin: '-15%' }}>
                <Button
                  onClick={() => setShowResults(false)}
                  className="absolute top-0 right-0 mt-2 mr-2"
                >
                  <FaTimes />
                </Button>
                <CardHeader>
                  <CardTitle>Leetcode Contest History</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentContests.length === 0 ? (
                    <p>The user is legit. No cheating detected.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full mt-4">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="py-2 px-4">Contest</th>
                            <th className="py-2 px-4">Problems Solved</th>
                            <th className="py-2 px-4">Ranking</th>
                            <th className="py-2 px-4">Previous Rating</th>
                            <th className="py-2 px-4">Rating Change</th>
                            <th className="py-2 px-4">After Contest Rating</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentContests.map((contest, index) => {
                            const ratingChange = contest.rating - contest.prevRating;
                            return (
                              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="py-2 px-4">{contest.contest.title}</td>
                                <td className="py-2 px-4">{contest.problemsSolved}</td>
                                <td className="py-2 px-4">{contest.ranking}</td>
                                <td className="py-2 px-4">{contest.prevRating}</td>
                                <td className="py-2 px-4">{ratingChange}</td>
                                <td className="py-2 px-4">{contest.rating}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col items-center">
                  <Pagination className="my-4">
                    <PaginationContent>
                      <PaginationPrevious
                        className="mr-2"
                        onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}
                      />
                      {pageNumbers.map((number) => (
                        <PaginationItem key={number}>
                          <PaginationLink
                            isActive={number === currentPage}
                            onClick={() => paginate(number)}
                          >
                            {number}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationNext
                        className="ml-2"
                        onClick={() => paginate(currentPage < pageNumbers.length ? currentPage + 1 : currentPage)}
                      />
                    </PaginationContent>
                  </Pagination>
                  <p className="text-sm text-gray-500 mt-2">Note: The data is fetched from Leetcode API.</p>
                </CardFooter>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export { LeetcodeContestHistory };
