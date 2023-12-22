// Header.jsx
import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 fixed w-full top-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Model Bazar App</h1>
        </div>
        <div className="space-x-4">
          <NavLink
            to="/profile"
            className="text-blue-300 hover:text-white transition duration-300"
          >
            Profile
          </NavLink>
          <NavLink
            to="/logout"
            className="text-blue-300 hover:text-white transition duration-300"
          >
            Logout
          </NavLink>
        </div>
      </div>
    </header>
  );
}
