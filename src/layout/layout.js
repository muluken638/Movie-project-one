// src/Layout.js
import React, { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 sticky top-0 z-50">
        <nav className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold">MovieFlix</div>

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
              <li><a href="#" className="hover:text-gray-400">Home</a></li>
              <li><a href="#" className="hover:text-gray-400">Movies</a></li>
              <li><a href="#" className="hover:text-gray-400">Series</a></li>
              <li><a href="#" className="hover:text-gray-400">Contact</a></li>
            </ul>

            {/* Avatar with Dropdown Menu */}
            <div className="relative">
              <FaUserCircle
                className="text-2xl cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg py-2">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">Profile</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">Settings</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">Logout</a>
                </div>
              )}
            </div>

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
              <li><a href="#" className="hover:text-gray-400">Home</a></li>
              <li><a href="#" className="hover:text-gray-400">Movies</a></li>
              <li><a href="#" className="hover:text-gray-400">Series</a></li>
              <li><a href="#" className="hover:text-gray-400">Contact</a></li>
            </ul>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} MovieFlix. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
