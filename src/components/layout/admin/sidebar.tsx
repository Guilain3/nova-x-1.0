"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import {
  ChevronDown,
  ChevronUp,
  Grid2X2,
  Search,
  PieChart,
  PlusCircle,
  FileText,
  HelpCircle,
  User,
  X
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <Grid2X2 size={20} /> },
    { name: "All SMEs", href: "/admin/smes", icon: <Search size={20} /> },
    { name: "All Investors", href: "/admin/investors", icon: <User size={20} /> },
    { name: "Subscriptions", href: "/admin/subscriptions", icon: <PlusCircle size={20} /> },
    { name: "Reports", href: "/admin/reports", icon: <FileText size={20} /> },
    { name: "System Logs", href: "/admin/system-logs", icon: <PieChart size={20} /> },
    { name: "Profile", href: "/admin/profile", icon: <HelpCircle size={20} /> },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-[#0000BF] text-white p-5 z-50 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } md:relative md:translate-x-0`}
    >
      {/* Close Button for Mobile */}
      <button
        onClick={closeSidebar}
        className="absolute top-4 right-4 md:hidden"
      >
        <X size={24} />
      </button>

      {/* Logo */}
      <div
        className="flex flex-col items-center mb-6 cursor-pointer"
        onClick={() => {
          router.push("/admin/dashboard");
          if (window.innerWidth < 768) closeSidebar();
        }}
      >
        <Image
          src="/images/logo.png" // ✅ Correct way to use image from public folder
          alt="Logo"
          width={120}
          height={40}
        />
        {/* <div className="mt-2 text-lg font-semibold">NOVA X</div> */}
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              router.push(item.href);
              if (window.innerWidth < 768) closeSidebar();
            }}
            className={`flex items-center gap-3 w-full text-left p-3 rounded-md text-gray-300 hover:bg-blue-600 transition ${
              pathname === item.href ? "bg-blue-600 text-white" : ""
            }`}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
