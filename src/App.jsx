import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import logo from "./images/logoIcon.png";
import search from "./images/frame.png";
import dashboardIcon from "./images/frame (1).png";
import reportsIcon from "./images/frame (2).png";
import playersIcon from "./images/frame (3).png";
import notificationsIcon from "./images/frame (4).png";
import settingsIcon from "./images/frame (5).png";
import supportIcon from "./images/frame (6).png";
import profile from "./images/image.png";
import Dashboard from "./dashboard.jsx";
import Reports from "./reports.jsx";
import Players from "./players.jsx";
import Notifications from "./notifications.jsx";
import Settings from "./settings.jsx";
import Support from "./support.jsx";
import Login from "./login.jsx";
import Signup from "./signup.jsx";
import Profile from "./profile.jsx";

function App() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const location = useLocation(); // Get current page URL
  const asideRef = useRef(null); // Reference for sidebar

  // Hide sidebar if the user is on login or signup pages
  const isAuthPage = location.pathname === "/login" || location.pathname === "/" ;

  // Toggle function
  const toggleAside = () => {
    setIsAsideOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (asideRef.current && !asideRef.current.contains(event.target)) {
        setIsAsideOpen(false);
      }
    };

    if (isAsideOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAsideOpen]);

  return (
    <div className="overall-container bg-black">
      <div className="flex text-white font-Inter container mx-auto rounded-lg">

        {/* Render Sidebar & Layout ONLY IF it's NOT login or signup */}
        {!isAuthPage && (
          <div
            ref={asideRef}
            className={`aside py-5 px-4 fixed h-screen lg:static top-0 left-0 bg-black w-[70%] sm:w-[50%] lg:w-[25%] border border-l-0 border-y-0 border-r-2 border-r-[#1D1D1D] shadow-xl rounded-lg transition-transform duration-300 ease-in-out z-50 ${
              isAsideOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0`}
          >
            {/* Logo */}
            <Link to="/" className={`flex items-center gap-3 cursor-pointer py-2 px-4 rounded-full ${location.pathname === "/" ? "bg-transparent" : "hover:bg-transparent"}`}>
              <img src={logo} alt="Logo" className="w-6 h-6 text-green-400" />
              <h1 className="text-white font-Inter text-lg">Scout PRO</h1>
              </Link>

            <div className="mt-8 search relative">
              <input
                type="text"
                placeholder="Search"
                className="font-Inter text-white rounded-3xl border-none outline-none bg-[#1D1D1D] pl-12 py-3 w-full"
              />
              <img src={search} alt="Search" className="absolute top-[0.8rem] left-4 w-5 h-5" />
            </div>

            {/* Navigation Links */}
            <div className="links flex flex-col gap-6 mt-8 text-white">
              <Link to="/dashboard" className={`flex items-center gap-3 cursor-pointer hover:bg-[#1D1D1D] py-2 px-4 rounded-full ${location.pathname === "/dashboard" ? "bg-[#1D1D1D]" : "hover:bg-[#1D1D1D]"}`}>
                <img src={dashboardIcon} alt="Dashboard" className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link to="/reports" className={`flex items-center gap-3 cursor-pointer hover:bg-[#1D1D1D] py-2 px-4 rounded-full ${location.pathname === "/reports" ? "bg-[#1D1D1D]" : "hover:bg-[#1D1D1D]"}`}>
                <img src={reportsIcon} alt="Reports" className="w-5 h-5" />
                <span>Reports</span>
              </Link>
              <Link to="/players" className={`flex items-center gap-3 cursor-pointer hover:bg-[#1D1D1D] py-2 px-4 rounded-full ${location.pathname === "/players" ? "bg-[#1D1D1D]" : "hover:bg-[#1D1D1D]"}`}>
                <img src={playersIcon} alt="All Players" className="w-5 h-5" />
                <span>All players</span>
              </Link>
              <Link to="/notifications" className={`flex items-center gap-3 cursor-pointer relative hover:bg-[#1D1D1D] py-2 px-4 rounded-full ${location.pathname === "/notifications" ? "bg-[#1D1D1D]" : "hover:bg-[#1D1D1D]"}`}>
                <img src={notificationsIcon} alt="Notifications" className="w-5 h-5" />
                <span>Notifications</span>
                <span className="w-2 h-2 bg-[#BCEE31] rounded-full absolute right-2"></span>
              </Link>
              <Link to="/settings" className={`flex items-center gap-3 cursor-pointer hover:bg-[#1D1D1D] py-2 px-4 rounded-full ${location.pathname === "/settings" ? "bg-[#1D1D1D]" : "hover:bg-[#1D1D1D]"}`}>
                <img src={settingsIcon} alt="Settings" className="w-5 h-5" />
                <span>Settings</span>
              </Link>
              <Link to="/support" className={`flex items-center gap-3 cursor-pointer hover:bg-[#1D1D1D] py-2 px-4 rounded-full ${location.pathname === "/support" ? "bg-[#1D1D1D]" : "hover:bg-[#1D1D1D]"}`}>
                <img src={supportIcon} alt="Support" className="w-5 h-5" />
                <span>Support</span>
              </Link>
            </div>

            <Link to="/profile" className="text-white bottom-2 flex items-center gap-3 hover:bg-[#1D1D1D] absolute py-2 px-4 rounded-full cursor-pointer">
              <img src={profile} alt="Profile Image"/>
              John White
            </Link>
          </div>
        )}

        {/* Main Content (Updates based on route passed as a prop) */}
        <div className={`main h-screen overflow-y-auto ${isAuthPage ? "w-full" : "sm:w-[100%] lg:w-[80%]"} bg-black overflow-y-hidden shadow-xl rounded-lg p-5`}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard toggleAside={toggleAside} />} />
            <Route path="/reports" element={<Reports toggleAside={toggleAside}/>} />
            <Route path="/players" element={<Players toggleAside={toggleAside}/>} />
            <Route path="/notifications" element={<Notifications toggleAside={toggleAside}/>} />
            <Route path="/settings" element={<Settings toggleAside={toggleAside}/>} />
            <Route path="/support" element={<Support toggleAside={toggleAside}/>} />
            <Route path="/profile" element={<Profile toggleAside={toggleAside}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Signup />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;
