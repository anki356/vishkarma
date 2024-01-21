// Import required modules
const express = require('express');
require('dotenv').config();
const mongoose=require('mongoose')
// Create an instance of the Express application
const app = express();
const department =require("./routes/department.js")
const employee =require("./routes/employee.js")
const payout =require("./routes/payout.js")
const http=require('http')

const cors=require('cors');

const server = http.createServer(app);
// Define routes and handler
app.use(
  express.json({ parameterLimit: 100000, limit: "500mb" })
);
app.use(express.urlencoded({ extended: true }))

app.use(cors());
app.use("/",department)
app.use("/",employee)
app.use("/",payout)

// Start the server
const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }, { timestamps: true });
    const port = process.env.PORT || 5000;
    const urlHost = process.env.APP_URL;

    server.listen(port, () => console.log(`server is listening at ${urlHost}`));
  } catch (error) {
    console.log(error);
  }


};
start()