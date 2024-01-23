const connectDb = require("../db/connect");
require("dotenv").config();
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const path = require("path");

const staticPath = path.join(__dirname, "../../client/build");
const tasksRouter = require("../routes/tasks");
const jobRouter = require("../routes/jobs");
const employeesRouter = require("../routes/employees");
const seekersRouter = require("../routes/seekers");
const otpRouter = require("../routes/otp.js");
const chatRouter = require("../routes/chatRoutes");

app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/employees", employeesRouter);
app.use("/api/v1/seekers", seekersRouter);
app.use("/api/v1/otp", otpRouter);
app.use("/api/v1/chat", chatRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`listening to youuu on ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
