import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SetUserId from './components/SetUserId';
import SetUserId1 from './components/SetUserId1';
import { LeetcodeContestHistory } from '@/components/LeetCodeContestHistory';
import { CheatedHistory } from './components/CheatedHistory';
import LeetcodeFullProfile from './components/LeetCodeFullProfile';
import UserIdContext from './components/UserIdContext';
import Home from './components/Home';
import Footer from './components/Footer';
import Contact from './components/Contact';
import TermsAndConditions from './components/Terms/t&c'; // Ensure this line imports TermsAndConditions
import PrivacyPolicy from './components/Terms/pcy';
import CpCheated  from './components/CpCheatedHistory';

const App = () => {
  const [userId, setUserId] = useState(null);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/leetcode/cheat-detector" element={userId ? <CheatedHistory /> : <SetUserId />} />
              <Route path="/codeforces/cheat-detector" element={userId ? <CpCheated /> : <SetUserId1 />} />
              <Route path="/leetcode/full-profile" element={userId ? <LeetcodeFullProfile /> : <SetUserId />} />
              <Route path="/leetcode/contest-history" element={userId ? <LeetcodeContestHistory /> : <SetUserId />} />
              <Route path="/codeforces/*" element={<div className="text-center mt-5">Coming Soon!</div>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserIdContext.Provider>
  );
};

export default App;
