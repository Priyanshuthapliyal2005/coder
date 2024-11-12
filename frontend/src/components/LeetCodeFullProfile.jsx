import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserId } from './UserIdContext';
import { FaSpinner } from 'react-icons/fa';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CalendarHeatmap } from "@/components/ui/calendar-heatmap";

const LeetCodeFullProfile = () => {
  const { userId } = useUserId();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`https://alfa-leetcode-api.onrender.com/userProfile/${userId}`);
        setProfileData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin" />
      </div>
    );
  if (error) return <p className="p-4">Error: {error}</p>;

  if (!profileData) return null;

  const {
    ranking,
    reputation,
    totalSolved,
    totalQuestions,
    totalSubmissions,
    totalEasy,
    totalMedium,
    totalHard,
    easySolved,
    mediumSolved,
    hardSolved,
    contributionPoint,
    submissionCalendar,
    recentSubmissions,
  } = profileData;

  const createWeightedDates = (submissionCalendar) => {
    return Object.entries(submissionCalendar).map(([dateString, count]) => ({
      date: new Date(Number(dateString) * 1000),
      weight: count,
    }));
  };

  const weightedDates = createWeightedDates(submissionCalendar);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
      {/* General Profile Info */}
      <Card className="border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md hover:border-gray-500 dark:hover:border-gray-500">
        <CardHeader>
          <CardTitle>General Profile Info</CardTitle>
          <CardDescription>View the general profile information.</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Profile for {userId}</h2>
          <p>Ranking: {ranking}</p>
          <p>Reputation: {reputation}</p>
          <p>Contribution Points: {contributionPoint}</p>
        </CardContent>
      </Card>

      {/* Problems Solved */}
      <Card className="border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md hover:border-gray-500 dark:hover:border-gray-500">
        <CardHeader>
          <CardTitle>Problems Solved</CardTitle>
          <CardDescription>View the problems solved statistics.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Total Solved: {totalSolved} / {totalQuestions}</p>
          <p>Easy: {easySolved} / {totalEasy}</p>
          <p>Medium: {mediumSolved} / {totalMedium}</p>
          <p>Hard: {hardSolved} / {totalHard}</p>
        </CardContent>
      </Card>

      {/* Monthly Submission Activity Heatmap */}
      <Card className="border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md hover:border-gray-500 dark:hover:border-gray-500">
        <CardHeader>
          <CardTitle>Monthly Submission Activity</CardTitle>
          <CardDescription>View your monthly submission activity.</CardDescription>
        </CardHeader>
        <CardContent>
          <CalendarHeatmap
            variantClassnames={[
              "text-white hover:text-white bg-green-400 hover:bg-green-400",
              "text-white hover:text-white bg-green-500 hover:bg-green-500",
              "text-white hover:text-white bg-green-700 hover:bg-green-700",
            ]}
            weightedDates={weightedDates}
          />
        </CardContent>
      </Card>

      {/* Last 12 Months Submission Activity Heatmap */}
      <Card className="col-span-1 lg:col-span-3 border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md hover:border-gray-500 dark:hover:border-gray-500">
        <CardHeader>
          <CardTitle>Last 12 Months Submission Activity</CardTitle>
          <CardDescription>View your submission activity over the last 12 months.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <div className="min-w-max">
              <CalendarHeatmap
                variantClassnames={[
                  "text-white hover:text-white bg-blue-400 hover:bg-blue-400",
                  "text-white hover:text-white bg-blue-500 hover:bg-blue-500",
                  "text-white hover:text-white bg-blue-700 hover:bg-blue-700",
                ]}
                weightedDates={weightedDates}
                viewType="year"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Submissions */}
      <Card className="col-span-1 lg:col-span-3 border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md hover:border-gray-500 dark:hover:border-gray-500">
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
          <CardDescription>View recent submissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="mt-4 text-lg font-semibold">Recent Submissions:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentSubmissions && recentSubmissions.map((submission, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{submission.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(submission.timestamp * 1000).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{submission.statusDisplay}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{submission.lang}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeetCodeFullProfile;
