"use client";

// components/Layout.jsx
import React from 'react';
import Sidebar from '../../../components/investor/sidebar';
import Topbar from '../../../components/investor/topbar';

import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={true} 
        toggleSidebar={() => {}} 
        closeSidebar={() => {}} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar 
          isSidebarOpen={true} 
          toggleSidebar={() => {}} 
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
            {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;