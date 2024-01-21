const mongoose = require('mongoose');

// Define the payout schema
const payoutSchema = new mongoose.Schema({
    payoutDate: {
    type: Date,
    required: true
  },
  employeeMail: {
    type:String,
    required:true
  },
  fixedAmount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  variableAmount: {
    type: mongoose.Schema.Types.Decimal128,
    
  },
  deductions: {
    type: mongoose.Schema.Types.Decimal128,
  }
});

// Create the Payout model
const Payout = mongoose.model('Payout', payoutSchema);

// Export the Payout model
module.exports = Payout;