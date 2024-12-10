// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaFilm, FaVideo, FaUserPlus, FaUsers, FaList } from "react-icons/fa";
import Charts from "./Charts";
import FilmList from '../Admin/FilmManagment/FilmList'
import { Link, useLocation } from "react-router-dom";
export default function DashboardCards() {
  const [data, setData] = useState({
    totalUsers: 0,
    totalFilms: 0,
    totalSeries: 0,
    newRegistrations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard"); // Adjust the URL as needed
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4 space-y-8 ">
      {/* Dashboard Title */}
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <Link to="/admin/users/list" className={`flex items-center  p-1 ${location.pathname === "/admin/users/add" ? "text-gray-300" : ""}`}>
        <div className="bg-blue-500 w-full text-white p-4 rounded-lg flex items-center flex-row">
          <FaUsers className="text-2xl mr-4" />
                <div>
            <p className="text-xl font-bold">{data.totalUsers}</p>     

            <p>Total Users</p>
          </div>
        </div>
                </Link>
        <div className="bg-green-500 text-white p-4 rounded-lg flex items-center">
          <FaFilm className="text-2xl mr-4" />
          <div>
            <p className="text-xl font-bold">{data.totalFilms}</p>
            <p>Total Films</p>
          </div>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg flex items-center">
          <FaVideo className="text-2xl mr-4" />
          <div>
            <p className="text-xl font-bold">{data.totalSeries}</p>
            <p>Total Movies</p>
          </div>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg flex items-center">
          <FaUserPlus className="text-2xl mr-4" />
          <div>
            <p className="text-xl font-bold">{data.newRegistrations}</p>
            <p>New Registrations</p>
          </div>
        </div>
      </div>
      <Charts />
      {/* Recent Activities */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Recent Activities</h2>
        <ul className="space-y-2 mt-4">
          {/* You can fetch recent activities similarly and map them here */}
          <li>New User Registered: John Doe</li>
          <li>Film Added: "The Great Adventure"</li>
          <li>Movie Removed: "Old Classic"</li>
          <li>User Profile Updated: Jane Smith</li>
        </ul>
      </div>

      {/* Graphs and Charts Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">User Growth</h2>
          <p>Graph Placeholder - User signups over time</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
          <h2 className="text-lg font-semibold">Popular Films</h2>
          <p>Graph Placeholder - Top-viewed films</p>
          {/* here is the top mvies  */}
          {/* <FilmList className="px-4"/> */}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <div className="flex flex-wrap gap-4 mt-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
            Add User
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg">
            Add Film
          </button>
          <button className="bg-purple-500 text-white py-2 px-4 rounded-lg">
            Add Movie
          </button>
        </div>
      </div>
    </div>
  );
}
