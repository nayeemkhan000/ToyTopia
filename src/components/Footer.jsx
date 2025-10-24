import React from "react";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { MdEmail, MdCall } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white px-8 md:px-20 py-10 border-t border-blue-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Left Section */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white mb-3">
            <span className="text-white">TOY</span>
            <span className="text-blue-500">TOPIA</span>
          </h2>
          <p className="text-gray-400 mb-3">
            Creating magical experiences for children through premium toys and endless fun.
          </p>
          <div className="flex items-center gap-2 mb-1">
            <MdCall className="text-blue-500" />
            <span>01889719992</span>
          </div>
          <div className="flex items-center gap-2">
            <MdEmail className="text-blue-500" />
            <span>nayeem.cs000@gmail.com</span>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3">Stay Updated</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-gray-500 outline-white border-amber-50"
            />
            <button className="bg-blue-600 px-6 py-2 rounded-md font-semibold transition border-2 border-blue-500">
              Join Newsletter
            </button>
          </div>
          <div className="flex gap-5 mt-4 text-2xl">
            <a href="#" className="hover:text-blue-500 transition">
              <FiFacebook />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <RiTwitterXFill />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-blue-500 transition">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition">
                Shopping Basket
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition">
                About Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-500 text-sm">
        © 2025 Toytopia. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
