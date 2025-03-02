import { useState } from "react";
import { Link } from "react-router-dom";
import hamburger from "./images/hamburger.png";
import { useRef } from "react";

const Settings = ({ toggleAside }) => {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const scrollContainerRef = useRef(null);

  // Handle form submissions (placeholder function)
  const handleUpdateAccount = (e) => {
    e.preventDefault();
    console.log("Updating account settings:", { email, password });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log("Updating profile:", { username, profilePic });
    alert(`Profile Updated Successfully`)
  };

  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex justify-between border border-x-0 border-b-[#1D1D1D] border-b-2 p-2 border-t-0">
        <h1 className="text-lg lg:text-2xl font-semibold flex items-center">Settings</h1>

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
          <Link to="/scoutPRO/reports" className="rounded-3xl py-2 px-3">Report Statistics</Link>
        </div>
      </div>

      {/* Settings Content */}
      <div ref={scrollContainerRef} className="overflow-y-auto custom-scrollbar scroll-smooth scrollbar-hide h-[35rem]">
        <div className="py-5 px-2">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>

          {/* Account Settings */}
          <div className="bg-[#1D1D1D] p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
            <form onSubmit={handleUpdateAccount} className="space-y-3">
              <div>
                <label className="block text-gray-400">Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter new email" 
                  className="w-full p-2 bg-gray-800 rounded border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-gray-400">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password" 
                  className="w-full p-2 bg-gray-800 rounded border border-gray-600"
                />
              </div>
              <button type="submit" className="bg-blue-500 px-4 py-2 rounded mt-2">
                Update Account
              </button>
            </form>
          </div>

          {/* Profile Customization */}
          <div className="bg-[#1D1D1D] p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Profile Customization</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-3">
              <div>
                <label className="block text-gray-400">Username</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter new username" 
                  className="w-full p-2 bg-gray-800 rounded border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-gray-400">Profile Picture</label>
                <input 
                  type="file" 
                  onChange={(e) => setProfilePic(e.target.files[0])} 
                  className="w-full p-2 bg-gray-800 rounded border border-gray-600"
                />
              </div>
              <button type="submit" className="bg-green-500 px-4 py-2 rounded mt-2">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
