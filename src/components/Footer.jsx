import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="w-full bg-card border-t border-accent">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12">
        <div className="flex flex-wrap justify-start gap-12 lg:gap-20">
          
          {/* Brand & Contact - LEFT */}
          <div className="flex flex-col gap-4 w-full md:w-[300px] lg:w-[320px]">
            <h1
              className="text-white text-3xl md:text-4xl font-bold uppercase tracking-wider"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Link to="/" className="hover:opacity-80 transition-opacity">
                TOYTOPIA
              </Link>
            </h1>
            <p className="text-secondary text-sm md:text-base leading-relaxed">
              Creating magical experiences for children through premium toys and endless fun.
            </p>
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-accent text-base flex-shrink-0" />
                <p className="text-primary text-sm md:text-base">01889719992</p>
              </div>
              <div className="flex items-center gap-3">
                <MdEmail className="text-accent text-lg flex-shrink-0" />
                <p className="text-primary text-sm md:text-base">nayeem.cs000@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Newsletter & Social - MIDDLE */}
          <div className="flex flex-col gap-4 w-full md:w-[320px] lg:w-[340px]">
            <h2
              className="text-xl md:text-2xl font-semibold text-primary"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Stay Updated
            </h2>

            <div className="w-full">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-accent bg-dark text-primary text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>

            <button className="btn-primary w-full py-2.5 text-base font-semibold rounded-lg">
              Join Newsletter
            </button>

            <div className="flex items-center gap-5 mt-2">
              <a href="#" aria-label="Facebook">
                <FiFacebook className="text-2xl text-secondary hover:text-accent cursor-pointer hover:scale-110 transition-all" />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="text-2xl text-secondary hover:text-accent cursor-pointer hover:scale-110 transition-all" />
              </a>
              <a href="#" aria-label="Twitter">
                <RiTwitterXFill className="text-2xl text-secondary hover:text-accent cursor-pointer hover:scale-110 transition-all" />
              </a>
            </div>
          </div>

          {/* Quick Links - RIGHT */}
          <div className="flex flex-col gap-4 w-full md:w-[200px]">
            <h2 className="text-xl md:text-2xl font-semibold text-primary">Quick Links</h2>
            <ul className="list-none flex flex-col gap-3">
              <li>
                <Link to="/" className="text-secondary hover:text-accent text-sm md:text-base font-medium transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-secondary hover:text-accent text-sm md:text-base font-medium transition-colors">
                  Shopping Basket
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-secondary hover:text-accent text-sm md:text-base font-medium transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/aboutus" className="text-secondary hover:text-accent text-sm md:text-base font-medium transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;