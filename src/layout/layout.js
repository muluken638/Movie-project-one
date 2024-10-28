// src/Layout.js
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <header className="bg-gray-900 text-white p-4 sticky">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">MovieFlix</div>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-400">Home</a></li>
            <li><a href="#" className="hover:text-gray-400">Movies</a></li>
            <li><a href="#" className="hover:text-gray-400">Series</a></li>
            <li><a href="#" className="hover:text-gray-400">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      <footer className="bg-gray-900 text-white p-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} MovieFlix. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
