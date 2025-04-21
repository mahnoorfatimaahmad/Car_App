"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Button from "@/components/miniWidgets/Button";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  // Toggle function to open/close mobile menu
  const handleNav = () => {
    setNav(!nav);
  };

  // Navbar Links
  const links = [
    { nav: "home", link: "/" },
    { nav: "inventory", link: "/inventory" },
    { nav: "about", link: "/about" },
    { nav: "faqs", link: "/faq" },
    { nav: "login", link: "/login" },
  ];

  return (
    <nav className="flex items-center justify-between w-full px-6 md:px-12 lg:px-16 py-4 shadow-md bg-white  fixed top-0 left-0 right-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-black">
        <span className="text-red-500">R</span>umble
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {/* Navigation Links */}
        <div className=" space-x-1 lg:space-x-3 flex items-center">
          {links.map((page, i) => (
            <Link
              key={i}
              href={page.link}
              className="px-4 py-2 hover:bg-red-600 hover:text-white transition duration-300 rounded-md font-semibold capitalize"
            >
              {page.nav}
            </Link>
          ))}
        </div>
        {/* Booking Button */}
        <Button text="Booking" />
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden" onClick={handleNav}>
        <AiOutlineMenu size={24} className="text-black cursor-pointer" />
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-0 left-0 w-[75%] sm:w-[60%] h-full bg-black text-white transition-transform duration-500 ease-in-out ${
          nav ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-900">
          {/* Mobile Logo */}
          <div className="text-2xl font-bold bg-white p-2 rounded px-3 text-black">
            <span className="text-red-500">R</span>umble
          </div>
          {/* Close Button */}
          <AiOutlineClose
            size={24}
            className="text-white cursor-pointer"
            onClick={handleNav}
          />
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex flex-col mt-6 space-y-4 px-6">
          {links.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className="p-4 border-b border-gray-600 text-lg font-semibold capitalize hover:bg-red-600 transition duration-300 rounded-lg"
              onClick={handleNav} // Close menu on click
            >
              {item.nav}
            </Link>
          ))}
        </div>

        {/* Mobile Booking Button */}
        <div className="px-6 mt-6">
          <Button text="Booking" />
        </div>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {nav && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={handleNav}
        />
      )}
    </nav>
  );
};

export default Navbar;
