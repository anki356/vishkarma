const employee = require("../models/employee")
const moment=require("moment")
const addEmployee=async(req,res)=>{
    req.body.joiningDate=moment(req.body.joiningDate).format("YYYY-MM-DD")
    const employeeDetails=await employee.create({
        ...req.body
    })
    return res.status(201).json(employeeDetails)
}

const updateEmp=async(req,res)=>{
    if(req.body.joiningDate){

        req.body.joiningDate=moment(req.body.joiningDate).format("YYYY-MM-DD")
    }
    await employee.updateOne({
        email:req.body.email_address
    },{
        $set:req.body
    })
   return res.status(201).json("Employee Updated")
}

const deleteEmp=async(req,res)=>{
    await employee.deleteOne({
        _id:req.params._id
    })
    return res.status(201).json("Employee Deleted")
}
const getAllEmps=async (req,res)=> {
    const employees=await employee.find().populate({
        path:"department",populate:{
            path:'deptHead'
        }
    })
    return res.status(201).json(employees)
}

module.exports={addEmployee,updateEmp,deleteEmp,getAllEmps}