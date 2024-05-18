import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import AppLoader from "../components/AppLoader";
import { useNavigate } from "react-router-dom";
import moneyImage from "../assets/images/money.jpeg";
import API_URL from "../config/apiConfig";

const UploadPage = () => {
  const [category, setCategory] = useState("");
  const [views, setViews] = useState("");
  const [linkValue, setLinkValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [mpesaloading, setMpesaLoading] = useState(false);
  const [linkLoading, setLinkloading] = useState(false);
  const [result, setResult] = useState();
  const [balance, setBalance] = useState(0);
  const [screenshot, setScreenshot] = useState(null);
  const [todaysWork, setTodaysWork] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState();
  const [withdrawalType, setWithdrawalType] = useState("monthly");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [dummyPic, setDummyPic] = useState("");

  useEffect(() => {
    // Check if the token exists in localStorage
    const authenticatedToken = localStorage.getItem("auth_token");
    if (authenticatedToken) {
      setAuthToken(authenticatedToken);
      handleFetchUser(authenticatedToken);
    } else {
      setAuthToken("");
    }
  }, []);

  const handleFetchUser = async (authenticatedToken) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${getSavedToken()}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("User fetch successful!", userData);
        setUser(userData);
        await handleGetTodaysWork(authenticatedToken);
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
  const handleSubmitTodaysWork = async () => {
    // e.preventDefault();
    // setLoading(true);
    console.log("Clickd..........");
    if (linkValue === "") {
      alert("Please enter a valid link");
      return;
    }
    setLinkloading(true);
    try {
      const response = await fetch(`${API_URL}/users/updateTodaysWork`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${getSavedToken()}`,
        },
        body: JSON.stringify({
          adminImgForWorkLink: linkValue,
        }),
      });
      if (response.ok) {
        const userData = await response.json();
        console.log("Link for today's work updated accordingly!", userData);
        setUser(userData);
        //reload
        setLinkloading(false);
        window.location.reload();
        // setLoading(false);
      } else {
        // Handle fetch error
        const data = await response.text();
        console.error("Error occurred when performing the update :", data);
        setLinkloading(false);
        // setLoading(false);
      }
    } catch (error) {
      alert("Error occurred when performing the update : " + error.message);
      console.error(
        "Error occurred when performing the update :",
        error.message,
        error.status
      );
      setLinkloading(false);
      setLoading(false);
    }
  };

  //call server to do handleRequestPayment
  const handleRequestPayment = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/requestPayment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${getSavedToken()}`,
        },
      });

      if (response.ok) {
        const resp = await response.text();
        console.log(resp);
        setLoading(false);
      } else {
        // Handle fetch user error
        const data = await response.text();
        console.error("Error occurred:", data);
        setLoading(false);
      }
    } catch (error) {
      alert("Error occurred: " + error.message);
      console.error("Error occurred:", error.message);
      setLoading(false);
    }
  };

  const handleTriggerStk = async () => {
    setMpesaLoading(true);
    console.log("Triggering STK called............");
    try {
      const clientPhoneNumber = formatPhoneNumber(user.phoneNumber);
      console.log("User Number...........", clientPhoneNumber);
      const response = await fetch(`${API_URL}/users/stkPush`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${getSavedToken()}`,
        },
        body: JSON.stringify({
          ClientPhoneNumber: clientPhoneNumber,
        }),
      });

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
            " Seems Mpesa service is currently unavailable. Please try again later."
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

  const formatPhoneNumber = (phoneNumber) => {
    const trimmedNumber = phoneNumber.replace(/^0/, "");
    const formattedNumber = "254" + trimmedNumber;
    return formattedNumber;
  };

  const getSavedToken = () => {
    setAuthToken;
    return localStorage.getItem("auth_token");
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

  const displayMessage = () => {
    setShowProcessingMessage(true);
  };

  const handleAlertOwnerToPayWorker = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/requestPayment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("auth_token"),
        },
      });
      if (response.ok) {
        // const data = await response.json();
        const data = await response.text();
        alert(`Operation successful!${data}`);
        setLoading(false);
      } else {
        const data = await response.text();

        alert(data);
        setLoading(false);
      }
    } catch (error) {
      alert(" An error occurred while saving views data: " + error.message);
      setLoading(false);
    }
  };
  const handleGetTodaysWork = async (authenticatedToken) => {
    setLoading(true);
    try {
      console.log("Getting today's work....");
      if (!authenticatedToken) return;
      console.log("we are authed...", authenticatedToken);
      const response = await fetch(`${API_URL}/users/getTodaysWork`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authenticatedToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTodaysWork(data);
        for (let key in data) {
          console.log(`${key}: ${data[key]}`);
        }
        console.log("Todays Work:            ....");
        setLoading(false);
      } else {
        const data = await response.text();
        setDummyPic(
          "https://freefrontend.com/assets/img/html-funny-404-pages/CodePen-404-Page.png"
        );
        alert(data);
        setLoading(false);
      }
    } catch (error) {
      alert(
        " An error occurred while getting today's image for posting: " +
          error.message
      );
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    setLoading(true);

    const today = new Date().toISOString().slice(0, 10);
    const lastUploadTimestamp = localStorage.getItem(
      `${category}_upload_timestamp`
    );

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

    const earnings = parseFloat(views) * 2.5;
    setBalance(balance + earnings);

    try {
      console.log("Uploading...", category, " Views: ", views);
      const response = await fetch(`${API_URL}/users/updateWallet`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("auth_token"),
        },
        body: JSON.stringify({ category, views }),
      });
      if (response.ok) {
        const data = await response.json();
        setResult(data);

        // Store the timestamp of the current upload
        localStorage.setItem(
          `${category}_upload_timestamp`,
          new Date().toISOString()
        );

        // Clear inputs
        console.log("Data: ", data);
        alert(`Operation successful!`);
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
      alert(" An error occurred while saving views data: " + error.message);
      setLoading(false);
    }
  };

  const handleWithdrawalTypeChange = (e) => {
    setWithdrawalType(e.target.value);
  };

  const handleWithdrawalAmountChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setWithdrawalAmount(value);
    }
  };

  const handleWithdrawalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {
      if (withdrawalType === "monthly") {
        alert("Payments will be disbursed after every 30 days.");
        setLoading(false);
      } else if (withdrawalType === "referral") {
        // Make API call with withdrawalAmount
        handleRequestPayment();
        setLoading(false);
        alert("Request successful. Payments will be disbursed to your M-pesa once your request is verified")
      }
    } catch (error) {
      alert("An error occurred while processing withdrawal: " + error.message);
      setLoading(false);
    }
  };

  const getTheRightForm = () => {
    if (user && user.isAdmin == true) {
      return (
        <div className="mx-auto max-w-md p-6 mt-2 bg-gray-100 rounded-lg shadow-md z-1">
          <h2 className="text-xl font-semibold">Submit Link</h2>

          <div className="mb-4">
            <label
              htmlFor="link"
              className="block text-gray-700 font-semibold mb-2"
            >
              Enter Link:
            </label>
            <input
              type="text"
              id="link"
              value={linkValue}
              onChange={(e) => setLinkValue(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            // type="submit"
            onClick={() => handleSubmitTodaysWork()}
            disabled={linkLoading}
            className={
              linkLoading
                ? "w-full bg-gray-500 text-white py-2 rounded-md hover:bg-grey-600"
                : "w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            }
            style={{ pointerEvents: linkLoading ? "none" : "auto" }}
          >
            {linkLoading ? "Processing..." : "Submit"}
          </button>
        </div>
      );
    } else if (user && user.isAdmin == false) {
      return (
        <>
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
                {/* <option value="tiktok1">TikTok1</option> */}
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
                placeholder="Number of Views"
                type="number"
                id="views"
                value={views}
                onChange={handleViewsChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4 text-red-700">
            <strong>Make sure the views you enter correspond with the views on the screenshot. Dishonesty will lead to termination of your account and consequently lose all earnings</strong><br/>
              <label
                htmlFor="screenshot"
                className="block text-gray-700 font-semibold mb-2 mt-3"
              >
                
                Screenshot Proof:
              </label>
              <input
           
                required
                type="file"
                id="screenshot"
                onChange={handleScreenshotChange}
                className="w-full p-2 border rounded text-gray-700"
              />
              <p className="text-gray-700 mt-3"><strong>Refresh upon uploading to update your wallet balance</strong> </p>
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
              {"Wallet Balance: Ksh "}
              {result && result.message && user.walletBalance == undefined && (
                <h2 className="text-xl font-semibold">
                  {result ? result.walletBalance : 0}
                </h2>
              )}
              {user && user.walletBalance && (
                <h2 className="text-xl font-semibold">
                  {user ? user.walletBalance : 0} Ksh{" "}
                </h2>
              )}
            </div>
          </div>
          <div className="mt-3 ml-3 mr-3 bg-slate-50 p-6 rounded ">
            <h2 className="text-xl font-semibold">Withdrawal</h2>
            <form onSubmit={handleWithdrawalSubmit} className="mt-4 ">
              <div className="mb-4 ">
                <label
                  htmlFor="withdrawalType"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Withdrawal Type:
                </label>
                <select
                  id="withdrawalType"
                  value={withdrawalType}
                  onChange={handleWithdrawalTypeChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="referral">Referral Earnings</option>
                  <option value="monthly">Monthly Earnings</option>
                </select>
              </div>
              {withdrawalType === "referral" && (
                <div className="mb-4">
                  <label
                    htmlFor="withdrawalAmount"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Enter Amount:
                  </label>
                  <input
                    type="number"
                    id="withdrawalAmount"
                    value={withdrawalAmount}
                    onChange={handleWithdrawalAmountChange}
                    className="w-full p-2 border rounded"
                    required
        
                  />
                </div>
              )}
              <button
                onClick={displayMessage}
                type="submit"
                className={
                  loading
                    ? "w-full bg-gray-500 text-white py-2 rounded-md hover:bg-blue-600"
                    : "w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                }
                style={{ pointerEvents: loading ? "none" : "auto" }}
              >
                {loading ? "Processing..." : "Submit"}
              </button>
            </form>
          </div>
        </>
      );
    } else {
      return (
        <div
          style={{
            //fill the screen
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <AppLoader />
        </div>
      );
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("auth_token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${moneyImage})` }}
    >
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
      <div
        className="flex flex-col md:flex-row justify-between"
        style={{ minHeight: "81.4vh" }}
      >
        <div className="text-white m-4">
          {user ? (
            <p>Welcome, {user.firstName}</p>
          ) : (
            <p>Welcome to the Upload Page</p>
          )}
          <div className="text-orange mt-10 referral-wallet w-auto max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl border-2 border-red-400 border-solid p-2 bg-gray-100 flex justify-center items-center rounded">
            <p class="text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-800">
              Referral Earnings:
              <span className="text-blue-700 m-3">
                {user ? user.referralEarningsBalance : 0.0}
              </span>
            </p>
          </div>
        </div>
        {getTheRightForm()}
        <div className="mx-auto mb-4 max-w-md p-6 mt-2 bg-gray-100 rounded-lg shadow-md z-1 text-center">
          <h2 className="text-xl font-semibold">Product of the day</h2>
          <div className="mb-4">
            {!todaysWork && (
              <p className="text-blue-500 font-semibold">
                Nothing has been uploaded yet for work, once there is an update
                you'll find it here.
              </p>
            )}
            {todaysWork && (
              <img
                src={todaysWork ? todaysWork.todaysJob : dummyPic}
                //copilot make its size small
                style={{ width: "10rem", height: "10rem" }}
                alt="Today's work"
                className="w-full p-2 border rounded"
              />
            )}
          </div>
          {todaysWork && (
            <a
              href={todaysWork ? todaysWork.todaysJob : ""}
              download="todaysWork"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 inline-block"
              //copilot make the button pointers to be suitable for this button
              style={{ pointerEvents: "auto", cursor: "pointer" }}
            >
              Download
            </a>
          )}
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

export default UploadPage;
