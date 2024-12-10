// Sidebar.js
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaFilm, FaCog, FaUserCircle, FaSignOutAlt, FaRemoveFormat, FaEdit, FaUserPlus, FaList, FaHome, FaHeart } from 'react-icons/fa'; // Import icons
import { useAuth } from '../../../context/AuthContext';
import { FaBookBookmark, FaMessage, FaPlusMinus } from 'react-icons/fa6';

const UserSidebar = () => {
  const location = useLocation();
  const [userManagementOpen, setUserManagementOpen] = useState(false);
  const [filmManagementOpen, setFilmManagementOpen] = useState(false);
  const { logout } = useAuth(); // Get logout function from AuthContext
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout(); // Call logout function
    navigate("/"); // Redirect to homepage after logout
  };
  const toggleUserManagement = () => {
    setUserManagementOpen(!userManagementOpen);
    setFilmManagementOpen(false); // Close Film Management if open
  };

  const toggleFilmManagement = () => {
    setFilmManagementOpen(!filmManagementOpen);
    setUserManagementOpen(false); // Close User Management if open
  };

  return (
    <aside className="w-64 bg-blue-800 text-white h-full fixed top-15">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Sidebar</h2>

        {/* Dashboard Link */}
        <div>
          <Link 
            to="homepage" 
            className={`flex items-center p-2 rounded mb-2 ${location.pathname === "homepage" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            <FaHome className="mr-2" /> {/* Icon for Dashboard */}
            Dashboard
          </Link>
        </div>

        {/* User Management Section */}
        <div>
          <button
            onClick={toggleUserManagement}
            className="flex items-center w-full p-2 rounded mb-2 hover:bg-gray-700"
          >
            <FaUser className="mr-2" /> {/* Icon for User Management */}
            <span className="flex-1">Movies  Management</span>
            <span>{userManagementOpen ? '▲' : '▼'}</span>
          </button>
          {userManagementOpen && (
            <ul className="pl-4">
              <li className="py-1">
                <Link to="movies/list" className={`flex items-center hover:bg-gray-600 rounded p-1 ${location.pathname === "movies/list" ? "text-gray-300" : ""}`}>
                <FaList className="mr-2" /> {/* Icon for Settings */}
                  Movies List
                </Link>
              </li>
              <li className="py-1">
                <Link to="movies/watchlists" className={`flex items-center hover:bg-gray-600 rounded p-1 ${location.pathname === "/admin/users/add" ? "text-gray-300" : ""}`}>
                <FaUserPlus className="mr-2" /> {/* Icon for Settings */}
                  Watch Lists
                </Link>
              </li>
              <li className="py-1">
                <Link to="movies/favorites" className={`flex items-center hover:bg-gray-600 rounded p-1 ${location.pathname === "/admin/users/edit" ? "text-gray-300" : ""}`}>
                <FaHeart className="mr-2" /> {/* Icon for Settings */}
                Favorite Movies
                </Link>
              </li>
              
            </ul>
          )}
        </div>

        {/* Film Management Section */}
        <div className="mt-4">
          <button
            onClick={toggleFilmManagement}
            className="flex items-center w-full p-2 rounded mb-2 hover:bg-gray-700"
          >
            <FaFilm className="mr-2" /> {/* Icon for Film Management */}
            <span className="flex-1">Series Management</span>
            <span>{filmManagementOpen ? '▲' : '▼'}</span>
          </button>
          {filmManagementOpen && (
            <ul className="pl-4">
               <li className="py-1">
                <Link to="series" className={`flex items-center hover:bg-gray-600 rounded p-1 ${location.pathname === "/admin/films/add" ? "text-gray-300" : ""}`}>
                <FaList className="mr-2" /> {/* Icon for Film Management */}

                  Series List
                </Link>
              </li>
              <li className="py-1">
                <Link to="/admin/films/add" className={`flex items-center hover:bg-gray-600 rounded p-1 ${location.pathname === "/admin/films/add" ? "text-gray-300" : ""}`}>
                <FaBookBookmark className="mr-2" /> {/* Icon for Film Management */}

                  Watchlists
                </Link>
              </li>
              <li className="py-1">
                <Link to="/admin/films/edit" className={`flex items-center hover:bg-gray-600 rounded p-1 ${location.pathname === "/admin/films/edit" ? "text-gray-300" : ""}`}>
                <FaEdit className="mr-2" /> {/* Icon for Settings */}

                  Edit Film
                </Link>
              </li>
              <li className="py-1">
                <Link to="/admin/films/delete" className={`flex items-center hover:bg-gray-600 rounded p-1 ${location.pathname === "/admin/films/delete" ? "text-gray-300" : ""}`}>
                <FaRemoveFormat className="mr-2" /> {/* Icon for Settings */}

                  Delete Film
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Additional Links for Settings, Profile, Logout */}
        <div className="mt-4">
          <Link to="/admin/settings" className={`flex items-center p-2 rounded mb-2 hover:bg-gray-700 ${location.pathname === "/admin/settings" ? "bg-gray-700" : ""}`}>
            <FaCog className="mr-2" /> {/* Icon for Settings */}
            Settings
          </Link>
          <Link to="profile" className={`flex items-center p-2 rounded mb-2 hover:bg-gray-700 ${location.pathname === "/user/profile" ? "bg-gray-700" : ""}`}>
            <FaUserCircle className="mr-2" /> {/* Icon for Profile */}
            Profile
          </Link>
          <Link to="chat" className={`flex items-center p-2 rounded mb-2 hover:bg-gray-700 ${location.pathname === "/admin/profile" ? "bg-gray-700" : ""}`}>
            <FaMessage className="mr-2" /> {/* Icon for Profile */}
            Chat
          </Link>
          <Link to="/" className={`flex items-center p-2 rounded mb-2 hover:bg-gray-700 ${location.pathname === "/admin/logout" ? "bg-gray-700" : ""}`} onClick={handleLogout}>
            <FaSignOutAlt className="mr-2" /> {/* Icon for Logout */}
            Logout
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default UserSidebar;
