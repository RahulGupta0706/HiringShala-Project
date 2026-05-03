require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const express = require("express");
const cors = require("cors");

const tasksRouter = require("../routes/tasks");
const jobRouter = require("../routes/jobs");
const employeesRouter = require("../routes/employees");
const seekersRouter = require("../routes/seekers");
const otpRouter = require("../routes/otp.js");
const chatRouter = require("../routes/chatRoutes");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api/v1/tasks", tasksRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/employees", employeesRouter);
app.use("/api/v1/seekers", seekersRouter);
app.use("/api/v1/otp", otpRouter);
app.use("/api/v1/chat", chatRouter);

module.exports = app;
