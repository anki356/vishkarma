const Department = require("../models/department.js");
const moment =require('moment')
const addDept=async (req,res)=>{
   req.body.startDate=moment(req.body.startDate).format("YYYY-MM-DD")
    
    try{
        const department = new Department({...req.body});
        await department.save();
        res.status(201).json(department);
    }catch(err){
        res.status(500).json(err)
    }
   
    
}

const updateDept=async(req,res)=>{
    if(req.body.startDate){

        req.body.startDate=moment(req.body.startDate).format("YYYY-MM-DD")
    }
    await Department.updateOne({
        _id:req.params._id
    },{
        $set:req.body
    })
   return  res.status(201).json("Department updated")
}
module.exports={addDept,updateDept}