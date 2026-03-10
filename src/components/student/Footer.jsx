import React from "react";
import { assets } from "../../assets/assets";

export const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-red-50 to-white mt-16">
      <div className="max-w-7xl mx-auto px-8 md:px-20 py-14 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-200">
        {/* Logo + About */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-2xl font-bold text-red-600 cursor-pointer">
            LMS
          </h1>

          <p className="mt-5 text-gray-500 text-sm max-w-sm">
            Empowering learners with modern online courses designed by industry
            experts. Build practical skills and grow your career with flexible
            learning.
          </p>
        </div>

        {/* Company Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="font-semibold text-gray-800 mb-5">Company</h2>

          <ul className="space-y-3 text-sm text-gray-500">
            <li className="hover:text-red-600 cursor-pointer transition">
              Home
            </li>

            <li className="hover:text-red-600 cursor-pointer transition">
              About Us
            </li>

            <li className="hover:text-red-600 cursor-pointer transition">
              Contact Us
            </li>

            <li className="hover:text-red-600 cursor-pointer transition">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="font-semibold text-gray-800 mb-4">Newsletter</h2>

          <p className="text-sm text-gray-500 max-w-xs">
            Subscribe to get updates about new courses and learning tips.
          </p>

          <div className="flex items-center mt-5 w-full max-w-sm">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border border-gray-300 rounded-l-full px-4 py-2 text-sm outline-none focus:border-red-400"
            />

            <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-r-full text-sm transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center py-5 text-sm text-gray-500">
        © 2026 Mahreen Choudhry. All rights reserved.
      </div>
    </footer>
  );
};
