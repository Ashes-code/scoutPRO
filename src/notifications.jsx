import { Link } from "react-router-dom";
import hamburger from "./images/hamburger.png";

const Notifications = ({ toggleAside }) => {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between border border-x-0 border-b-[#1D1D1D] border-b-2 p-2 border-t-0">
        <h1 className="text-lg lg:text-2xl font-semibold flex items-center">Notifications</h1>

        {/* Hamburger Icon */}
        <img 
          src={hamburger} 
          alt="hamburger icon" 
          className="h-6 flex cursor-pointer lg:hidden" 
          onClick={toggleAside} 
        />

        {/* Navigation Links */}
        <div className="hidden lg:flex gap-7">
          <Link to="/scoutPRO/dashboard" className="text-white rounded-3xl py-2 px-3">Scouting Plan</Link>
          <Link to="/scoutPRO/reports" className="rounded-3xl py-2 px-3 ">Report Statistics</Link>
        </div>
      </div>

      {/* Content Placeholder */}
      <div className="p-5 text-white">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <p className="mt-2 text-gray-400">This section will display all notifications.</p>
      </div>
    </div>
  );
};

export default Notifications;
