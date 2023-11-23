const express = require("express");
const router = express.Router();
const {
  getJobs,
  createNewJob,
  updateJobWithId,
  getJobFromId,
  deleteJobById,
} = require("../controllers/jobs");

router.post("/", getJobs);
router.get("/:id", getJobFromId);
router.post("/create", createNewJob);
router.patch("/:id", updateJobWithId);
router.delete("/:id", deleteJobById);

module.exports = router;
