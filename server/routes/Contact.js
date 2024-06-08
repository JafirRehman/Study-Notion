const express = require("express")

const { contactuscontroller } = require("../controllers/Contactus")

const router = express.Router()

router.post("/contact", contactuscontroller)

module.exports = router