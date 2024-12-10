// AdminHeader.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = ({ toggleSidebar }) => {
  const [isAvatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-gray-900 text-white p-4 sticky top-0 w-full z-10 flex justify-between items-center">
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="text-2xl lg:hidden mr-4"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Logo */}
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      {/* Search Bar */}
      <div className="relative w-1/3 hidden md:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 pl-10 bg-gray-700 text-white rounded focus:outline-none"
        />
        <svg
          className="absolute top-2 left-2 w-6 h-6 text-gray-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 21l-4.35-4.35m1.72-6.88a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
        </svg>
      </div>

      {/* Avatar with Dropdown */}
      <div className="relative">
        <button
          onClick={() => setAvatarMenuOpen(!isAvatarMenuOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <img
            src="https://via.placeholder.com/32"
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span>Admin</span>
        </button>

        {isAvatarMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-2 text-gray-800 z-20">
            <a href="/admin/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
            <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
            <a href="/" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>Logout</a>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
