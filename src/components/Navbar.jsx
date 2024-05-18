import React from "react";
import logo from "../assets/White_Modern_Minimalist_Signature_Brand_Logo-removebg-preview.png";
import { BiWorld, BiUser } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="border-b sticky top-0 z-50 bg-white/90 shadow-md">
      <div className="flex justify-between items-center sm:mx-6 md:mx-10 lg:mx-12 py-2">
        {/* Left */}
        <div className="h-20 flex items-center">
          <img src={logo} className="object-contain w-60" alt="Logo" />
        </div>
        {/* Middle */}
        <div className="hidden lg:flex justify-center items-center relative shadow-sm shadow-gray-400 border rounded-full">
          <input
            type="search"
           
            className="py-2.5 w-[20rem] rounded-full pl-4 pr-12 outline-none"
          />
          <div className="flex justify-between absolute w-full pr-16 pl-6 font-medium text-gray-600">
            <button className="w-full">Place</button>
            <button className="border-l border-gray-300 px-6">Time</button>
            <button className="w-full text-black pl-2">Group Size</button>
          </div>
          <div className="bg-blue-600 p-2 rounded-full mr-2">
            <FiSearch className="text-white" />
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center pr-3 font-medium text-gray-700">
          <p className="text-[17px]">Rent House</p>
          <div className="flex items-center mx-8 gap-1">
            <BiWorld />
            <div>EN</div>
          </div>
          <div className="flex items-center border px-3 py-2 rounded-full gap-2 bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-500 duration-150 ease-out">
            <p>Sign in</p>
            <BiUser className="text-[22px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
