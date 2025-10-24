import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="bg-card border-t border-accent flex flex-col lg:flex-row justify-between items-start px-4 md:px-8 lg:px-20 py-12 gap-8">
      <div className="flex flex-col gap-6 w-full lg:w-1/3">
        <h1
          className="text-accent text-3xl md:text-4xl lg:text-5xl font-bold hover-lift"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <Link to="/" className="hover:text-primary transition-colors">ToyTopia</Link>
        </h1>
        <p className="text-secondary text-base md:text-lg leading-relaxed">
          Welcome to our world of imagination and play! At ToyTopia,
          we believe in creating magical experiences for children and igniting
          their joy through premium toys and endless fun.
        </p>
        <div className="flex items-center gap-3">
          <FaPhoneAlt className="text-accent text-lg" />
          <p className="text-primary text-base md:text-lg">01889719992</p>
        </div>
        <div className="flex items-center gap-3">
          <IoMdMail className="text-accent text-lg" />
          <p className="text-primary text-base md:text-lg">nayeem.cs000@gmail.com</p>
        </div>
      </div>

      <div className="w-full lg:w-1/3 flex flex-col items-center gap-6">
        <h2
          className="text-2xl md:text-3xl font-semibold text-primary text-center"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Stay Updated
        </h2>

        <div className="w-full max-w-md relative">
          <svg
            className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="input-field w-full pl-10 pr-4 py-3"
          />
        </div>

        <button className="btn-primary w-full max-w-md py-3 text-lg font-semibold">
          Join Newsletter
        </button>

        <div className="flex items-center gap-6 mt-4">
          <FiFacebook className="text-2xl md:text-3xl text-secondary hover:text-accent cursor-pointer hover:scale-110 transition-all" />
          <FaInstagram className="text-2xl md:text-3xl text-secondary hover:text-accent cursor-pointer hover:scale-110 transition-all" />
          <RiTwitterXFill className="text-2xl md:text-3xl text-secondary hover:text-accent cursor-pointer hover:scale-110 transition-all" />
        </div>
      </div>

      <div className="w-full lg:w-1/3">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6">Quick Links</h2>
        <ul className="list-none flex flex-col gap-4">
          <li>
            <Link to="/" className="text-secondary hover:text-accent text-lg font-medium transition-colors">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/cart" className="text-secondary hover:text-accent text-lg font-medium transition-colors">
              Shopping Basket
            </Link>
          </li>
          <li>
            <Link to="/products" className="text-secondary hover:text-accent text-lg font-medium transition-colors">
              Products
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="text-secondary hover:text-accent text-lg font-medium transition-colors">
              About Us
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
