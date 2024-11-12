import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TermsAndConditions = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-4xl h-auto border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md hover:border-gray-500 dark:hover:border-gray-500">
        <CardHeader>
          <CardTitle className="text-xl">Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg p-4">
            <p>Welcome to our Cheating Detection System. These Terms and Conditions govern your use of our system, and by using our system, you agree to comply with these terms.</p>
            <h2 className="text-xl font-bold mt-4">Definitions</h2>
            <p>1. <strong>Service</strong>: The Cheating Detection System operated by our team.</p>
            <p>2. <strong>User</strong>: Anyone who uses our Service.</p>
            <p>3. <strong>Content</strong>: Any text, images, or other materials uploaded or generated through our Service.</p>
            <h2 className="text-xl font-bold mt-4">User Responsibilities</h2>
            <p>Users must comply with all applicable laws and not use the Service for any unlawful or unauthorized purpose.</p>
            {/* Add more sections here */}

            {showMore && (
              <div>
                <h2 className="text-xl font-bold mt-4">Results Accuracy</h2>
                <p>While we strive to provide accurate results, our Cheating Detection System may not be 100% accurate and results may sometimes be incorrect.</p>
                <h2 className="text-xl font-bold mt-4">Project Information</h2>
                <p><strong>Cheating Detection System | React, JavaScript, MongoDB, Express.js, Node.js, GraphQL</strong></p>
                <ul className="list-disc pl-5">
                  <li>Engineered a comprehensive system to detect and flag potential cheaters in coding contests with 70% accuracy.</li>
                  <li>Integrated a browser extension to warn users about flagged cheaters in real-time.</li>
                  <li>Implemented GraphQL for efficient fetching and displaying of full contest history and profile statistics of users.</li>
                </ul>
              </div>
            )}
          </div>
          <div className="text-center">
            <Button onClick={toggleShowMore}>
              {showMore ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsAndConditions;
