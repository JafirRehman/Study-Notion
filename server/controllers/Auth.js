const User = require('../models/User')
const OTP = require('../models/OTP')
const Profile = require('../models/Profile')

const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt');
const { passwordUpdated } = require("../mail/templates/passwordUpdate")
const jwt = require('jsonwebtoken');
const { mailsender } = require('../utils/mailSender');

require('dotenv').config();

// CHANGE PASSWORD

exports.changePassword = async (req, res) => {
    try {
        //get the user id
        const {id} = req.user;
        //get the data
        const { oldpassword, newpassword, confirmnewpassword } = req.body;
        //match old password with user secure password
        const usertoupdate = await User.findById(id)
        if (! (await bcrypt.compare(oldpassword, usertoupdate.password))) {
            return res.status(400).json({
                success: false,
                message: "old password does not match with user password"
            })
        }
        //match newpassword with confirmnewpassword
        if (newpassword !== confirmnewpassword) {
            return res.status(400).json({
                success: false,
                message: "newpassword and confirmnewpassword should be same"
            })
        }
        //match old password with new password
        if(oldpassword===newpassword){
            return res.status(400).json({
                success: false,
                message: "old password and newpassword cannot be same"
            })
        }
        //hash new password
        const newhashedpassword=await bcrypt.hash(newpassword,10);
        //update user password
        const updateduser=await User.findByIdAndUpdate(
            id,
            {password:newhashedpassword},
            {new:true}
        )
        //send mail
        try{
            await mailsender(updateduser.email,"change password",passwordUpdated(
                updateduser.email,
                `Password updated successfully for ${updateduser.firstName} ${updateduser.lastName}`
              ))
        }catch(error){
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "something went wrong in changepassword send mail try block"
            })
        }
        //return response
        return res.status(200).json({ success: true, message: "Password updated successfully" });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong in changepassword try block"
        })
    }
}

// LOGIN 

exports.login = async (req, res) => {
    try {
        //get the data
        const { email, password } = req.body;
        //validate
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "all feilds are required"
            })
        }
        //check user already exist
        const existeduser = await User.findOne({ email }).populate("additionalDetails");
        if (!existeduser) {
            return res.status(401).json({
                success: false,
                message: "user does not exist"
            })
        }
        //check password match with hasspassword
        if (await bcrypt.compare(password, existeduser.password)) {
            //create jwt token
            const token = jwt.sign(
                { email: existeduser.email, id: existeduser._id, accountType: existeduser.accountType },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            )
            //set that token in user object and set password to undefined 
            existeduser.token = token;
            existeduser.password = undefined;
            //create options for cookie
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            //return res
            return res.cookie('token', token, options).status(200).json({
                success: true,
                message: "user login successfully",
                token,
                existeduser,
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: "wrong login password"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong in login try block"
        })
    }
}

// SIGN UP 

exports.signup = async (req, res) => {
    try {
        //get the data
        const { firstName, lastName, password, confirmpassword, email, accountType, otp } = req.body;
        //validate the data
        if (!firstName || !lastName || !password || !confirmpassword || !email || !otp) {
            return res.status(403).json({
                success: false,
                message: "all feilds are required"
            })
        }
        //make sure password and confirm password match eachother
        if (password !== confirmpassword) {
            return res.status(400).json({
                success: false,
                message: "password and confirm password does not match"
            })
        }
        //check if email already exist in USER
        const findinguser = await User.findOne({ email })
        if (findinguser) {
            return res.status(400).json({
                success: false,
                message: "user already exist"
            })
        }
        //match otp with recent otp created by given email
        const checkotp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
        if (checkotp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "invalid otp"
            })
        } else if (checkotp[0].otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "invalid otp"
            })
        }
        //secure the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //create additional details
        const newprofile = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        })
        //create new USER
        const newuser = await User.create({
            firstName,
            lastName,
            password: hashedPassword,
            email,
            image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`,
            accountType,
            additionalDetails: newprofile._id,
        })
        console.log(newuser);
        //return new USER
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            newuser,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "something went wrong in signup try block"
        })
    }
}

// SEND OTP

exports.sendotp = async (req, res) => {
    try {
        // get the mail
        const { email } = req.body
        // validate if email already exist or not 
        const exiteduser = await User.findOne({ email })
        if (exiteduser) {
            return res.status(401).json({
                success: false,
                message: "user already exist"
            })
        }
        // create unique otp
        let result;
        let otp;
        do {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp })
        } while (result)
        // create otp model
        await OTP.create({ email, otp });

        return res.status(200).json({
            success: true,
            message: "otp send successfully",
            otp,
        })


    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "something went wrong in sendotp try block"
        })
    }
}