const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const jwt = require("jsonwebtoken");
const { Seekers } = require("../models/schema");

const router = express.Router();
const {
  getSeekers,
  getSeekerFromId,
  createNewSeeker,
  applyForJob,
  updateSeekersJobStatus,
  updateSeeker,
  uploadResume,
  getSeekerResume,
  deleteSeeker,
  loginSeeker,
} = require("../controllers/seekers");

const s3 = new AWS.S3({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "hiringshala",
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

const checkIfUserExists = async (userId) => {
  const user = await Seekers.findOne({ _id: userId });
  return user !== null;
};

const authenticateUser = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "User is not authenticated" });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    const userExists = await checkIfUserExists(req.userId);

    if (userExists) {
      next();
    } else {
      return res.status(401).json({ msg: "Please SignUp!" });
    }
  } catch (error) {
    return res.status(401).json({ msg: "User is not authenticated" });
  }
};


const authenticateGetSeekers = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "User is not authenticated" });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    let roleGranted=decodedToken.role;
    
    if (roleGranted !== 'Seeker') {
      //if the role is Employee or Admin they can access list of seekers
      next();
    } else {

      return res.status(401).json({ msg: "You are not authorized to view this list !" });
    }
  } catch (error) {
    return res.status(401).json({ msg: "User is not authenticated" });
  }
};

const authenticateGetSeekerId = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "User is not authenticated" });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    let roleGranted=decodedToken.role;
    let userId=decodedToken.userId;
    if (roleGranted !== 'Seeker' || (roleGranted==='Seeker' && userId===req.params.id)) {

      //if the role is Employee or Admin they can access a particular seeker Info
      //a seeker can access only his/her info hence the additional condition
      next();
    }
    else {
      return res.status(401).json({ msg: "You are not authorized to view this page!" });
    }
  } catch (error) {
    return res.status(401).json({ msg: "User is not authenticated" });
  }
};

router.get("/", authenticateGetSeekers, getSeekers);
router.get("/:id",authenticateGetSeekerId, getSeekerFromId);
router.post("/",createNewSeeker);
router.patch("/apply/:id", applyForJob);
router.patch("/status/:id", authenticateUser, updateSeekersJobStatus);
router.patch("/:id", updateSeeker);
router.post("/upload", upload.single("file"), uploadResume);
router.get("/:seekersId/resume", getSeekerResume);
router.delete("/:id", deleteSeeker);
router.post("/login", loginSeeker);

module.exports = router;
