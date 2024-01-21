const express=require('express')

const { uploadPayout, getTotalPayoutEmployees, getTopVariablePayout, getNoPayoutEmployee } = require('../controllers/payout.js')
const upload = require('../utils/upload')

const router=express.Router()
router.post("/upload-payout",upload.any(),uploadPayout)
router.get("/total-payout-employee",getTotalPayoutEmployees)
router.get("/top-variable-payout-employee",getTopVariablePayout)
router.get("/no-payout-employee",getNoPayoutEmployee)

module.exports=router