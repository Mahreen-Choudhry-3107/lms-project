import React from "react";
import { assets } from "../../assets/assets";

export const Footer = () => {
  return (
    <footer className="bg-red-50 md:px-36 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-black">
        <div className="flex flex-col md:items-start items-center w-full">
          {/* <img className='w-6 h-6' src={assets.logo} alt="logo" /> */}
          <h1
            onClick={() => navigate("/")}
            className="text-xl lg:text-2xl font-bold text-red-600 cursor-pointer"
          >
            LMS
          </h1>
          <p className="mt-6 text-center md:text-left text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur ipsam cum optio.
          </p>
        </div>
        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold md-5">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm md:space-y-2">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-start w-full">
          <h2 className="font-semibold mb-5">Subscribe to our newsletter</h2>
          <p className="text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="flex items-center gap-2 pt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-500/30 bg-black text-gray-300 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm"
            />
            <button className="bg-red-600 w-24 h-9 text-white rounded">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm">
        Copyright 2026 © Mahreen Choudhry. All Right Reserved
      </p>
    </footer>
  );
};
