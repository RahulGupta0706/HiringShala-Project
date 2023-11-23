const usedOtps = new Set();
const { OtpVerification, Employees, Seekers } = require("../models/schema");

function generateUniqueOtp() {
  let otp;
  do {
    otp = Math.floor(Math.random() * 9000) + 1000;
  } while (usedOtps.has(otp));
  usedOtps.add(otp);
  setTimeout(() => usedOtps.delete(otp), 5 * 60 * 1000);
  return otp;
}

const sendOtp = async (req, res) => {
  try {
    const AWS = require("aws-sdk");
    const ses = new AWS.SES({ region: "ap-south-1" });
    const { email } = req.body;
    const otp = generateUniqueOtp();
    const emailParams = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: {
            Data: `Your OTP is ${otp}`,
          },
        },
        Subject: {
          Data: "Email OTP",
        },
      },
      Source: "info@hiringshala.com",
    };

    try {
      const result = await ses.sendEmail(emailParams).promise();
      // Save OTP and email to database
      const otpVerification = new OtpVerification({
        email,
        otp,
      });
      await otpVerification.save();

      res.status(200).send("OTP sent successfully");
    } catch (err) {
      res.status(500).send("Email sending failed");
    }
  } catch {
    res.status(500).send("Error Sending OTP");
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp , userType} = req.body;

  try {
    const otpVerification = await OtpVerification.findOne({ email, otp });

    if (!otpVerification) {
      return res.status(400).send("Invalid OTP");
    }

    // Check if OTP is still valid (within 5 minutes of creation)
    const now = new Date();
    const created = otpVerification.created_at;
    const timeDiff = Math.abs(now - created) / (1000 * 60);
    if (timeDiff > 5) {
      // OTP has expired
      otpVerification.delete();
      return res.status(400).send("OTP expired");
    }
    otpVerification.delete();

    const existingUser =
      userType === "seeker"
        ? await Seekers.findOne({ seekerEmail: email })
        : await Employees.findOne({ employeeEmail: email });

    if (!existingUser) {
       return res.status(200).send({ msg: "OTP verified successfully"});
    }
    return res.status(200).send({ msg: "OTP verified successfully", userId: existingUser._id });
  } catch (err) {
    res.status(500).send("Error verifying OTP");
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
};
