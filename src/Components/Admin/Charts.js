// src/components/Charts.js
import React, { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from "chart.js";

// Register necessary components for charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Charts() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFilms: 0,
    totalSeries: 0,
    totalSeasons: 0,
  });

  useEffect(() => {
    // Fetch stats from the backend
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  // Data for Bar Chart
  const barData = {
    labels: ["Users", "Films", "Series", "Seasons"],
    datasets: [
      {
        label: "Count",
        data: [stats.totalUsers, stats.totalFilms, stats.totalSeries, stats.totalSeasons],
        backgroundColor: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"],
      },
    ],
  };

  // Data for Pie Chart
  const pieData = {
    labels: ["Users", "Films", "Series", "Seasons"],
    datasets: [
      {
        label: "Count",
        data: [stats.totalUsers, stats.totalFilms, stats.totalSeries, stats.totalSeasons],
        backgroundColor: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"],
      },
    ],
  };

  // Data for Wave Chart (Line Chart) - Example data for monthly activity
  const waveData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Activity",
        data: [10, 50, 30, 70, 20, 60, 40], // Replace with actual data if available
        fill: true,
        backgroundColor: "rgba(99, 102, 241, 0.3)",
        borderColor: "#4F46E5",
        tension: 0.4, // Creates a smooth curve for the wave effect
        pointRadius: 0,
      },
    ],
  };

  // Options for each chart type
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Bar Chart */}
      <div className="bg-white shadow-md rounded p-4 h-64">
        <h3 className="text-center font-bold mb-4">Bar Chart</h3>
        <div className="h-full pb-10">
          <Bar data={barData} options={options} />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white shadow-md rounded p-4 h-64">
        <h3 className="text-center font-bold mb-4">Pie Chart</h3>
        <div className="h-full pb-10">
          <Pie data={pieData} options={options} />
        </div>
      </div>

      {/* Wave Chart (Line Chart) */}
      <div className="col-span-1 md:col-span-2 bg-white shadow-md rounded p-4 h-64 mt-5" >
        <h3 className="text-center font-bold mb-4">Wave Chart</h3>
        <div className="h-full pb-10">
          <Line data={waveData} options={options} />
        </div>
      </div>
    </div>
  );
}
