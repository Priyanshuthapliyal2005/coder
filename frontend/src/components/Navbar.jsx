import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLeetCodeDropdownOpen, setIsLeetCodeDropdownOpen] = useState(false);
  const [isCodeforcesDropdownOpen, setIsCodeforcesDropdownOpen] = useState(false);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const toggleLeetCodeDropdown = (event) => {
    event.stopPropagation(); // Prevent the click from closing the menu
    setIsLeetCodeDropdownOpen(!isLeetCodeDropdownOpen);
    setIsCodeforcesDropdownOpen(false);
  };

  const toggleCodeforcesDropdown = (event) => {
    event.stopPropagation(); // Prevent the click from closing the menu
    setIsCodeforcesDropdownOpen(!isCodeforcesDropdownOpen);
    setIsLeetCodeDropdownOpen(false);
  };

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest('.dropdown-parent')) {
        setIsLeetCodeDropdownOpen(false);
        setIsCodeforcesDropdownOpen(false);
      }
    };

    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, []);

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">Coders</NavLink>
      <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={handleMobileMenuToggle}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li>
          <NavLink to="/" onClick={handleMobileMenuToggle}>Home</NavLink>
        </li>
        <li className="dropdown-parent">
          <div className="dropdown-trigger" onClick={toggleLeetCodeDropdown}>LeetCode</div>
          <ul className={`dropdown ${isLeetCodeDropdownOpen ? 'dropdown-active' : ''}`}>
            <li><NavLink to="/leetcode/cheat-detector" onClick={handleMobileMenuToggle}>Cheat Detector</NavLink></li>
            <li><NavLink to="/leetcode/full-profile" onClick={handleMobileMenuToggle}>Full Profile</NavLink></li>
            <li><NavLink to="/leetcode/contest-history" onClick={handleMobileMenuToggle}>Contest History</NavLink></li>
          </ul>
        </li>
        <li className="dropdown-parent">
          <div className="dropdown-trigger" onClick={toggleCodeforcesDropdown}>Codeforces</div>
          <ul className={`dropdown ${isCodeforcesDropdownOpen ? 'dropdown-active' : ''}`}>
            <li><NavLink to="/codeforces/cheat-detector" onClick={handleMobileMenuToggle}>Cheat Detector</NavLink></li>
            <li><NavLink to="/codeforces/full-profile" onClick={handleMobileMenuToggle}>Full Profile</NavLink></li>
            <li><NavLink to="/codeforces/contest-history" onClick={handleMobileMenuToggle}>Contest History</NavLink></li>
          </ul>
        </li>
        <li>
          <NavLink to="/contact" onClick={handleMobileMenuToggle}>Contact</NavLink>
        </li>
        <li>
          <NavLink to="https://www.linkedin.com/in/priyanshu-thapliyal/" onClick={handleMobileMenuToggle}>Linkedin</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;