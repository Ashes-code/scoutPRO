import React from 'react'
import { useRef } from "react";
import { Link } from "react-router-dom";
import hamburger from "./images/hamburger.png";


const Profile = ({toggleAside}) => {
  const scrollContainerRef = useRef(null);

  return (
    <div className="bg-black text-white">
      {/* Header */}
      <div className="flex justify-between border border-x-0 border-b-[#1D1D1D] border-b-2 p-2 border-t-0">
          <h1 className="text-lg lg:text-2xl font-semibold flex items-center">Profile</h1>

          {/* Hamburger Icon */}
          <img 
              src={hamburger} 
              alt="hamburger icon" 
              className="h-6 flex cursor-pointer lg:hidden" 
              onClick={toggleAside} 
          />
          <div className="hidden lg:flex gap-7">
              <Link to="/dashboard" className="text-white flex items-center rounded-3xl py-2 px-3">Scouting Plan</Link>
              <Link to="/reports" className="text-white rounded-3xl py-2 px-3 flex items-center">Report Statistics</Link>
          </div>
      </div>

      <div ref={scrollContainerRef} className="overflow-y-auto custom-scrollbar scroll-smooth scrollbar-hide h-[34rem]">
          {/* Reports Overview */}
          <div className="py-3 pl-2 text-white">
              <h2 className="text-xl font-semibold">Profile Overview</h2>
              <p className="mt-2 text-gray-400">This section will display your Profile information.</p>
          </div>
      </div>
  </div>
  )
}

export default Profile;