const { contactUsEmail } = require("../mail/templates/contactTemplate")
const {mailsender}=require('../utils/mailsender')

exports.contactuscontroller = async (req, res) => {
    //get data
    const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
    try {
        //send mail to user
        await mailsender(
            email,
            `hello ${firstname} ${lastname}`,
            contactUsEmail(email,firstname,lastname,message,phoneNo,countrycode)            
        )
        //return response
        return res.json({
            success: true,
            message: "Email send successfully",
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Something went wrong inside contactusemail controller try block",
        })
    }
}