import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/ui/hover-card';
import { NavLink } from 'react-router-dom';
import codingContestImage from '@/assets/image.png';

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 sm:p-0">
      <Card className="w-full sm:w-[850px] shadow-lg">
        <div className="w-full h-48 overflow-hidden">
          <img
            src={codingContestImage}
            alt="Coding Contest"
            className="w-full h-full object-contain"
            style={{ objectPosition: 'center right' }}
          />
        </div>
        <CardHeader>
          <CardTitle>Why Cheating in Coding Contests is a Laughable Idea</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Ah, cheating in coding contests. It's like trying to use a rubber duck to row a boat—it might seem clever, but it's not going to get you very far. Contest ranks might look shiny and impressive, but did you know recruiters have a way of seeing right through them? Yes, you read that right!
          </CardDescription>
          <CardDescription>
            Our platform's state-of-the-art cheat detectors are like the Sherlock Holmes of the coding world. They can sniff out foul play faster than you can say "for loop." So, for those who think cheating will land them a dream job, think again. Our platform ensures that only the truly skilled stand out, and the cheaters? Well, let's just say their plans sink like the aforementioned rubber duck.
          </CardDescription>
          <CardDescription>
            So next time you think about taking a shortcut in a coding contest, remember: it's not just your rank at stake, it's your reputation. Happy coding, and may the best (and honest) coder win!
          </CardDescription>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Note: Use desktop mode for better readability.
          </p>
        </CardContent>
        <CardFooter>
          <HoverCard>
            <HoverCardTrigger>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                Read More
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="p-4 bg-white shadow-lg rounded-lg">
              <div className="flex flex-col space-y-2">
                <NavLink to="/leetcode/cheat-detector" className="text-blue-500 hover:underline">
                  Leetcode Cheat Detector
                </NavLink>
                <NavLink to="/leetcode/contest-history" className="text-blue-500 hover:underline">
                  Leetcode Contest History
                </NavLink>
                <NavLink to="/leetcode/full-profile" className="text-blue-500 hover:underline">
                  Leetcode Full Profile
                </NavLink>
                <NavLink to="/codeforces/cheat-detector" className="text-blue-500 hover:underline">
                  Codeforces Cheat Detector
                </NavLink>
                <NavLink to="/codeforces/contest-history" className="text-blue-500 hover:underline">
                  Codeforces Contest History (Coming Soon!)
                </NavLink>
                <NavLink to="/codeforces/full-profile" className="text-blue-500 hover:underline">
                  Codeforces Full Profile (Coming Soon!)
                </NavLink>
              </div>
            </HoverCardContent>
          </HoverCard>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;
