const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require('body-parser')
var cors = require('cors')
const path = require('path')
const adminRoute = require("./Routes/adminRoute");
const customerRoute = require("./Routes/customerRoute")
const paymentRoute = require("./Routes/paymentRoute");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
mongoose.connect(process.env.DBCON).then(() => {
  console.log("DB Succefully Connected!!!");
})
app.use("/customer", customerRoute)

app.use("/admin", adminRoute);
app.use("/api/payment/", paymentRoute);





const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`server run on port ${port}`)
})