// AdminLayout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './UserSidebar';
import AdminHeader from './UserHeader';

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <AdminHeader toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for Small Screens */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
        
        {/* Sidebar (Hidden on Mobile) */}
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block lg:relative z-20`}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:ml-64 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
