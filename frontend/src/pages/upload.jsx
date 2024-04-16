import React, { useState } from "react";
import Navbar from "../components/navbar";

const UploadPage = () => {
  const [category, setCategory] = useState("");
  const [views, setViews] = useState("");
  const [result, setResult] = useState();
  const [balance, setBalance] = useState(0);
  const [screenshot, setScreenshot] = useState(null);
  const [error, setError] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleViewsChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setViews(value);
    }
  };

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    setScreenshot(file);
  };

  const handleUpload = async () => {
    if (!category || views === "") {
      setError("Please select category and enter valid views.");
      return;
    }
    setError("");

    // Multiply views by 2.5Ksh
    const earnings = parseFloat(views) * 2.5;
    // Update balance
    setBalance(balance + earnings);

    //make API call to upload
    try {
      const response = await fetch(
        "https://rnrclone.onrender.com/api/users/updateWallet",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("auth_token"),
          },
          body: JSON.stringify({ category, views }),
        }
      );
      const data = await response.json();
      setResult(data);
      if (response.ok) {
        // Clear inputs
        setCategory("");
        setViews("");
        setScreenshot(null);
      } else {
        alert(data.message);
      }
    } catch (error) {}
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-md p-6 mt-8 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6">Upload Page</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-semibold mb-2"
          >
            Select Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select...</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="facebook">Facebook</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="views"
            className="block text-gray-700 font-semibold mb-2"
          >
            Enter Views:
          </label>
          <input
            type="number"
            id="views"
            value={views}
            onChange={handleViewsChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="screenshot"
            className="block text-gray-700 font-semibold mb-2"
          >
            Screenshot Proof:
          </label>
          <input
            type="file"
            id="screenshot"
            onChange={handleScreenshotChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Upload
        </button>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">
            Wallet Balance: {balance} Ksh
          </h2>
        </div>
      </div>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>
          &copy; {new Date().getFullYear()} R and J Group. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default UploadPage;
