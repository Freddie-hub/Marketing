import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import AppLoader from "../components/AppLoader";
import { useNavigate } from "react-router-dom";
import moneyImage from "../assets/images/money.jpeg";
import moneyImage1 from "../assets/images/money1.jpg";
import moneyImage2 from "../assets/images/money2.jpg";

const UploadPage = () => {
  const [category, setCategory] = useState("");
  const [views, setViews] = useState("");
  const [loading, setLoading] = useState(false);
  const [mpesaloading, setMpesaLoading] = useState(false);
  const [result, setResult] = useState();
  const [balance, setBalance] = useState(0);
  const [screenshot, setScreenshot] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState();

  useEffect(() => {
    // Check if the token exists in localStorage
    const authenticatedToken = localStorage.getItem("auth_token");
    if (authenticatedToken) {
      setAuthToken(authenticatedToken);
      handleFetchUser();
    } else {
      setAuthToken("");
    }
  }, []);

  const formatPhoneNumber = (phoneNumber) => {
    // Remove the initial zero if present
    const trimmedNumber = phoneNumber.replace(/^0/, "");

    // Append '254' at the start
    const formattedNumber = "254" + trimmedNumber;

    return formattedNumber;
  };

  const handleTriggerStk = async () => {
    setMpesaLoading(true);
    console.log("Triggering STK called............");
    try {
      const clientPhoneNumber = formatPhoneNumber(user.phoneNumber);
      console.log("User Number...........", clientPhoneNumber);
      const response = await fetch(
        "https://rnrclone.onrender.com/api/users/stkPush",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${getSavedToken()}`,
          },
          body: JSON.stringify({
            ClientPhoneNumber: clientPhoneNumber,
          }),
        }
      );

      if (response.ok) {
        console.log("Stk successful!");
        const userData = await response.json();
        console.log("Stk successful!", userData);
        setMpesaLoading(false);
      } else {
        console.log("Stk Flopped!");
        // Handle fetch user error
        const data = await response.text();
        console.log("Error on stk push:", data);
        if (data.includes("503"))
          alert(
            "Oops! Seems Mpesa service is currently unavailable. Please try again later."
          );
        setMpesaLoading(false);
      }
    } catch (error) {
      console.log("Stk Flopped!", error.message);
      console.error("Error on stk push:", error.message);
      alert("Erroron stk push: " + error.message);
      setMpesaLoading(false);
    }
  };

  const handleFetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://rnrclone.onrender.com/api/users/me",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${getSavedToken()}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        console.log("User fetch successful!", userData);
        setUser(userData);
        setLoading(false);
      } else {
        // Handle fetch user error
        const data = await response.text();
        console.error("Error fetching user:", data);
        setLoading(false);
      }
    } catch (error) {
      alert("Error fetching user details: " + error.message);
      console.error("Error fetching user details:", error.message);
      setLoading(false);
    }
  };

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

  const handleAlertOwnerToPayWorker = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://rnrclone.onrender.com/api/users/requestPayment",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("auth_token"),
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        alert("Operation successful!");
        setLoading(false);
      } else {
        const data = await response.text();
        alert(data);
        setLoading(false);
      }
    } catch (error) {
      alert(
        "Oops! An error occurred while saving views data: " + error.message
      );
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    
    // Check if the user has already uploaded an image for the selected category today
    const today = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const lastUploadTimestamp = localStorage.getItem(`${category}_upload_timestamp`);
    
    if (lastUploadTimestamp && lastUploadTimestamp.includes(today)) {
      setError(`You have already uploaded an image for ${category} today.`);
      setLoading(false);
      return;
    }
    
    if (!category || views === "") {
      setError("Please select category and enter valid views.");
      setLoading(false);
      return;
    }
    
    setError("");

    // Multiply views by 2.5Ksh
    const earnings = parseFloat(views) * 2.5;
    // Update balance
    setBalance(balance + earnings);

    //make API call to upload
    try {
      console.log("Uploading...", category, " Views: ", views);
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
      if (response.ok) {
        const data = await response.json();
        // const data = await response;
        setResult(data);
        
        // Store the timestamp of the current upload
        localStorage.setItem(`${category}_upload_timestamp`, new Date().toISOString());
        
        // Clear inputs
        console.log("Data: ", data);
        alert(`Operation successful! ${data}`);
        setCategory("");
        setViews("");
        setScreenshot(null);
        handleAlertOwnerToPayWorker();
        setLoading(false);
      } else {
        const data = await response.text();
        setResult(null);
        alert(data);
        setLoading(false);
        if (
          data ==
          "You need to pay for subscription first. You will receive a pop up on your phone to pay for subscription. Once you pay, you will be able to start working."
        ) {
          handleTriggerStk();
        }
      }
    } catch (error) {
      setResult(null);
      alert(
        "Oops! An error occurred while saving views data: " + error.message
      );
      setLoading(false);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("auth_token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div style={{ backgroundImage: `url(${moneyImage})`, backgroundSize: 'cover', minHeight: '100vh', backgroundPosition: 'center' }}>
      <Navbar authToken={authToken} handleLogOut={handleLogOut} />
      {mpesaloading && (
        <div className="bg-white-200 bg-cover bg-center bg-blur backdrop-blur-sm bg-opacity-70 flex w-full h-full z-2 absolute">
          <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-4xl font-semibold text-center">
              We've sent a request to Mpesa
            </h1>
            <p className="text-xl font-semibold text-center">
              Once the request is processed you will be able to pay and start
              working.
            </p>
            {mpesaloading && <AppLoader />}
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <div  className="text-white m-4">
          {user ? (
            <p>Welcome, {user.firstName}</p>
          ) : (
            <p>Welcome to the Upload Page</p>
          )}
            <div class="text-orange mt-10 referral-wallet w-100 h-100 border-2 border-red-400 border-solid">
          <p class="left-0">Referral Earnings</p>

          <div class="">
            <p>Earnings: <span class="earnings-balance">[Your balance in Ksh]</span></p>
          </div>
        </div>

        </div>
        <div className="mx-auto max-w-md p-6 mt-2 bg-gray-100 rounded-lg shadow-md z-1">
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
            className={
              loading
                ? "w-full bg-gray-500 text-white py-2 rounded-md hover:bg-blue-600"
                : "w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            }
            style={{
              pointerEvents: loading ? "none" : "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? "Loading...  " : "Upload"}

            {loading && <AppLoader />}
          </button>
          <div className="mt-6">
            {result && result.message && user.walletBalance == undefined && (
              <h2 className="text-xl font-semibold">
                Wallet Balance: {result ? result.walletBalance : 0} Ksh
              </h2>
            )}
            {user && user.walletBalance && (
              <h2 className="text-xl font-semibold">
                {" "}
                Wallet Balance: {user ? user.walletBalance : 0} Ksh{" "}
              </h2>
            )}
          </div>
        </div>
        <div>
          <p className="right-0">Withdraw</p>
        </div>
      </div>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>
          &copy; {new Date().getFullYear()} R and J Group. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

function getSavedToken() {
  return localStorage.getItem("auth_token");
}

export default UploadPage;
