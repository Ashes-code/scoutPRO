import art from "./images/dashboard-scouting-plan.png";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();  
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      alert("Login successful!");
      navigate("/dashboard");
      setLoading(false);
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="lg:flex items-center justify-center py-10 lg:p-4 bg-black overflow-auto h-screen">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Loader />
        </div>
      )}
      <div className="grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 bg-[#1D1D1D] rounded-2xl">
        {/* Image Section */}
        <div className="order-1 lg:order-2 flex items-center justify-center overflow-hidden">
          <img src={art} alt="Artwork" className="w-full h-72 lg:h-full object-cover rounded-2xl" />
        </div>

        {/* Login Form Section */}
        <div className="order-2 lg:order-1 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-white">Welcome Back 👋</h2>
          <p className="text-[#BCEE31] mt-2">Today is a new day. It&apos;s your day. You shape it.<br/>Login to see your team&apos;s progress.</p>

          <form className="mt-5" onSubmit={handleLogin}>
            {/* Email Input */}
            <label className="block mb-2 text-sm font-medium text-white">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Example@email.com" 
              className="w-full p-3 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BCEE31]" 
              required 
            />

            {/* Password Input */}
            <label className="block mt-3 mb-2 text-sm font-medium text-white">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="At least 8 characters" 
                className="w-full p-3 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BCEE31] pr-10" 
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {/* Error Message */}
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full mt-4 p-3 text-white rounded-lg bg-[#BCEE31] hover:bg-[#769425]"
            >
              Log in
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-white">Don&apos;t have an account? <a href="/signup" className="text-[#BCEE31]">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
