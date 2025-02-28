import { useState } from "react";
import { Link } from "react-router-dom";
import hamburger from "./images/hamburger.png";
import { useRef } from "react";

const Support = ({ toggleAside }) => {
  // State for support form
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const scrollContainerRef = useRef(null);

  // Handle form submission (Placeholder)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support request submitted:", { email, message });
    setSubmitted(true);
  };

  return (
    <div className="text-white h-screen">
      {/* Header */}
      <div className="flex justify-between border border-x-0 border-b-[#1D1D1D] border-b-2 p-2 border-t-0">
        <h1 className="text-lg lg:text-2xl font-semibold flex items-center">Support</h1>

        {/* Hamburger Icon */}
        <img 
          src={hamburger} 
          alt="hamburger icon" 
          className="h-6 flex cursor-pointer lg:hidden" 
          onClick={toggleAside} 
        />

        {/* Navigation Links */}
        <div className="hidden lg:flex gap-7">
          <Link to="/dashboard" className="text-white rounded-3xl py-2 px-3">Scouting Plan</Link>
          <Link to="/reports" className="rounded-3xl py-2 px-3">Report Statistics</Link>
        </div>
      </div>

      {/* Support Content */}
      <div ref={scrollContainerRef} className="overflow-y-auto custom-scrollbar scroll-smooth scrollbar-hide h-[35rem]">
        <div className="py-5 px-2">
          <h2 className="text-xl font-semibold mb-4">Support Center</h2>

          {/* FAQs Section */}
          <div className="bg-[#1D1D1D] p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-3">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-300 font-medium">❓ How do I reset my password?</p>
                <p className="text-gray-500">Go to Settings → Account and update your password.</p>
              </div>
              <div>
                <p className="text-gray-300 font-medium">❓ How can I contact support?</p>
                <p className="text-gray-500">Fill out the form below or email us at <span className="text-blue-400">support@example.com</span>.</p>
              </div>
            
            </div>
          </div>

          {/* Contact Support Form */}
          <div className="bg-[#1D1D1D] p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-3">Contact Support</h3>
            {submitted ? (
              <p className="text-green-400">✅ Your message has been sent! We&apos;ll get back to you soon.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-gray-400">Email</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    className="w-full p-2 bg-gray-800 rounded border border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400">Message</label>
                  <textarea 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue..." 
                    className="w-full p-2 bg-gray-800 rounded border border-gray-600 h-24"
                    required
                  />
                </div>
                <button type="submit" className="bg-blue-500 px-4 py-2 rounded mt-2">
                  Submit Request
                </button>
              </form>
            )}
          </div>

          {/* Quick Links */}
          {/* <div className="bg-[#1D1D1D] p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-blue-400">📖 Help Center</Link></li>
              <li><Link to="/guides" className="text-blue-400">🎥 Video Tutorials</Link></li>
              <li><Link to="/community" className="text-blue-400">💬 Community Forum</Link></li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Support;
