"use client";

import { Bell, Search, Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react"; // Import useSession for authentication

type TopbarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession(); // Get session data

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-16 bg-white dark:bg-gray-900 shadow-md flex items-center px-6 justify-between z-40">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="text-gray-900 dark:text-white p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <Menu size={28} />
      </button>

      {/* Search Bar */}
      <div className="relative w-1/3 hidden sm:block">
        <Search
          size={24}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
        />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 px-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Theme Toggle, Notifications, Profile */}
      <div className="flex items-center gap-4">
        {/* Theme Switch */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center transition-all"
          >
            <span
              className={`w-5 h-5 bg-white dark:bg-black rounded-full absolute transition-all ${
                theme === "dark" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        )}

        {/* Notifications */}
        <button className="text-gray-700 dark:text-gray-200">
          <Bell size={24} />
        </button>

        {/* Profile Section */}
        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              <span className="text-gray-700 dark:text-gray-200 font-medium">
                {session.user.email || "User"}
              </span>
              <Image
                src={"/images/profilepic.jpg"} // Fallback image
                alt="User Profile"
                width={32}
                height={32}
                className="rounded-full border border-gray-300 dark:border-gray-600"
              />
            </>
          ) : (
            <>
              <span className="text-gray-700 dark:text-gray-200 font-medium">
                Guest
              </span>
              <Image
                src="/images/default-profile.jpg" // Default profile image
                alt="Guest Profile"
                width={32}
                height={32}
                className="rounded-full border border-gray-300 dark:border-gray-600"
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
