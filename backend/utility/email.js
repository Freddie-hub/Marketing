const emailMarkup = (referalCode, url, _id, uniqueString, token) => `

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
  <div>
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
    <table > <!-- Add the border attribute to display borders for clarity -->
      <tr> <!-- First row -->
          <td></td>
          <td></td>
          <td></td>
      </tr>
      <tr> <!-- Second row -->
          <td>
             </td>
          <td> <h2
            style="
              color: white;
              width: 100%;
              margin-left: 1rem;
              text-align: left;
              font-size: 10;
              font-weight: 400;
            "
          >

          </h2></td>
          <td></td>
      </tr>
  </table>
      
    </div>
    <div style="width: 100%; padding: 0 5vw 0;">
      <h5 style="width: 60%; color: #3e2115; font-weight: 300; font-size: 12;">
        Hello, User Name
      </h5>
      <div style="width: 100%;">
        <p style="font-weight: 700; color: #3e2115;">
          Welcome!
        </p>
        <h5
          style="
            margin-bottom: 4rem;
            width: 60%;
            color: #3e2115;
            font-weight: 300;
            font-size: 12;
          "
        >
        Note your referal code is : ${referalCode}.
          Only one last step, verify your email address to sign in to RnJ.
          <span style="font-weight: 500; color: #4285f4; font-weight: 700;">
              <a href=${
                url +
                "users/verify/" +
                _id +
                "/" +
                uniqueString +
                "?token=" +
                token
              }
                >    Click</a
              >
            </span>To Verify your account.
        </h5>
        <div>
        
        </div>
        <div
          style="width: 100%; background-color: #998b85; height: 0.1rem;"
        ></div>

        <div style="gap: 1rem;">
          <p
            style="
              margin-bottom: 4rem;
              width: 60%;
              color: #3e2115;
              font-weight: 300;
              font-size: 10;
            "
          >
            RnJ is committed to preventing fradulent email activity. Emails
            from RnJ will always contain a full name.
          </p>

          <p
            style="
              margin-bottom: 4rem;
              width: 60%;
              color: #3e2115;
              font-weight: 300;
              font-size: 10;
            "
          >
            If this email was sent to you by mistake, kindly ignore it.
          </p>
          <h5
            style="
              margin-bottom: 4rem;
              width: 60%;
              color: #3e2115;
              font-weight: 500;
              font-size: 10;
            "
          >
            Please note that verification links expire after 30 minutes
          </h5>
        </div>
      </div>
    </div>
  </div>
</body>


`;

exports.emailMarkup = emailMarkup;
