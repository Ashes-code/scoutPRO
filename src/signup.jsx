import art from "./images/dashboard-scouting-plan.png";
import google from "./images/Google.png";
import facebook from "./images/Facebook.png";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { auth, provider } from "./firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import Loader from "./Loader";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User signed up successfully:", userCredential.user);
        alert("Signup successful!");
        navigate("/scoutPRO/dashboard");
      })
      .catch((error) => {
        console.error("Signup error:", error.message);
        alert(`Signup Error: ${error.message}`);
      })
      .finally(() => setLoading(false));
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate("/scoutPRO/dashboard");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:flex items-center justify-center py-10 lg:p-4 bg-black overflow-auto h-screen relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Loader />
        </div>
      )}

      <div className="grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 bg-[#1D1D1D] rounded-2xl">
        {/* Image Section */}
        <div className="order-1 md:order-2 flex items-center justify-center">
          <img
            src={art}
            alt="Artwork"
            className="w-full h-72 md:h-full object-cover rounded-t-2xl md:rounded-l-none md:rounded-r-2xl"
          />
        </div>

        {/* Signup Form Section */}
        <div className="order-2 md:order-1 p-4 md:p-8 overflow-y-auto">
          <h2 className="text-2xl font-bold text-white">Welcome 👋</h2>
          <p className="text-[#BCEE31] mt-2">
            Today is a new day. It&apos;s your day. You shape it.<br />
            Sign up to start managing your team.
          </p>

          <form className="mt-5" onSubmit={handleSignup}>
            <label className="block mb-2 text-sm font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Example@email.com"
              className="text-black w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BCEE31]"
              required
              disabled={loading}
            />

            <label className="block mt-3 mb-2 text-sm font-medium text-white">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="text-black w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BCEE31] pr-10"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                disabled={loading}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-[#BCEE31] text-white p-3 rounded-lg hover:bg-[#769425] disabled:bg-gray-600"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="px-3 text-gray-500 text-sm">Or</p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Signups */}
          <div className="flex flex-col gap-2">
            <button
              className="text-black flex items-center justify-center gap-2 p-3 border rounded-lg bg-[#F3F9FA] hover:bg-gray-100 disabled:bg-gray-300"
              onClick={signInWithGoogle}
              disabled={loading}
            >
              <img src={google} alt="Google" className="w-5 h-5" />
              <span>{loading ? "Processing..." : "Sign up with Google"}</span>
            </button>
            <button
              className="text-black flex items-center justify-center gap-2 p-3 border rounded-lg bg-[#F3F9FA] hover:bg-gray-100 disabled:bg-gray-300"
              disabled={loading}
            >
              <img src={facebook} alt="Facebook" className="w-5 h-5" />
              <span>Sign up with Facebook</span>
            </button>
          </div>

          <p className="mt-3 text-center text-sm text-white">
            Already have an account? <Link to="/scoutPRO/login" className="text-[#BCEE31]">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signup;
