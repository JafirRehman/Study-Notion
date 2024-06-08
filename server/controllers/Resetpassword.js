const User = require("../models/User");

const crypto = require("crypto");  //no need to install this bcz this is build in
const { mailsender } = require("../utils/mailSender");
const bcrypt = require('bcrypt');

// resetpasswordtoken

exports.resetPasswordToken = async (req, res) => {
    try {
        //get the mail
        const { email } = req.body;
        //make sure user exist
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user does not exist"
            })
        }
        //create token
        const token = crypto.randomBytes(20).toString("hex");
        //find user with that mail and update token
        await User.findOneAndUpdate(
            {email},
            {
                token:token,
                resetPasswordExpires:Date.now() + 3600000,
            },
            {
                new:true
            }
        );
        //create url
        const url=`http://localhost:3000/update-password/${token}`
        //sendmail
        await mailsender(email,"reset password",url)
        //return response
        return res.status(200).json({
            success:true,
            message:"Email Sent Successfully, Please Check Your Email to Continue Further"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong in resetpasswordtoken try block"
        })
    }
}

// resetpassword

exports.resetPassword=async (req,res)=>{
    try{
        //get newpassword confirmnewpassword and token
        const {newpassword,confirmnewpassword,token}=req.body;
        //newpassword and confirmnewpassword should match
        if(newpassword !== confirmnewpassword){
            return res.status(401).json({
                success: false,
                message: "newpassword and confirmnewpassword should match"
            })
        }
        //find user by given token
        const user=await User.findOne({token})
        if(!user){
            return res.status(400).json({
                success: false,
                message: "invalid token"
            })
        }
        //compare with resetPasswordExpires
        if(Date.now() > user.resetPasswordExpires){
            return res.status(400).json({
                success: false,
                message: "invalid email"
            })
        }
        //hashpassword
        const hashedPassword=await bcrypt.hash(newpassword,10)
        //updatepassword
        await User.findOneAndUpdate(
            {token},
            {
                password:hashedPassword
            },
            {
                new:true
            }
        );
        //return response
        return res.status(200).json({
            success:true,
            message:"password updated successfully"
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "something went wrong in resetpassword try block"
        })
    }
}