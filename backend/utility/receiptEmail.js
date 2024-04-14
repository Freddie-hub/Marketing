const receiptEmailMarkup = (engineerName, userName, pin) => `
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
          <td><img
      
            style="align-self: center; margin: auto;"
            src="https://raw.githubusercontent.com/Brian-Magomere-Igadwa/code-challenge-2/master/src/2Nifixie.png"
            alt="Nifixie"
          /></td>
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
            #Code stress-less
          </h2></td>
          <td></td>
      </tr>
  </table>
      
    </div>
    <div style="width: 100%; padding: 0 5vw 0;">
      
      <div style="width: 100%;">
        <p style="font-weight: 700; color: #3e2115;">
          New Order Received!
        </p>
        <p style="font-weight: 500; color: #3e2112;">
          RECEIPT: #312EFZ
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
          Your new access PIN for the chat with ${engineerName} is : 
          <span style="font-weight: 500; color: #4285f4; font-weight: 700;">
              ${pin}
            </span>
            <br>
            Thank you ${userName}! 
        </h5>
        <div>
          <img
            src="https://raw.githubusercontent.com/Brian-Magomere-Igadwa/code-challenge-2/master/src/Nifixie%20(1).png"
            alt="Nifixie"
            style="margin-bottom: 1rem;"
          />
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
            Nifixie is committed to preventing fradulent email activity. Emails
            from Nifixie will always contain your full name.
          </p>

 
         
        </div>
      </div>
    </div>
  </div>
</body>`;
