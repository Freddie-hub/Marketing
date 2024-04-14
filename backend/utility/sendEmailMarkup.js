const emailMarkup = (WorkingCodeLink, _id) => `
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
  rel="stylesheet"
/>
<body
  style="
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  "
>
  <div
    style="
      width: 100%;
      background-color: #945236;
      height: 20vh;
      padding: 5vh 0vh 0;
      display: flex;
      justify-content: center;
      flex-direction: column;
    "
  >
    <img
      style="align-self: center; margin: auto;"
      src="https://raw.githubusercontent.com/Brian-Magomere-Igadwa/code-challenge-2/master/src/2Nifixie.png"
      alt="Nifixie"
    />
    <h2
      style="
        color: white;
        width: 100%;
        margin-left: 1rem;
        text-align: left;
        font-size: 10;
        font-weight: 400;
      "
    >
      #Code stress-less
    </h2>
  </div>
  <div style="width: 100%; padding: 0 5vw 0;">
    <p style="font-weight: 700; color: #3e2115;">Your Fixed Code is ready!</p>

    <h5 style="width: 60%; color: #3e2115; font-weight: 300; font-size: 12;">
      That you are seeing this specific email, it means you are our most valued
      customer. Thank you so much for your support. Welcome to Nifixie
    </h5>
    <h5
      style="
        width: 60%;
        font-weight: 700;
        color: #3e2115;
        font-size: 12;
        height: 1vh;
      "
    >
      Sent with love by
    </h5>
    <h5
      style="
        width: 60%;
        color: #3e2115;
        font-weight: 700;
        font-size: 12;
        height: 1vh;
      "
    >
      Igadwa Magomere,
    </h5>
    <h5 style="width: 60%; color: #3e2115; font-weight: 300; font-size: 10;">
      <i> from Nifixie - Fiti LLC </i>
    </h5>
    <button
      style="
        background-color: #945236;
        border-radius: 1rem;
        border: none;
        padding: 1rem;
      "
    >
      <a
        style="
          color: white;
          display: flex;
          outline: none;
          justify-content: center;
          align-content: center;
          align-items: center;
          text-decoration: none;
        "
        href="${WorkingCodeLink}"
        ><svg
          style="color: white;"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M17 13v-13h-2v5h-2v-3h-2v7h-2v-9h-2v13h-6l11 11 11-11z" />
        </svg>
        <h5 style="font-weight: 700;">Download Fixed Code</h5></a
      >
    </button>

    <h5 style="width: 50%; font-weight: 400; font-size: 10;">
      If this email was sent to you by mistake, ignore it, Have a good one...
      remember to smile and stay curious ; )
    </h5>
  </div>
</body>




`;
// url + "users/verify/" + _id + "/" + uniqueString + "?token=" + token

exports.emailMarkup = emailMarkup;
