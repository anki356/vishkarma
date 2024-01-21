const moment = require('moment');
const mongoose = require('mongoose');

// Define the department schema
const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
    index:true
  },
  duties: {
    type: String,
  },
  startDate: {
    type:Date,
    required: true,
default:()=>moment().format("YYYY-MM-DD")
  },
  deptHead:{
type:mongoose.Schema.Types.ObjectId,
ref:"Employee",
default :null
  }
});

// Create the Department model
const Department = mongoose.model('Department', departmentSchema);

// Export the Department model
module.exports = Department;