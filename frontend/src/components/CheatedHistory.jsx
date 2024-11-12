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

const CheatedHistory = () => {
  const { userId, setUserId } = useUserId();
  const [contestHistory, setContestHistory] = useState([]);
  const [contributionPoints, setContributionPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileResponse = await axios.get(`https://alfa-leetcode-api.onrender.com/userProfile/${userId}`);
        setContributionPoints(profileResponse.data.contributionPoint || 0);

        const contestResponse = await axios.post('https://leetcode-proxy.onrender.com/graphql', {
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

        setContestHistory(contestResponse.data.data.userContestRankingHistory || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfileData();
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

  const contestHistoryWithPrevRating = contestHistory.map((contest, index) => {
    const prevRating = index === 0 ? 1500 : contestHistory[index - 1].rating;
    return { ...contest, prevRating };
  });

  const cheatedContests = contestHistoryWithPrevRating.filter(
    (contest) =>
      contest.problemsSolved === 0 &&
      contest.rating < contest.prevRating &&
      contributionPoints < 100
  );

  const isCheater = cheatedContests.length > 0 && cheatedContests.length<3 && contributionPoints < 100;

  const handleNewSearch = () => {
    setUserId('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[600px] border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md hover:border-gray-500 dark:hover:border-gray-500">
        <CardHeader>
          <CardTitle>Leetcode Cheat Detector</CardTitle>
          <CardDescription>Check if the user has cheated in contests.</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Cheating History for {userId}</h2>
          <p>
            {isCheater
              ? `${userId} Cheated in recently ${cheatedContests.length} Contest(s)!`
              : `${userId} Cheated in recently ${cheatedContests.length} Contest(s)`}
          </p>
          <div className="flex space-x-2 mt-2">
            <Button onClick={() => setShowResults(true)} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md">
              View Cheated Contests
            </Button>
            <Button onClick={handleNewSearch} className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-md">
              Search Another User
            </Button>
          </div>
          {showResults && (
            <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 flex justify-center items-center">
              <Card className="w-full border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md hover:border-gray-500 dark:hover:border-gray-500">
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
                  {cheatedContests.length === 0 ? (
                    <p>The user is legit. No cheating detected.</p>
                  ) : (
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
                        {cheatedContests.map((contest, index) => {
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
                  )}
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">Note: The data is fetched from Leetcode API.</p>
                </CardFooter>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export { CheatedHistory };
