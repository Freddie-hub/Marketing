const config = require("config");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: config.get("CLOUDINARY_NAME"),
  api_key: config.get("CLOUDINARY_API_KEY"),
  api_secret: config.get("CLOUDINARY_API_SECRET"),
});

module.exports = { cloudinary };
