import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 text-white shadow-md rounded-lg mt-2 mx-2 mb-10">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-semibold">
          OntoVisum
        </div>
  
        <ul className="flex flow-row items-center space-x-6 text-lg font-bold">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">About</a>
          </li>
          <li>
            <a href="/">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}