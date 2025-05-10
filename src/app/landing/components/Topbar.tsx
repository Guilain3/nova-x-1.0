import React from 'react';
import Link from 'next/link';

const Topbar: React.FC = () => {
  return (
    <nav className="bg-[#F5F7FA] py-4 px-8 flex justify-between items-center shadow-sm">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
      <img src="/images/nova-logo.png" alt="Nova X Logo" className="h-20 w-auto" />
    </div>

      {/* Navigation links */}
      <ul className="flex space-x-10 text-base font-semibold text-gray-800">
        <li className="font-semibold">Home</li>
        <li className="hover:text-blue-600 cursor-pointer">Service</li>
        <li className="hover:text-blue-600 cursor-pointer">Feature</li>
        <li className="hover:text-blue-600 cursor-pointer">Product</li>
        <li className="hover:text-blue-600 cursor-pointer">Testimonial</li>
        <li className="hover:text-blue-600 cursor-pointer">FAQ</li>
      </ul>

      {/* Auth buttons */}
      <div className="flex items-center space-x-6">
        <Link href="/login" className="text-blue-700 font-medium hover:underline">
          Login
        </Link>
        <Link
          href="/auth/sme/signup"
          className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Topbar;
