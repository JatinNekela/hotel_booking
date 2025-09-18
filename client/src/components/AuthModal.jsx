import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AuthModal = () => {
  const { axios, setShowAuth, fetchUser } = useAppContext();
  const [isLogin, setIsLogin] = useState(true); // toggle between login/signup
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // LOGIN
        const { data } = await axios.post("/api/user/login", { email, password });
        if (data.success) {
          localStorage.setItem("token" , data.token);
          await fetchUser();
          toast.success("Login successful!");
          setShowAuth(false);
        } else {
          toast.error(data.message);
        }
      } else {
        // SIGNUP
        const { data } = await axios.post("/api/user/register", { username, email, password });
        if (data.success) {
          localStorage.setItem("token" , data.token);
          await fetchUser();
          toast.success("Signup successful!");
          setShowAuth(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div onClick={() => setShowAuth(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className="flex flex-col bg-white rounded-xl p-8 w-[400px] shadow-lg">
        <p className="text-2xl font-semibold mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </p>

        {/* Username (only for signup) */}
        {!isLogin && (
          <div className="w-full mb-3">
            <label htmlFor="username" className="font-medium text-gray-500">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="border border-gray-200 rounded w-full px-3 py-2 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="w-full mb-3">
          <label htmlFor="email" className="font-medium text-gray-500">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="border border-gray-200 rounded w-full px-3 py-2 mt-1 outline-indigo-500 font-light"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full mb-4">
          <label htmlFor="password" className="font-medium text-gray-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="border border-gray-200 rounded w-full px-3 py-2 mt-1 outline-indigo-500 font-light"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white px-6 py-2 rounded mt-2"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-500 cursor-pointer"
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthModal;
