import React from 'react';
import './Footer.css';
import useScrollPosition from './useScrollPosition';

const Footer = () => {
  const isBottom = useScrollPosition();

  return (
    <footer className={`fixed bottom-0 w-full bg-gray-800 text-white p-4 text-center transition-transform duration-300 ${isBottom ? 'translate-y-0' : 'translate-y-full'}`}>
      <p>Created By Priyanshu Thapliyal | © 2024 All rights reserved.</p>
    </footer>
  );
};

export default Footer;
