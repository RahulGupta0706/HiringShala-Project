const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  jobDate: Date,
  jobRequirements: String,
  jobEligibility: String,
  jobLocation: String,
  expectedPackage: Number,
  applyLink: String,
  isExpired:  {
    type: Boolean,
    default: false,
  },
  numberOfOpenings: Number,
  seekersRegistered: [
    {
      seekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seekers",
        required: true,
      },
      shortListedStatus: {
        type: Boolean,
        default: false,
      },
      referralStatus: {
        type: Boolean,
        default: false,
      },
      seekerName : {
        type: String,
        required: true,
      },
      resumeUrl: {
        type: String,
        required: true,
      },
      collegeName: {
        type: String,
        required: false,
      },
      seekerCompanyName: {
        type: String,
        required: false,
      },
    },
  ],
  shortlistedCount: Number,
});

const Jobs = mongoose.model("Jobs", JobSchema);

const SeekerSchema = new mongoose.Schema({
  seekerName: {
    type: String,
    required: true,
  },
  seekerEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  resumeUrl: {
    type: String,
    required: false,
  },
  collegeName: {
    type: String,
    required: false,
  },
  seekerCompanyName: {
    type: String,
    required: false,
  },
  contactNumber: {
    type: Number,
    required: false,
  },
  appliedJobList: [
    {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs",
        required: true,
      },
      shortListedStatus: {
        type: Boolean,
        default: false,
      },
      referralStatus: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Seekers = mongoose.model("Seekers", SeekerSchema);

const EmployeeSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  employeeEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  employeeCompanyName: {
    type: String,
    required: false,
  },
  contactNumber: {
    type: Number,
    required: false,
  },
  listOfJobsPosted: [
    {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs",
        required: true,
      },
    },
  ],
  referralStatus:[
    {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs",
        required: true,
      },
      seekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seekers",
        required: true,
      },
      referralCount : {type: Number, default: 0}
    }
  ],
  totalReferralGiven: {type : Number, default : 0},
});

const Employees = mongoose.model("Employees", EmployeeSchema);

const OtpVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  created_at: { type: Date, default: Date.now, expires: "5m" },
});

const OtpVerification = mongoose.model(
  "OtpVerification",
  OtpVerificationSchema
);

module.exports = {
  Employees: Employees,
  Jobs: Jobs,
  Seekers: Seekers,
  OtpVerification: OtpVerification,
};
