import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./spinner.css";
import API_URL from "../config/apiConfig";

// Sign Up Component
const SignUp = ({ toggleForms }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Here you can add your logic to handle form submission
    const requestBody = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    };

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Sign up successful!");
        handleFastLogin();
        // navigate("/");
        alert(
          "Sign up successful! Please check your email to verify your account."
        );
      } else {
        // Handle sign up error
        const data = await response.text();
        if (
          data ==
          "Account processing was succesfull. Please check your email for verification to complete this process..."
        ) {
          alert(
            "Account processing was succesfull. Please check your email for verification to complete this process..."
          );
          handleFastLogin();

          navigate("/");
          setIsLoading(false);
        } else {
          console.log("Sign up result..... :", data);
          setError(data);
          alert("Error signing up: " + data);
          console.error("Sign up failed:", response);
          setIsLoading(false);
        }
      }
    } catch (error) {
      alert("Error signing up: " + error.message);
      console.error("Error signing up:", error.message);
      setIsLoading(false);
    }
  };

  const handleFastLogin = async (e) => {
    // e.preventDefault();
    // Here you can add your logic to handle form submission
    const requestBody = {
      email,
      password,
    };

    try {
      const response = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Handle successful sign up
        const token = await response.text();
        console.log("Login successful!");
        // Extract the token from the response
        const data = token;

        // Store the token in localStorage (or sessionStorage)
        localStorage.setItem("auth_token", data);
        // Update the token state
        setToken(data);
        navigate("/");
      } else {
        // Handle sign up error
        const resultError = await response.text();
        setError(resultError);
        console.log("errrrro......", resultError);
        alert(" " + resultError);
        if (
          resultError ==
          "Account processing was succesfull. Please check your email for verification to complete this process..."
        ) {
          navigate("/");
        }
        console.error("Login failed:", resultError);
      }
    } catch (error) {
      setError(error.message);
      alert(" " + error.message);
      console.error("Error Loging in:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-green-400">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 transform transition duration-500 ease-in-out hover:scale-105">
        <h2 className="text-3xl font-semibold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value.toString())}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value.toString())}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toString())}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Safaricom Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.toString())}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value.toString())}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={() => setAcceptTerms(!acceptTerms)}
              className="mr-2"
            />
            <p className="text-sm text-gray-600">
              Accept{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Terms and Conditions
              </a>
            </p>
          </div>
          <button
            type="submit"
            disabled={!acceptTerms}
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
            Sign Up
            {isLoading && <AppLoader />}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <button
            onClick={toggleForms}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

const AppLoader = () => {
  return (
    <div
      className="spinner"
      style={{
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #007bff",
        borderRadius: "50%",
        width: "24px",
        height: "24px",
      }}
    ></div>
  );
};

// Login Component
const Login = ({ toggleForms }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Here you can add your logic to handle form submission
    const requestBody = {
      email,
      password,
    };

    try {
      const response = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const token = await response.text();

      if (response.ok) {
        // Handle successful sign up
        console.log("Login successful!", token);

        // Extract the token from the response
        const data = token;

        // Store the token in localStorage (or sessionStorage)
        localStorage.setItem("auth_token", data);
        // Update the token state
        setToken(data);
        navigate("/");
        setIsLoading(false);
      } else {
        // Handle log in error
        const resultError = token;
        setError(resultError);
        alert("Error Loging you in: " + resultError);
        console.error("Login failed:", resultError);
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.message);
      alert("Error Loging in: " + error.message);
      console.error("Error Loging in:", error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-green-400">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 transform transition duration-500 ease-in-out hover:scale-105">
        <h2 className="text-3xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toString())}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value.toString())}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className={
              isLoading
                ? "w-full bg-gray-500 text-white py-2 rounded-md hover:bg-blue-600"
                : "w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            }
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pointerEvents: isLoading ? "none" : "auto",
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              <p>Login</p>
              {isLoading && <AppLoader />}
            </div>
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <button
            onClick={toggleForms}
            className="text-blue-500 hover:underline"
          >
            Sign Up Now
          </button>
        </p>
        <p className="text-center">
          <a href="#" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
};

// Main App Component
const Credentials = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForms = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div>
      {isSignUp ? (
        <SignUp toggleForms={toggleForms} />
      ) : (
        <Login toggleForms={toggleForms} />
      )}
    </div>
  );
};

export default Credentials;
