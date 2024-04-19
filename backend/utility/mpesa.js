const config = require("config");
const datetime = require("node-datetime");
const passKey = config.get("PASSKEY");
const shortCode = config.get("SHORTCODE");

const consumerKey = config.get("CONSUMERKEY");
const consumerSecret = config.get("CONSUMERSECRET");
const axios = require("axios");

const time = datetime.create();
const formattedTime = time.format("YmdHMS");

const encryptPassword = () => {
  const result = Buffer.from(shortCode + passKey + formattedTime).toString(
    "base64"
  );

  return result;
};
//fix

//token generation middleware
exports.token = async (req, res, next) => {
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const auth =
    "Basic " +
    Buffer.from(consumerKey + ":" + consumerSecret).toString("base64");
  // .replace(/={1,2}$/, "")
  const headers = { Authorization: auth };
  console.log(
    "variables have",
    "url:......",
    url,
    "auth:......",
    auth,
    " headers:......",
    headers
  );

  await axios
    .get(url, { headers: headers })
    .then((response) => {
      req.token = response.data.access_token;
      next();
    })
    .catch((e) => {
      res.status(500).send(e.message);
      console.log("Error From Mpesa In Utility Folder...", e.message);
      console.warn(e);
    });
};

exports.stkPush = async (req, res) => {
  const phone = req.body.ClientPhoneNumber;
  const token = req.token;
  console.log("good test... ", req.body);

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  const stkURL =
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  // 174379
  let data = {
    BusinessShortCode: "174379",
    Password: `${encryptPassword()}`,
    Timestamp: formattedTime,
    TransactionType: "CustomerPayBillOnline",
    Amount: "1",
    PartyA: `${phone}`,
    PartyB: "174379",
    // PhoneNumber: `${req.body.ClientPhoneNumber}`,
    PhoneNumber: phone,
    CallBackURL: "100.20.92.101/api/users/stk_callback",
    // CallBackURL: "https://rnrclone.onrender.com/api/users/stk_callback",

    AccountReference: "Rosemary ann Jerad Group",
    TransactionDesc: "Subscription",
  };

  await axios
    .post(stkURL, data, { headers: headers })
    .then((response) => {
      console.log(req.body);
      res.send(response.data);
    })
    .catch((e) => {
      console.warn("Error From Mpesa In Utility Folder", e);
      res.status(500).send(e.message);
    });
};
