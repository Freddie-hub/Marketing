import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/apiConfig";
import AppLoader from "../components/AppLoader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/users/forgot-password`, { email });
      alert(
        "Password reset link has been sent to your email. Please check your inbox before logging in."
      );
      navigate("/login");
      setIsLoading(false);
    } catch (error) {
      setMessage("Error sending password reset link. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-green-400">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 transform transition duration-500 ease-in-out hover:scale-105">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              value={email}
              placeholder="Please enter your email here"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={
                isLoading
                  ? "w-full bg-gray-500 text-white py-2 rounded-md hover:bg-blue-600"
                  : "w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              }
              style={{
                pointerEvents: isLoading ? "none" : "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Send Reset Link
              {isLoading && <AppLoader />}
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
