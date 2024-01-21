const fs = require('fs');
const csv = require('fast-csv');
const upload = require('../utils/upload');
const Payout = require('../models/payout');
const moment=require('moment')


const uploadPayout=async(req,res,next)=>{
   
    fs.createReadStream("./uploads/"+req.files[0].filename)
    .pipe(csv.parse({ headers: true }))
    .on('data', async(row) => {
      // Process each row of data
      const payoutDate = moment(row.payout_date).format("YYYY-MM-DD");
      const employeeMail = row.employeeMail;
      const fixedAmount = row.fixedAmount;
    const variableAmount=row.variableAmount
    const deductions=row.deductions
      // Validate and store the data in the database
      // Example: Store the payout information in a database
      await Payout.create({payoutDate:payoutDate,employeeMail:employeeMail,
     fixedAmount:fixedAmount,
     variableAmount:variableAmount,
     deductions:deductions}
        )
      // db.collection('payouts').insertOne({ recipientName, amount, date });
    }).on('end', () => {
        console.log('CSV file successfully processed');
        res.send("Successfully Uploaded")
      });
}

const getTotalPayoutEmployees=async(req,res)=>{
  let next_year=Number(req.query.year)+1
  console.log(moment(req.query.year).startOf('year'),moment(req.query.year).endOf('year').add(1,'d').format("YYYY-MM-DD"),Number(req.query.year)+1)
 const result=await Payout.aggregate([
    {
      $match: {
        payoutDate: {
          $gte: new Date(moment(req.query.year).startOf('year').format("YYYY-MM-DD")),
          $lt: new Date(moment(req.query.year).endOf('year').add(1,'d').format("YYYY-MM-DD"))
        }
      }
    },
    {
      $group: {
        _id: '$employeeMail',
        total: {
          $sum: { $subtract: [ { $add: ['$fixedAmount', '$variableAmount'] }, '$deductions' ] }
        }
      }
    }
  ])
  res.send(result)
}

const getTopVariablePayout=async(req,res)=>{
const response=await Payout.aggregate([
    {
      $match: {
        payoutDate: {
          $gte: new Date(moment(req.query.year).startOf('year').format("YYYY-MM-DD")),
          $lt: new Date(moment(req.query.year).endOf('year').add(1,'d').format("YYYY-MM-DD"))
        }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: "$payoutDate" },
          month: { $month: "$payoutDate" },
          employeeMail: "$employeeMail"
        },
        totalVariableAmount: { $sum: "$variableAmount" }
      }
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
        totalVariableAmount: -1
      }
    },
    {
      $group: {
        _id: { year: "$_id.year", month: "$_id.month" },
        topEmployee: { $first: { employeeMail: "$_id.employeeMail", totalVariableAmount: "$totalVariableAmount" } }
      }
    },
    {
      $project: {
        _id: 0,
        month:"$_id.month",
        yaer:"$_id.year",
        employeeMail: "$topEmployee.employeeMail",
        totalVariableAmount: "$topEmployee.totalVariableAmount"
      }
    }
  ])
res.send(response)
}
const getNoPayoutEmployee=async(req,res)=>{
 const response=await Payout.aggregate([
  {
    $group: {
      _id: "$employeeMail",
      totalPayouts: {
        $sum: {
          $cond: [
            {
              $and: [
                { $gte: ["$payoutDate", new Date('2023-05-01')] },
                { $lt: ["$payoutDate", new Date('2023-07-01')] }
              ]
            },
            1,
            0
          ]
        }
      }
    }
  },
  {
    $match: {
      totalPayouts: 0
    }
  },
  {
    $project: {
      _id: 0,
      employeeMail: "$_id"
    }
  }
])
  res.send(response)
}
module.exports={uploadPayout,getTotalPayoutEmployees,getTopVariablePayout,getNoPayoutEmployee}
// Read and parse the CSV file
