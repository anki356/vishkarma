const mongoose = require('mongoose');

// Define the employee schema
const employeeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  joiningDate: {
    type: Date,
    required: true
  },
  leavingDate: {
    type: Date,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Department",
    required: true
  },designation:{
    type: String,
    required: true
  },
});

// Create the Employee model
const employee = mongoose.model('Employee', employeeSchema);

// Export the Employee model
module.exports = employee;