// AdminLayout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <AdminHeader toggleSidebar={toggleSidebar} /> {/* Pass toggleSidebar as prop */}
      
      <div className="flex flex-1">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden" onClick={toggleSidebar} />
        )}
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block z-20`}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:ml-64">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
