const connectDb = require("../server/db/connect");
const app = require("../server/src/app");

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDb(process.env.MONGO_URI);
    isConnected = true;
  }
  return app(req, res);
};
