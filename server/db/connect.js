const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

let cachedConnection = null;

const connectDb = async (url) => {
  if (cachedConnection) return cachedConnection;
  cachedConnection = await mongoose.connect(url);
  console.log("CONNECTED TO THE DB..");
  return cachedConnection;
};

module.exports = connectDb;
