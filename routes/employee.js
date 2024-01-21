const express=require('express')
const {addEmployee,updateEmp, deleteEmp, getAllEmps} = require('../controllers/employees')

const router=express.Router()
router.post("/add-employee",addEmployee)
router.patch("/update-employee",updateEmp)
router.delete("/delete-employee/:_id",deleteEmp)
router.get("/all-employees",getAllEmps)

module.exports=router