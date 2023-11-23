const { Employees, Jobs, Seekers } = require("../models/schema");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

const generateToken = (userId,role) => {
  const payload = {
    userId: userId,
    role:role
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "720h" });
  return token;
};


const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getEmployeeFromId = async (req, res) => {
  try {
    const employee = await Employees.findOne({ _id: req.params.id });
    res.status(200).json({ employee });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createNewEmployee = async (req, res) => {
  try {
    const { employeeEmail } = req.body;
    const existingEmployee = await Employees.findOne({ employeeEmail });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ msg: "Employee with this email already exists" });
    }
    const employee = await Employees.create(req.body);
    const token=generateToken(employee._id,'Employee');
    return res.status(200).json({ msg: "Signup successful", token, employee });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateEmployeeWithId = async (req, res) => {
  try {
    const employee = await Employees.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!employee) {
      res.status(404).json({ msg: `No employee with id ${req.params.id}` });
    } else {
      res.status(200).json({ employee });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employees.findOneAndDelete({ _id: req.params.id });
    if (!employee) {
      return res
        .status(404)
        .json({ msg: `No employee with id ${req.params.id}` });
    }
    res.status(200).json({ msg: "Employee deleted successfully" });
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
    const cmpName = getCompanyName(email);
    if (defaultEmails.includes(cmpName)){
      return res.status(401).json({msg: "Login through your official Email Id."});
    }
    const employee = await Employees.findOne({ employeeEmail: email });
    if(!employee)
    {
      req.body.employeeEmail = email;
      req.body.employeeName = name;
      return createNewEmployee(req, res);
    }
    const token = generateToken(employee._id,'Employee');
    res.status(200).json({ msg: "Login successful", token, employee, picture });
  } catch (error) {
    res.status(500).json(error);
  }
}

const loginEmployee = async (req, res) => {
  try {
    const { isGoogleLogin } = req.body;
    if(isGoogleLogin){
      return handleGoogleLogin(req,res);
    }
    let email = req.body.email, password = req.body.password;
    const employee = await Employees.findOne({ employeeEmail: email });
    if (!employee) {
      return res.status(404).json({ msg: `No employee with email ${email}` });
    }
    const isMatch = password === employee.password
    if (!isMatch && !employee.password) {
      return res.status(401).json({  msg: "Login Through Google or Signup using this email!"});
    } else if(!isMatch) {
      return res.status(401).json({  msg: "Invalid Credentials"});
    }

    const token = generateToken(employee._id,'Employee');
    res.status(200).json({ msg: "Login successful", token, employee});
  } catch (error) {
    res.status(500).json(error);
  }
};

const referSeeker = async (req, res) => {
  try {
    const { seekerId, jobId, employeeId } = req.body;
    const seeker = await Seekers.findById(seekerId);
    const employee = await Employees.findById(employeeId);
    const job = await Jobs.findById(jobId);

    if (!seeker || !employee || !job) {
      return res.status(404).json({ error: "Invalid Details!" });
    }

    const existingReferral = employee.referralStatus.find(
      (referral) => referral.jobId.toString() === jobId
    );

    if (existingReferral && existingReferral.referralCount >= 3) {
      return res.status(400).json({ error: "You have already referred 3 candidates for this job" });
    }

    const alreadyReferred = employee.referralStatus.find(
      (referral) => referral.jobId.toString() === jobId && referral.seekerId.toString() === seekerId
    );

    if (alreadyReferred) {
      return res.status(400).json({ error: "You have already referred this seeker for this job" });
    }

    if (existingReferral) {
      existingReferral.referralCount += 1;
    } else {
      employee.referralStatus.push({ jobId, seekerId, referralCount: 1 });
    }

    const referralIndex = job.seekersRegistered.findIndex(
      (seekerReferral) => seekerReferral.seekerId.toString() === seekerId
    );

    if (referralIndex === -1) {
      return res.status(404).json({ error: "Seeker not found in job's seekersRegistered array" });
    }

    job.seekersRegistered[referralIndex].referralStatus = true;
    await job.save();

    employee.totalReferralGiven += 1;
    await employee.save();

    res.status(200).json({ msg: "Referred successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};



const getCompanyName = (emailId) => {
  let domainName = emailId.split("@")[1];
  let companyName = domainName.split('.')[0];
  console.log("comapanyName", companyName);
  return companyName;
}

const defaultEmails = ["gmail", "yahoo"];

module.exports = {
  getAllEmployees,
  getEmployeeFromId,
  createNewEmployee,
  updateEmployeeWithId,
  deleteEmployee,
  loginEmployee,
  referSeeker,
};
