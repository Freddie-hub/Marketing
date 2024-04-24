url = "https://api.seosblog.com/";
let phone = "0748315157"; //replace with your phonenumber
let amount  = 10;
bodydata = {
  phone: phone,
  amount: amount,
}

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Api-Secret": "justboogie",
    "load_response": true
  },
  body: JSON.stringify(bodydata)
})
.then(res => res.json())
.then(data => console.log(data))