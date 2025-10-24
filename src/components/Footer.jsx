import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="w-full bg-card border-t border-accent">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand & Contact */}
          <div className="flex flex-col gap-6">
            <h1
              className="text-white text-3xl md:text-4xl lg:text-5xl font-bold hover-lift uppercase tracking-wider"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Link to="/" className="hover:opacity-80 transition-opacity">
                TOYTOPIA
              </Link>
            </h1>
            <p className="text-secondary text-base md:text-lg leading-relaxed">
              Welcome to our world of imagination and play! At ToyTopia,
              we believe in creating magical experiences for children and igniting
              their joy through premium toys and endless fun.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-accent text-lg" />
                <p className="text-primary text-base md:text-lg">01889719992</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-primary text-base md:text-lg">nayeem.cs000@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="flex flex-col items-center gap-6">
            <h2
              className="text-2xl md:text-3xl font-semibold text-primary text-center"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Stay Updated
            </h2>

            <div className="w-full max-w-md relative">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="input-field w-full pl-4 pr-4 py-3 rounded-lg border border-accent bg-dark text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>

            <button className="btn-primary w-full max-w-md py-3 text-lg font-semibold rounded-lg">
              Join Newsletter
            </button>

            <div className="flex items-center gap-6 mt-4">
              <FiFacebook className="text-2xl md:text-3xl text-secondary hover:text-accent cursor-pointer hover:scale-110 transition-all" />
              <FaInstagram className="text-2xl md:text-3xl text-secondary hover:text-accent cursor-pointer hover:scale-110 transition-all" />
              <RiTwitterXFill className="text-2xl md:text-3xl text-secondary hover:text-accent cursor-pointer hover:scale-110 transition-all" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary">Quick Links</h2>
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
      </div>
    </footer>
  );
};

export default Footer;
