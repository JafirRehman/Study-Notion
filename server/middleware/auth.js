const User = require("../models/User");

const jwt = require("jsonwebtoken");
require('dotenv').config();

// This function is used as middleware to authenticate user requests
exports.auth = async (req, res, next) => {
    try {
        //get cookie
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "");

        // validate token
        if (!token) {
            return res.status(401).json({ success: false, message: `Token Missing` });
        }
        try {
            //verify token
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            //store token to user
            req.user = decode;
        } catch (error) {
            return res
                .status(401)
                .json({ success: false, message: "token is invalid" });
        }
        // move to next work
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: `Something Went Wrong inside auth middleware try block`,
        });
    }
};
exports.isStudent = async (req, res, next) => {
    try {
        //find user
        const userDetails = await User.findOne({ email: req.user.email });
        //validate user
        if (userDetails.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Students",
            });
        }
        //move to next work
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `Something Went Wrong inside isStudent middleware try block` });
    }
};
exports.isAdmin = async (req, res, next) => {
    try {
        //find user
        const userDetails = await User.findOne({ email: req.user.email });
        //validate user
        if (userDetails.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Admin",
            });
        }
        //move to next work
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `Something Went Wrong inside isAdmin middleware try block` });
    }
};
exports.isInstructor = async (req, res, next) => {
    try {
        //find user
        const userDetails = await User.findOne({ email: req.user.email });
        //validate user
        if (userDetails.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Instructor",
            });
        }
        //move to next work
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `Something Went Wrong inside isInstructor middleware try block` });
    }
};