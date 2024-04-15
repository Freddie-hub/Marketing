import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";

// Sign Up Component
const SignUp = ({ toggleForms }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [token, setToken] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();



  const handleSubmit = async(e) => {
    e.preventDefault();
    // Here you can add your logic to handle form submission
    const requestBody = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber
    };
  
    try {
      const response = await fetch('https://rnrclone.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (response.ok) {


        console.log('Sign up successful!');
        alert('Sign up successful!');

        navigate("/login");

      } else {
        // Handle sign up error
        setError( response.text());
        alert('Error signing up: ' +response.text());
        console.error('Sign up failed:', response);
      }
    } catch (error) {
      alert('Error signing up: ' + error.message);
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" checked={acceptTerms} onChange={() => setAcceptTerms(!acceptTerms)} className="mr-2" />
            <p className="text-sm text-gray-600">Accept <a href="#" className="text-blue-500 hover:underline">Terms and Conditions</a></p>
          </div>
          <button type="submit" disabled={!acceptTerms} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Sign Up</button>
        </form>
        <p className="text-center mt-4">Already have an account? <button onClick={toggleForms} className="text-blue-500 hover:underline">Login</button></p>
      </div>
    </div>
  );
};

// Login Component
const Login = ({ toggleForms }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Here you can add your logic to handle form submission
    const requestBody = {
      email,
      password
    };
  
    try {
      const response = await fetch('https://rnrclone.onrender.com/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (response.ok) {
        // Handle successful sign up
        console.log('Login successful!',response.body);
        // Extract the token from the response
        const data = await response.json();

        // Store the token in localStorage (or sessionStorage)
        localStorage.setItem("auth_token", data);
        // Update the token state
        setToken(data);
        navigate("/");
      } else {
        // Handle sign up error
        setError(response.text());
        alert('Error Loging in: ' + response.text());
        console.error('Login failed:', response);
      }
    } catch (error) {
      setError(error.message);
      alert('Error Loging in: ' + error.message);
      console.error('Error Loging in:', error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Login</button>
        </form>
        <p className="text-center mt-4">Don't have an account? <button onClick={toggleForms} className="text-blue-500 hover:underline">Sign Up Now</button></p>
        <p className="text-center"><a href="#" className="text-blue-500 hover:underline">Forgot Password?</a></p>
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
      {isSignUp ? <SignUp toggleForms={toggleForms} /> : <Login toggleForms={toggleForms} />}
    </div>
  );
};

export default Credentials;
