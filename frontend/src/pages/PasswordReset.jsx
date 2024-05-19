import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../config/apiConfig";
import AppLoader from "../components/AppLoader";

const PasswordReset = () => {
  const { token, email } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!newPassword || !confirmPassword) {
      setMessage("Please fill both fields");
      setIsLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }
    let response;
    try {
      response = await axios.post(
        `${API_URL}/users/reset-password/${token}/${email}`,
        {
          password: newPassword,
        }
      );
      alert("Password has been reset successfully. You can now log in.");

      navigate("/login"); // Redirect to login page after successful reset

      setIsLoading(false);
    } catch (error) {
      console.log(error.message, response);
      setMessage("Error resetting password. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-green-400">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 transform transition duration-500 ease-in-out hover:scale-105">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              New Password:
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              Reset Password
              {isLoading && <AppLoader />}
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default PasswordReset;
