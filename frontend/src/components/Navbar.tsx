import React from "react";
import { HomeIcon, InformationCircleIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 text-white shadow-md rounded-lg mt-2 mx-2 mb-10">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-semibold group cursor-pointer flex items-center space-x-1">
          <a href="/" className="flex space-x-1">
            <span className="text-white group-hover:text-blue-100 transition-colors duration-200">Onto</span>
            <span className="text-blue-100 group-hover:text-white transition-colors duration-200">Visum</span>
          </a>
        </div>
  
        <div className="flex space-x-6 items-center">
          <div className="relative group">
            <a href="/" aria-label="Home">
              <HomeIcon className="h-6 w-6 hover:text-blue-200 transition" />
            </a>
            <span className="absolute bottom-[-2.0rem] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-gray-800 text-white text-xs rounded px-2 py-1 shadow pointer-events-none">
              Home
            </span>
          </div>

          <div className="relative group">
            <a href="/about" aria-label="About">
              <InformationCircleIcon className="h-6 w-6 hover:text-blue-200 transition" />
            </a>
            <span className="absolute bottom-[-2.0rem] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-gray-800 text-white text-xs rounded px-2 py-1 shadow pointer-events-none">
              About
            </span>
          </div>

          <div className="relative group">
            <a href="/contact" aria-label="Contact">
              <EnvelopeIcon className="h-6 w-6 hover:text-blue-200 transition" />
            </a>
            <span className="absolute bottom-[-2.0rem] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-gray-800 text-white text-xs rounded px-2 py-1 shadow pointer-events-none">
              Contact
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}