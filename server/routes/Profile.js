const express = require("express")
const router = express.Router()

const { auth, isInstructor } = require("../middleware/auth")

const {
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  deleteAccount,
  /*
    getEnrolledCourses,
    instructorDashboard,
  */

} = require("../controllers/Profile")

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/Resetpassword")


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
router.delete("/deleteProfile", auth, deleteAccount)

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

//yet not tested
/*
  router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)
  router.get("/getEnrolledCourses", auth, getEnrolledCourses)
  
*/

module.exports = router