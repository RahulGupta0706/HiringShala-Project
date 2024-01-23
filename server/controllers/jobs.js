const { Jobs, Employees } = require("../models/schema");

const getJobs = async (req, res) => {
  try {
    let filters = req.body;
    let jobIds = filters.jobIds;
    if (jobIds != null) {
      const jobs = await Jobs.find({ _id: { $all: jobIds } });
      res.status(200).json( jobs ); //changed
    }
    if (filters.startDate != null) {
      filters.jobDate = { $gte: filters.startDate };
      filters.startDate = null;
    }
    if (filters.endDate != null) {
      filters.jobDate = { $lte: filters.endDate };
      filters.endDate = null;
    }
    if (filters.startingSalary != null) {
      filters.expectedPackage = { $gte: filters.startingSalary };
      filters.startingSalary = null;
    }
    const jobs = await Jobs.find(filters);
    res.status(200).json( jobs );
  } catch (error) {
    res.status(500).json(error);
  }
};

const getJobFromId = async (req, res) => {
  try {
    const job = await Jobs.findOne({ _id: req.params.id });
    if (!job) {
      return res.status(404).json({ msg: `No job with id ${req.params.id}` });
    }
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createNewJob = async (req, res) => {
  try {
    const employeeId = req.body.employeeId;
    const job = await Jobs.create(req.body);
    if (!job) {
      res.status(500).json({msg: "Unable to Upload Job. Please try again!"});
    }
    const newJob = { jobId: job._id };
    if (employeeId) {
      const employee = await Employees.findOneAndUpdate(
        { _id: employeeId },
        { $push: { listOfJobsPosted: newJob } },
        { new: true, runValidators: true }
      );
      if (!employee) {
        return res
          .status(404)
          .json({ msg: `No employee with id ${employeeId}` });
      }
    }
    res.status(201).json({ job });
  } catch (error) {
    res.status(500).json({msg: "Unable to Upload Job. Please try again!"});
  }
};

const updateJobWithId = async (req, res) => {
  try {
    const job = await Jobs.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      return res.status(404).json({ msg: `No jobs with id ${req.params.id}` });
    }
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json(error);
  }
};


const deleteJobById = async (req,res) => {
    try {
        const job = await Jobs.findOneAndDelete({_id:req.params.id})
        if(!job)
        {
            return res.status(404).json({msg: `No job with id ${req.params.id}`})
        }
        res.status(200).json({msg:"Job deleted successfully"})
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {
    getJobs
,   createNewJob
,   updateJobWithId
,   getJobFromId
,   deleteJobById
}
