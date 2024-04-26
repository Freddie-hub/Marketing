import React, { useEffect, useState } from "react";
import Modal from "./modal";
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLoader from "./AppLoader";

export default function Navbar({ authToken, handleLogOut }) {
  //make state for showing User Profile
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userloading, setUserloading] = useState(false);
  const [mpesaloading, setMpesaLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [referralCodeValue, setReferralCodeValue] = useState("");
  const navigate = useNavigate();

  const handleFetchUser = async () => {
    setLoading(true);
    setUserloading(true);
    setUser(null);
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
        if (!userData.IsEligibleToWork) {
          navigate("/");
        }
        setUserloading(false);
        setLoading(false);
      } else {
        // Handle fetch user error
        const data = await response.text();
        console.error("Error fetching user:", data);
        setUserloading(false);
        setLoading(false);
      }
    } catch (error) {
      // alert("Error fetching user details: " + error.message);
      alert(
        "We experienced an error on your account. We will need you to login."
      );
      navigate("/login");
      console.error("Error fetching user details:", error.message);
      setUserloading(false);
      setLoading(false);
    }
  };

  const generateCorrectRequestBody = (clientPhoneNumber) => {
    if (referralCodeValue)
      return {
        ClientPhoneNumber: clientPhoneNumber,
        referralCode: referralCodeValue,
      };
    if (!referralCodeValue)
      return {
        ClientPhoneNumber: clientPhoneNumber,
      };
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
          body: JSON.stringify(generateCorrectRequestBody(clientPhoneNumber)),
        }
      );

      if (response.ok) {
        console.log("Stk successful!");
        const userData = await response.json();
        console.log("Stk successful!", userData);
        if (userData.Desc.includes("Cancelled")) {
          alert(
            "Seems you cancelled the payment. You have to clear it before proceeding."
          );
          setMpesaLoading(false);
        }
        handleFetchUser();
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

  const handleToggleUserProfile = (isOn) => {
    setShowUserProfile(isOn);
  };

  const formatPhoneNumber = (phoneNumber) => {
    // Remove the initial zero if present
    const trimmedNumber = phoneNumber.replace(/^0/, "");

    // Append '254' at the start
    const formattedNumber = "254" + trimmedNumber;

    return formattedNumber;
  };

  const isUserAbleToStartWorking = () => {
    if (authToken) {
      if (user && user.IsEligibleToWork) {
        return (
          <a
            href="/upload"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Go To Working Page
          </a>
        );
      } else {
        //make a button for activating account which opens a pop up
        if (userloading) return <AppLoader />;
        if (!user.IsEligibleToWork)
          return (
            <Modal innerText="Activate Account" className="right-4">
              <div className="max-h-80  px-6 py-4 border-4 border-red-500 rounded-lg ">
                <p>
                  Enter Referral Code below. If you were not referred leave it
                  blank{" "}
                </p>
                <input
                  placeholder="Referral Code"
                  className="mt-4 mb-4 p-2 mr-3 rounded"
                  value={referralCodeValue}
                  onChange={(e) => setReferralCodeValue(e.target.value)}
                />
                <button
                  onClick={() => {
                    //make a fetch call to the backend to activate the account
                    //if successful, show a success message
                    //if not successful, show an error message
                    handleTriggerStk();
                  }}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Initiate Mpesa Payment
                </button>
              </div>
            </Modal>
          );
      }
    } else {
      return (
        <a
          href="/login"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          {" "}
          Start Working
        </a>
      );
    }
  };

  useEffect(() => {
    // Check if the token exists in localStorage
    const authenticatedToken = localStorage.getItem("auth_token");
    if (authenticatedToken) {
      setLoggedIn(true);
      handleFetchUser();
    }
    if (!authenticatedToken) setLoggedIn(false);
  }, []);

  return (
    <>
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
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-white font-bold text-lg">
            R and J Group
          </a>
          <ul className="flex">
            <li className="mr-5">
              <a href="/" className="text-white">
                Home
              </a>
            </li>
            <li className="mr-5">
              <a href="/projects" className="text-white">
                Projects
              </a>
            </li>
            <li className="mr-5">
              <a href="/services" className="text-white">
                Services
              </a>
            </li>
            <li className="mr-5">
              <a href="/about-us" className="text-white">
                About Us
              </a>
            </li>
            <li className="mr-5">
              <Modal innerText="How it Works">
                <div className="max-h-80 overflow-y-scroll px-6 py-4 border-4 border-red-500 rounded-lg animate-pulse">
                  <p className="mb-4 animate-fadeIn">
                    <strong>Step 1. Sign Up as an Influencer/Champion</strong>
                    <br />
                    <span className="ml-4">
                      Interested in monetizing your social media presence? Join
                      our network of influencers by signing up through our
                      website. Once approved, you'll gain access to exciting
                      opportunities to showcase brands and earn money through
                      our Pay per View program.
                    </span>
                  </p>
                  <p className="mb-4 animate-fadeIn">
                    <strong>Step 2. Choose Your Platform/Platforms</strong>
                    <br />
                    <span className="ml-4">
                      Select the social media platforms where you're most active
                      and have a substantial following. Our Pay per View program
                      currently supports WhatsApp status, Instagram stories,
                      Facebook stories, and TikTok stories. N/B you are allowed
                      to choose all.
                    </span>
                  </p>
                  <p className="mb-4 animate-fadeIn">
                    <strong>Step 3. Upload on your status</strong>
                    <br />
                    <span className="ml-4">
                      Each day you will be provided with a product to upload on
                      your status for a period of 24 hours. We believe that
                      status and stories provide for a more intimate audience
                      than normal posts.
                    </span>
                  </p>
                  <p className="mb-4 animate-fadeIn">
                    <strong>Step 4. Share with Your Followers:</strong>
                    <br />
                    <span className="ml-4">
                      Share the content on your chosen social media platforms,
                      reaching your followers organically. Each time your post
                      is viewed by your followers, you'll earn 2.50 Ksh per view
                      on WhatsApp status, Instagram stories, Facebook stories,
                      and TikTok stories.
                    </span>
                  </p>
                  <p className="mb-4 animate-fadeIn">
                    <strong>Step 5. Track Your Earnings:</strong>
                    <br />
                    <span className="ml-4">
                      Keep track of your earnings through our transparent
                      tracking system. You'll have access to real-time data on
                      the number of views your posts receive and how much you've
                      earned from each campaign.
                    </span>
                  </p>
                  <p className="mb-4 animate-fadeIn">
                    <strong>Step 6. Grow Your Influence and Income:</strong>
                    <br />
                    <span className="ml-4">
                      As you continue to collaborate with Rosemary and Jared
                      Group, you'll not only earn money but also have the
                      opportunity to expand your influence and grow your online
                      presence. Join us in creating authentic connections
                      between brands and consumers while earning a steady
                      income.
                    </span>
                  </p>
                  <p className="mb-4 animate-fadeIn">
                    <strong>
                      Why Join Rosemary and Jared Group's Influencer Network?
                    </strong>
                    <br />
                    <span className="ml-4">
                      - High Earnings: Earn Ksh2.50 per view on WhatsApp status,
                      Instagram stories, Facebook stories, and TikTok stories.
                      <br />
                      - Flexibility: Work from anywhere, anytime, and choose the
                      campaigns that align with your interests and audience.
                      <br />- Professional Support: Access to a dedicated team
                      that provides guidance, resources, and support throughout
                      your journey as an influencer.
                    </span>
                  </p>
                  <p className="mb-4 animate-fadeIn">
                    <strong>Ready to Monetize Your Influence?</strong>
                    <br />
                    <span className="ml-4">
                      Sign up today to become a part of our influencer network
                      and start earning money by sharing brands you love with
                      your followers.
                    </span>
                  </p>
                </div>
              </Modal>
            </li>

            <li className="mr-5">
              <Modal innerText="FAQs">
                <div className="max-h-80 overflow-y-scroll px-6 py-4 border-4 border-red-500 rounded-lg animate-pulse">
                  <p className="mb-4 animate-fadeIn">
                    <strong className="text-blue">
                      1. How does the Pay per View (PPV) program work for
                      influencers?
                    </strong>
                    <br />
                    <span className="ml-4">
                      - The Pay per View program allows influencers to earn
                      money by showcasing products on their social media
                      platforms. You upload the provided products and earn Ksh
                      2.50 per view on WhatsApp status, Instagram stories,
                      Facebook stories, and TikTok stories.
                    </span>
                  </p>
                  <p className="mb-4 animate-fadeIn">
                    <strong>
                      2. How do I sign up to become an influencer for the PPV
                      program?
                    </strong>
                    <br />
                    <span className="ml-4">
                      - Signing up is easy! Visit our website and navigate to
                      the Influencer Sign-up page. Fill out the required
                      information, submit your application, validate your number
                      and once approved, you'll gain access to exciting
                      opportunities to collaborate with brands.
                    </span>
                  </p>
                  <p className="mb-4 animate-fadeIn">
                    <strong>
                      3. Is there a sign-up fee or application Fee?
                    </strong>
                    <br />
                    <span className="ml-4">
                      - NO. we do not charge a sign-up fee. It is absolutely
                      free. You are however required to validate your number
                      using 200 Ksh which will be credited/added back to your
                      account. This is meant to ensure that we are dealing with
                      verified people only. A sign-up bonus by R&amp;J Group of
                      300 Ksh will also be added to your account bringing the
                      total to 500 upon sign up.
                    </span>
                  </p>
                  <p className="mb-4 animate-fadeIn">
                    <strong>
                      4. How much can I earn through the PPV program?
                    </strong>
                    <br />
                    <span className="ml-4">
                      - Influencers earn Ksh 2.50 per view on WhatsApp status,
                      Instagram stories, Facebook stories, and TikTok stories.
                      Your earnings will depend on the number of views your
                      content receives, so the more engaging your posts are, the
                      higher your potential earnings.
                    </span>
                  </p>
                  <p className="mb-4 animate-fadeIn">
                    <strong>
                      5. How do I track my earnings from the PPV program?
                    </strong>
                    <br />
                    <span className="ml-4">
                      - We provide a transparent tracking system that allows you
                      to monitor your earnings in real-time. You'll have access
                      to data on the number of views your posts receive and how
                      much you've earned from each campaign. This information is
                      updated regularly to ensure transparency and accuracy.
                    </span>
                  </p>
                  <p className="mb-4 animate-fadeIn">
                    <strong>
                      6. Is there a minimum threshold for payouts from the PPV
                      program?
                    </strong>
                    <br />
                    <span className="ml-4">
                      - Yes, we have a minimum payout threshold at 1000 Ksh to
                      ensure efficiency in our payment process. Once you reach
                      the minimum threshold, you'll receive your earnings
                      through your preferred payment method (Mobile Money or
                      Bank) after 30 days as a normal salaried employee.
                    </span>
                  </p>
                  <p className="mb-4 animate-fadeIn">
                    <strong>
                      7. Can I collaborate with brands outside of the PPV
                      program?
                    </strong>
                    <br />
                    <span className="ml-4">
                      - Absolutely! While the PPV program offers exciting
                      opportunities for earning money through product showcases,
                      you're free to collaborate with brands outside of the
                      program as well. We encourage you to explore various
                      partnership opportunities to diversify your income
                      streams.
                    </span>
                  </p>
                  <p className="mb-4 animate-fadeIn">
                    <strong>
                      8. How often are new campaigns available for influencers
                      in the PPV program?
                    </strong>
                    <br />
                    <span className="ml-4">
                      - New campaigns are regularly available for influencers in
                      the PPV program. Our team is constantly working to bring
                      exciting opportunities from a diverse range of brands. We
                      are currently running campaigns for 6 months. Keep an eye
                      on your inbox for notifications about new campaigns and
                      opportunities to earn money.
                    </span>
                  </p>
                  <p className="mb-4 animate-fadeIn">
                    <strong>
                      9. How do I contact support if I have questions or need
                      assistance with the PPV program?
                    </strong>
                    <br />
                    <span className="ml-4">
                      - If you have any questions or need assistance with the
                      PPV program, our dedicated support team is here to help.
                      You can reach out to us through the contact information
                      provided on our website, and we'll be happy to assist you.
                    </span>
                  </p>
                  <p className="mb-4 animate-fadeIn">
                    <strong>Referral Program:</strong>
                    <br />
                    <span className="ml-4">
                      Take advantage of our exciting referral program. Immediate
                      Cash Back on every 4 referrals of 100 ksh.
                    </span>
                  </p>
                </div>
              </Modal>
            </li>

            <li className="mr-5">
              <a href="/contact" className="text-white">
                Contact
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-2">
            <TheRightButtonGenerator
              token={authToken}
              handleLogOut={handleLogOut}
            />
            {/* <a href="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Login</a> */}
            {isUserAbleToStartWorking()}

            <div
              className=""
              onClick={() => handleToggleUserProfile(true)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <CircleUserRound
                size={40}
                className="text-white cursor-pointer"
              />
              {showUserProfile == true && (
                <div
                  className="absolute bg-blue-100 top-14 right-0 w-80 min-h-20vh rounded shadow-md flex center border border-solid border-orange-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleUserProfile(false);
                  }}
                >
                  <div
                    className="text-black"
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      cursor: "pointer",
                      padding: "0.5rem",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 border border-solid bg-blue-200 border-orange-600 rounded"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  {loading && <AppLoader />}
                  {user != null && (
                    <ul className="ml-5 mt-3 mb-5 padding-5 ">
                      <li>
                        <p className="text-black">Email: {user.email}</p>
                      </li>
                      <li>
                        <p className="text-black">
                          Name: {user.firstName} {user.lastName}
                        </p>
                      </li>
                      <li>
                        <p className="text-black">
                          Phone Number: {user.phoneNumber}
                        </p>
                      </li>
                      <li>
                        <p className="text-black">
                          Wallet Balance: {user.walletBalance}
                        </p>
                      </li>
                    </ul>
                  )}
                  {user == null && (
                    <p className="text-black">
                      You need to log in or sign up first!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

function TheRightButtonGenerator({ token, handleLogOut }) {
  if (token != "") {
    return (
      <button
        onClick={handleLogOut}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    );
  } else {
    return (
      <div />
      // <a
      //   href="/login"
      //   className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      // >
      //   Login
      // </a>
    );
  }
}
function getSavedToken() {
  return localStorage.getItem("auth_token");
}
