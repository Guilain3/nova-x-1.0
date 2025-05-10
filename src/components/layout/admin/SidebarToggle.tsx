"use client";

import { Menu } from "lucide-react";

interface SidebarToggleProps {
  toggleSidebar: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ toggleSidebar }) => {
  return (
    <button
      onClick={toggleSidebar}
      className="md:hidden p-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
    >
      <Menu size={24} />
    </button>
  );
};

export default SidebarToggle;
