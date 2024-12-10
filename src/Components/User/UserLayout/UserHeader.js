import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useSearch } from "../../../context/SearchContext";
import { IoNotificationsCircle } from "react-icons/io5";

const UserHeader = ({ toggleSidebar }) => {
  const [isAvatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [userData, setUserData] = useState(null); // To store user data from backend
  const { logout } = useAuth();
  const { performSearch } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/profile"); // Replace with your API endpoint
        const data = await response.json();
        setUserData(data); // Assuming the response contains user data like { avatar, name }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearchChange = (event) => {
    performSearch(event.target.value);
  };

  if (!userData) {
    return <div>Loading...</div>; // Show loading state until user data is fetched
  }

  return (
    <header className="bg-blue-900 text-white p-4 sticky top-0 w-full z-10 flex justify-between items-center">
      <button className="text-2xl lg:hidden mr-4" onClick={toggleSidebar}>
        ☰
      </button>

      <h1 className="text-xl font-semibold">User Dashboard</h1>

      <div className="relative w-1/3 hidden md:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 pl-10 bg-gray-700 text-white rounded focus:outline-none"
          onChange={handleSearchChange}
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
       <span>{userData?.fullname}</span> {/* Make sure the data is accessible */}
<img
  src={userData?.avatar} // Check if the avatar URL is correct
  alt="Avatar"
  className="w-8 h-8 rounded-full"
/>
 </button>

        {isAvatarMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-2 text-gray-800 z-20">
            <Link
              to="profile"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Profile
            </Link>
            <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default UserHeader;
