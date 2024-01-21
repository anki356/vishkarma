const express=require('express')
const {addDept,updateDept} = require('../controllers/department')
const router=express.Router()
router.post("/add-department",addDept)
router.patch("/update-department/:_id",updateDept)
module.exports=router