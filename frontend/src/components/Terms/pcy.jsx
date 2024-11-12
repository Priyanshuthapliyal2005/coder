import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PrivacyPolicy = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-4xl h-auto border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md hover:border-gray-500 dark:hover:border-gray-500">
        <CardHeader>
          <CardTitle className="text-xl">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg p-4">
            <h2 className="text-xl font-bold mt-4">Introduction</h2>
            <p>We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your personal information.</p>
            <p><strong>We do not collect any personal data</strong>. We value your privacy and do not gather any information that can be used to identify you.</p>
            <p>If you have any questions regarding our privacy practices or wish to contact us, please use the contact form provided or reach out to us via LinkedIn.</p>
            <h2 className="text-xl font-bold mt-4">How We Use Your Information</h2>
            <p>Since we do not collect any personal information, there is no data to use. Therefore, we do not engage in any activities related to data usage.</p>
            <h2 className="text-xl font-bold mt-4">Contact Us</h2>
            <p>For any inquiries regarding our Privacy Policy or to reach out to us, please use the contact form on our website or connect with us via LinkedIn.</p>
            <p>Thank you for taking the time to review our Privacy Policy. Your privacy and trust are important to us.</p>

            {showMore && (
              <div>
                <h2 className="text-xl font-bold mt-4">Additional Information</h2>
                <p>Here, you can provide more details or expand on any other relevant topics as needed.</p>
                <p>Feel free to customize this section further based on your specific privacy policy needs.</p>
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

export default PrivacyPolicy;
