// Sidebar.js
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaFilm, FaCog, FaUserCircle, FaSignOutAlt, FaRemoveFormat, FaEdit, FaUserPlus, FaList, FaHome, FaRegPlusSquare } from 'react-icons/fa'; // Import icons
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const [userManagementOpen, setUserManagementOpen] = useState(false);
  const [filmManagementOpen, setFilmManagementOpen] = useState(false);
  const [seriesManagementOpen, setSeriesManagementOpen] = useState(false);
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

  const toggleSeriesManagementOpen = () => {
    setSeriesManagementOpen(!seriesManagementOpen); // Toggle Series Management open/close
  };

  return (
    <aside className="w-64 bg-blue-400 text-white h-full fixed top-15">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Sidebar</h2>

        {/* Dashboard Link */}
        <div>
          <Link 
            to="/admin/dashboard" 
            className={`flex items-center p-2 rounded mb-2 ${location.pathname === "/admin/dashboard" ? "bg-gray-700" : "hover:bg-gray-700"}`}
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
            <span className="flex-1">User Management</span>
            <span>{userManagementOpen ? '▲' : '▼'}</span>
          </button>
          {userManagementOpen && (
            <ul className="pl-4">
              <li className="py-1">
                <Link to="/admin/users/list" className={`flex items-center hover:bg-gray-600 rounded p-1 ${location.pathname === "/admin/users/list" ? "text-gray-300" : ""}`}>
                  <FaList className="mr-2" /> {/* Icon for Settings */}
                  User List
                </Link>
              </li>
              <li className="py-1">
                <Link to="/admin/users/add" className={`flex items-center hover:bg-gray-600 rounded p-1 ${location.pathname === "/admin/users/add" ? "text-gray-300" : ""}`}>
                  <FaUserPlus className="mr-2" /> {/* Icon for Settings */}
                  Add User
                </Link>
              </li>
              <li className="py-1">
                <Link to="/admin/users/edit" className={`flex items-center hover:bg-gray-600 rounded p-1 ${location.pathname === "/admin/users/edit" ? "text-gray-300" : ""}`}>
                  <FaEdit className="mr-2" /> {/* Icon for Settings */}
                  Edit User
                </Link>
              </li>
              <li className="py-1">
                <Link to="/admin/users/delete" className={`flex items-center hover:bg-gray-600 rounded p-1 ${location.pathname === "/admin/users/delete" ? "text-gray-300" : ""}`}>
                  Delete User
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
            <span className="flex-1">Film Management</span>
            <span>{filmManagementOpen ? '▲' : '▼'}</span>
          </button>
          {filmManagementOpen && (
            <ul className="pl-4">
              <li className="py-1">
                <Link to="/admin/films/list" className={`flex items-center hover:bg-gray-600 rounded p-1 ${location.pathname === "/admin/films/add" ? "text-gray-300" : ""}`}>
                  <FaList className="mr-2" /> {/* Icon for Film Management */}
                  Film List
                </Link>
              </li>
              <li className="py-1">
                <Link to="/admin/films/add" className={`flex items-center hover:bg-gray-600 rounded p-1 ${location.pathname === "/admin/films/add" ? "text-gray-300" : ""}`}>
                  Add Film
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

        {/* Series Management Section */}
        <div className="mt-4">
          <button
            onClick={toggleSeriesManagementOpen}
            className="flex items-center w-full p-2 rounded mb-2 hover:bg-gray-700"
          >
            <FaFilm className="mr-2" /> {/* Icon for Series Management */}
            <span className="flex-1">Series Management</span>
            <span>{seriesManagementOpen ? '▲' : '▼'}</span>
          </button>
          {seriesManagementOpen && (
            <ul className="pl-4">
              <li className="py-1">
                <Link to="/admin/serie/list" className={`flex items-center hover:bg-gray-600 rounded p-1 ${location.pathname === "/admin/serie/list" ? "text-gray-300" : ""}`}>
                  <FaList className="mr-2" /> {/* Icon for Series Management */}
                  Series List
                </Link>
              </li>
              <li className="py-1">
                <Link to="/admin/series/add" className={`flex items-center hover:bg-gray-600 rounded p-1 ${location.pathname === "/admin/series/add" ? "text-gray-300" : ""}`}>
                <FaRegPlusSquare className="mr-2" /> {/* Icon for Settings */}

                  Add Series
                </Link>
              </li>
              <li className="py-1">
                <Link to="/admin/films/edit" className={`flex items-center hover:bg-gray-600 rounded p-1 ${location.pathname === "/admin/films/edit" ? "text-gray-300" : ""}`}>
                  <FaRegPlusSquare className="mr-2" /> {/* Icon for Settings */}
                  Add Seasons
                </Link>
              </li>
              <li className="py-1">
                <Link to="/admin/films/delete" className={`flex items-center hover:bg-gray-600 rounded p-1 ${location.pathname === "/admin/films/delete" ? "text-gray-300" : ""}`}>
                  <FaRemoveFormat className="mr-2" /> {/* Icon for Settings */}
                  Add Episodes 
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
          <Link to="/admin/profile" className={`flex items-center p-2 rounded mb-2 hover:bg-gray-700 ${location.pathname === "/admin/profile" ? "bg-gray-700" : ""}`}>
            <FaUserCircle className="mr-2" /> {/* Icon for Profile */}
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center p-2 rounded mb-2 hover:bg-gray-700 w-full text-left"
          >
            <FaSignOutAlt className="mr-2" /> {/* Icon for Logout */}
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
