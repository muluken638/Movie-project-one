// src/Layout.js
import React, { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePageHeader = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { logout } = useAuth(); // Get logout function from AuthContext
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleLogout = () => {
    logout(); // Call logout function
    navigate("/"); // Redirect to homepage after logout
  };
  return (
    <div>
      <header className="bg-gray-900 text-white p-4 sticky top-0 z-50">
        <nav className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold"><Link to="/homepage"> Miller </Link>  </div>

          {/* Centered Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full px-4 py-2 rounded-full text-black"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Navigation Links and User Icon */}
          <div className="flex items-center space-x-4">
            {/* Links for larger screens */}
            <ul className="hidden md:flex space-x-4">
              <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
              <li><Link to="/about" className="hover:text-gray-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gray-400">Contact us</Link></li>
              <li><Link to="/login" className="hover:text-gray-400">Login</Link></li>
            </ul>

            {/* Avatar with Dropdown Menu */}
           

            {/* Hamburger Menu for Small Screens */}
            <button
              className="md:hidden text-2xl focus:outline-none"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              ☰
            </button>
          </div>
        </nav>

        {/* Drawer Menu for Small Screens */}
        {isDrawerOpen && (
          <div className="fixed top-0 left-0 w-3/4 h-full bg-gray-800 text-white z-40 p-4">
            <button
              className="text-2xl mb-4"
              onClick={() => setIsDrawerOpen(false)}
            >
              ✕
            </button>
            <ul className="space-y-4 text-lg">
              <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
              <li><Link to="/about" className="hover:text-gray-400">About</Link></li>
              <li><Link to="/contact" className="hover:text-gray-400">Contact</Link></li>
              <li><Link to="/login" className="hover:text-gray-400">Login</Link></li>
            </ul>
          </div>
        )}
      </header>
    </div>
  )
}

export default HomePageHeader
