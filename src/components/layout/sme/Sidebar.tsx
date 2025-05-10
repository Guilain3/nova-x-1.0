"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../../public/images/logo.png";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Grid2X2,
  BarChart2,
  DollarSign,
  User,
  X,
  Shield,
  ArrowUpCircle, // Added icon for Upgrade
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
    { name: "Dashboard", href: "/sme", icon: <Grid2X2 size={20} /> },
    { name: "Fintrack", href: "/sme/fintrack", icon: <Shield size={20} /> },
    { name: "Upgrade", href: "/sme/upgrade", icon: <ArrowUpCircle size={20} /> }, 
    { name: "Reports", href: "/sme/reports", icon: <BarChart2 size={20} /> },
    { name: "Help & Support", href: "/sme/help", icon: <HelpCircle size={20} /> }, 
    { name: "Profile", href: "/sme/profile", icon: <User size={20} /> },
     
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
          router.push("/sme");
          if (window.innerWidth < 768) closeSidebar();
        }}
      >
        <Image src={logo} alt="Logo" />
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
