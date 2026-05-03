require("dotenv").config();
const connectDb = require("../db/connect");
const app = require("./app");
const express = require("express");
const path = require("path");

const port = process.env.PORT || 8000;
const staticPath = path.join(__dirname, "../../client/build");

// Serve React production build when running locally with a built client
app.use(express.static(staticPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`listening on ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
