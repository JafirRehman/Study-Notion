const Course = require('../models/Course')
const RatingAndReview = require('../models/RatingAndReview')

// Get the average rating for a course
exports.getAverageRating = async (req, res) => {
    try {
        const {courseId} = req.body
        // Calculate the average rating using the MongoDB aggregation pipeline
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: courseId,
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                },
            },
        ])
        //return response
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }else{
            return res.status(200).json({ 
                success: true, 
                averageRating: 0 })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong inside getaveragerating try block",
        })
    }
}

//create rating and review
exports.createRating = async (req, res) => {
    try {
        const userId = req.user.id
        const { rating, review, courseId } = req.body
        // Check if the user is enrolled in the course
        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnroled: { $elemMatch: { $eq: userId } },
        })
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in this course",
            })
        }
        // Check if the user has already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        })
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "Course already reviewed by user",
            })
        }
        // Create a new rating and review
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course: courseId,
            user: userId,
        })
        // Add the rating and review to the course
        await Course.findByIdAndUpdate(courseId, {
            $push: {
                ratingAndReviews: ratingReview,
            },
        })
        //return response
        return res.status(201).json({
            success: true,
            message: "Rating and review created successfully",
            ratingReview,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong inside createRating try block",
        })
    }
}

//get all rating and reviews
exports.getAllRatingReview = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image", // Specify the fields you want to populate from the "Profile" model
            })
            .populate({
                path: "course",
                select: "courseName", //Specify the fields you want to populate from the "Course" model
            })
        //return response
        return res.status(200).json({
            success: true,
            data: allReviews,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong inside getallratingeview try block",
        })
    }
}