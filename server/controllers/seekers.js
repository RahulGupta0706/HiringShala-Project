const { Jobs, Seekers } = require("../models/schema");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

const generateToken = (userId, role) => {
  const payload = {
    userId: userId,
    role: role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "720h",
  });
  return token;
};

const getSeekers = async (req, res) => {
  try {
    filters = req.query;
    jobId = filters.jobId;
    if (!jobId) {
      const seekers = await Seekers.find({});
      return res.status(200).json(seekers); //changed
    }
    const jobDetails = await Jobs.findOne({ _id: jobId });
    if (!jobDetails) {
      return res.status(404).json({ msg: `No Job with id ${jobId}` });
    }
    const seekersListObj = jobDetails.seekersRegistered;
    referralStatus = filters.referralStatus;
    shortListedStatus = filters.shortListedStatus;
    let seekerIds = [];
    if (referralStatus === "false" && !shortListedStatus) {
      return res
        .status(500)
        .json({ error: "shortListedStatus is missing from request" });
    }
    seekersListObj.forEach(function (el, _index) {
      if (!referralStatus && !shortListedStatus) seekerIds.push(el.seekerId);
      else if (referralStatus === "true" && el.referralStatus === true)
        seekerIds.push(el.seekerId);
      else if (shortListedStatus === "true" && el.shortListedStatus === true)
        seekerIds.push(el.seekerId);
    });
    if (seekerIds === []) {
      return res
        .status(200)
        .json({ msg: `No Seekers registered with id ${jobId}` });
    }
    const seekers = await Seekers.find({ _id: { $all: seekerIds } });
    if (!seekers) {
      return res.status(404).json({ msg: `No Seekers found` });
    }
    res.status(200).json({ seekers });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSeekerFromId = async (req, res) => {
  try {
    const seeker = await Seekers.findOne({ _id: req.params.id });
    if (!seeker) {
      return res
        .status(404)
        .json({ msg: `No seeker with id ${req.params.id}` });
    }
    res.status(200).json({ seeker });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createNewSeeker = async (req, res) => {
  try {
    const { seekerEmail } = req.body;
    const existingSeeker = await Seekers.findOne({ seekerEmail });
    if (existingSeeker) {
      return res
        .status(400)
        .json({ msg: "Seeker with this email already exists" });
    }
    const seeker = await Seekers.create(req.body);
    //generate token for that seeker
    const token = generateToken(seeker._id, "Seeker");
    return res.status(200).json({ msg: "Signup successful", token, seeker });
  } catch (error) {
    res.status(500).json(error);
  }
};

const uploadResume = async (req, res) => {
  const seekerId = req.body.seekerId;
  try {
    const updatedJobSeeker = await Seekers.findOneAndUpdate(
      { _id: seekerId },
      { resumeUrl: req.file.location },
      { new: true }
    );
    if (!updatedJobSeeker) {
      return res.status(404).json({ msg: `No seekers with id ${seekerId}` });
    }
    res.send("Resume URL updated successfully");
  } catch (error) {
    res.status(500).send("Error updating resume URL");
  }
};

const getSeekerResume = async (req, res) => {
  try {
    const seeker = await Seekers.findOne({ _id: req.params.seekersId });
    if (!seeker) {
      return res
        .status(404)
        .json({ msg: `No seeker with id ${req.params.seekersId}` });
    }
    res.status(200).json({ seekerResume: seeker.resumeUrl });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateSeeker = async (req, res) => {
  try {
    const seeker = await Seekers.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!seeker) {
      return res
        .status(404)
        .json({ msg: `No Seekers with id ${req.params.id}` });
    }
    res.status(200).json({ seeker });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateSeekersJobStatus = async (req, res) => {
  try {
    const seekerId = req.params.id; //get from body
    const jobId = req.body.jobId;
    let shortListedStatus = req.body.shortListedStatus;
    let referralStatus = req.body.referralStatus;
    if (shortListedStatus === null) {
      return res
        .status(500)
        .json({ error: "shortListedStatus is missing from body" });
    }
    if (referralStatus === null) {
      referralStatus = false;
    }
    const seeker = await Seekers.findOneAndUpdate(
      { _id: seekerId },
      {
        $set: {
          "appliedJobList.$[el].shortListedStatus": shortListedStatus,
          "appliedJobList.$[el].referralStatus": referralStatus,
        },
      },
      {
        arrayFilters: [{ "el.jobId": jobId }],
        new: true,
        runValidators: true,
      }
    );
    const job = await Jobs.findOneAndUpdate(
      { _id: jobId },
      {
        $set: {
          "seekersRegistered.$[el].shortListedStatus": shortListedStatus,
          "seekersRegistered.$[el].referralStatus": referralStatus,
        },
      },
      {
        arrayFilters: [{ "el.seekerId": seekerId }],
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ seeker, job });
  } catch (error) {
    res.status(500).json(error);
  }
};

const applyForJob = async (req, res) => {
  try {
    const jobId = req.body.jobId;
    const seekerId = req.params.id; //getfrom body
    const newJob = { jobId: jobId };
    const seeker = await Seekers.findOneAndUpdate(
      { _id: seekerId },
      { $push: { appliedJobList: newJob } },
      { new: true, runValidators: true }
    );
    const newSeeker = {
      seekerId: seekerId,
      seekerName: seeker.seekerName,
      resumeUrl: seeker.resumeUrl,
      collegeName: seeker.collegeName,
      seekerCompanyName: seeker.seekerCompanyName,
    };
    const job = await Jobs.findOneAndUpdate(
      { _id: jobId },
      { $push: { seekersRegistered: newSeeker } },
      { new: true, runValidators: true }
    );
    if (!seeker) {
      return res
        .status(404)
        .json({ msg: `No seeker with id ${req.params.id}` });
    }
    if (!job) {
      return res.status(404).json({ msg: `No job with id ${jobId}` });
    }
    res.status(200).json({ seeker: seeker, job: job });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteSeeker = async (req, res) => {
  try {
    const seeker = await Seekers.findOneAndDelete({ _id: req.params.id });
    if (!seeker) {
      return res
        .status(404)
        .json({ msg: `No seeker with id ${req.params.id}` });
    }
    res.status(200).json({ msg: "Seeker deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const handleGoogleLogin = async (req, res) => {
  try {
    let email, picture, name;
    const credential = req.headers.authorization;
    if (!credential || !credential.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Invalid Credentials!" });
    }
    const decodedToken = jwt_decode(credential);
    email = decodedToken.email;
    picture = decodedToken.picture;
    name = decodedToken.name;
    const seeker = await Seekers.findOne({ seekerEmail: email });
    if (!seeker) {
      req.body.seekerEmail = email;
      req.body.seekerName = name;
      return createNewSeeker(req, res);
    }
    const token = generateToken(seeker._id, "Seeker");
    res.status(200).json({ msg: "Login successful", token, seeker, picture });
  } catch (error) {
    res.status(500).json(error);
  }
};

const loginSeeker = async (req, res) => {
  try {
    const { isGoogleLogin } = req.body;
    if (isGoogleLogin) {
      await handleGoogleLogin(req, res);
    } else {
      let email = req.body.email,
        password = req.body.password;
      const seeker = await Seekers.findOne({ seekerEmail: email });
      if (!seeker) {
        return res.status(404).json({ msg: `No seeker with email ${email}` });
      }
      const isMatch = password === seeker.password;
      if (!isMatch && !seeker.password) {
        return res
          .status(401)
          .json({ msg: "Login Through Google or Signup using this email!" });
      } else if (!isMatch) {
        return res.status(401).json({ msg: "Invalid Credentials!" });
      }

      const token = generateToken(seeker._id, "Seeker");
      res.status(200).json({ msg: "Login successful", token, seeker });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getSeekers,
  getSeekerFromId,
  createNewSeeker,
  uploadResume,
  getSeekerResume,
  applyForJob,
  updateSeekersJobStatus,
  updateSeeker,
  deleteSeeker,
  loginSeeker,
};
