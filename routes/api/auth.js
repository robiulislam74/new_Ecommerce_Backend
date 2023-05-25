const express = require('express')
const _ = express.Router()
const registrationController = require('../../controller/registrationController')
const loginController = require('../../controller/loginController')
const emailVerificationOtpMatch = require('../../controller/emailVerificationOtpMatch')

_.use("/registration",registrationController)
_.use("/login",loginController)
_.use("/verificationOtpMatch",emailVerificationOtpMatch)
module.exports = _;