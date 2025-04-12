const express = require('express')
const route = express.Router()
const customerController = require("../Controller/customerController")
route.post("/registration", customerController.custRegistration)
route.post("/custlogin", customerController.custLogin)
route.get("/userauthenticate", customerController.custAuth);
route.get("/getdata", customerController.custGetData);

module.exports = route;