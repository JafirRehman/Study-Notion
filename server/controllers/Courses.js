// instructions and status is missing from course creation
const { filesendtocloudinary } = require('../utils/filesendtocloudinary')

const Category = require('../models/Category')
const Course = require('../models/Course')
const User = require('../models/User')
const Section = require('../models/Section')
const SubSection = require('../models/SubSection')

require('dotenv').config()


// Edit Course Details
exports.editCourse = async (req, res) => {
    try {
        //get data
        const { courseId } = req.body
        const updates = req.body
        //find course
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        // If Thumbnail Image is found, update it
        if (req.files && req.files.thumbnailImage !== undefined) {
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await filesendtocloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImage.secure_url
        }
        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                course[key] = updates[key]
            }
        }
        //update course
        await course.save()
        //get updated course to return it
        const updatedCourse = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
        //return response
        return res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong inside editcourse try block",
        })
    }
}
//delete course
exports.deleteCourse = async (req, res) => {
    try {
        //get data
        const { courseId } = req.body
        // Find the course
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }
        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled
        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {
                $pull: { courses: courseId },
            })
        }
        //Delete course id from Category
        await Category.findByIdAndUpdate(course.category, {
            $pull: { courses: courseId },
        })
        //Delete course id from Instructor
        await User.findByIdAndUpdate(course.instructor, {
            $pull: { courses: courseId },
        })
        // Delete sections and sub-sections
        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
            // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId);
                }
            }
            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }
        // Delete the course
        await Course.findByIdAndDelete(courseId)
        //return response
        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong inside deletecourse",
        })
    }
}
//get courses of particular instructor
exports.getInstructorCourses = async (req, res) => {
    try {
        // get data
        const userId = req.user.id;
        // Find all courses of the instructor
        const allCourses = await Course.find({ instructor: userId });
        // Return response
        return res.status(200).json({
            success: true,
            data: allCourses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong inside getinstructorcourses try block",
        });
    }
}
//get course details
exports.getCourseDetails = async (req, res) => {
    try {
        //get data
        const { courseId } = req.body;
        //find course and get the data you want 
        const courseDetails = await Course.find({ _id: courseId }).populate({
            path: "instructor",
            populate: { path: "additionalDetails" }
        }).populate("category").populate({                    //only populate user name and image
            path: "ratingAndReviews",
            populate: {
                path: "user",
                select: "firstName lastName accountType image"
            }
        }).populate({ path: "courseContent", populate: { path: "subSection" } })
        //make sure course exist
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found"
            })
        }
        //return response
        return res.status(200).json({
            success: true,
            message: "Course fetched successfully now",
            data: courseDetails
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong inside getcoursedetails try block",
        })
    }
}
//getAllCourses
exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find(
            {},
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnroled: true,
            }
        )
            .populate("instructor")
        return res.status(200).json({
            success: true,
            data: allCourses,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "something went wrong in createcourse try block",
        });
    }
};
//createcourse
exports.createCourse = async (req, res) => {
    try {
        //get the data of course
        const {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            category,
        } = req.body;
        //get user id from req.user
        const userId = req.user.id;
        // Get thumbnail image from request files
        const thumbnail = req.files.thumbnailImage;

        //validate all data
        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !tag ||
            !thumbnail ||
            !category
        ) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required",
            });
        }

        //make sure that category exist
        const categoryDetails = await Category.findById(category)
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found",
            });
        }
        //make sure that course name does not exist
        const existedcourse = await Course.findOne({ courseName: courseName, instructor: userId })
        if (existedcourse) {
            return res.status(404).json({
                success: false,
                message: "you already created course with this name",
            });
        }
        //make sure user is instructor
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
        });

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details Not Found",
            });
        }
        //upload image to cloudinary
        const result = await filesendtocloudinary(thumbnail, process.env.FOLDER_NAME)
        //create course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            thumbnail: result.secure_url
        });
        //find user by user id and push course id into its courses
        await User.findByIdAndUpdate(userId, {
            $push: {
                courses: newCourse._id
            }
        }, { new: true })
        //find category by category id and push course id into its courses
        await Category.findByIdAndUpdate(category, {
            $push: {
                course: newCourse._id
            }
        }, { new: true })
        // Return the new course and a success message
        return res.status(200).json({
            success: true,
            data: newCourse,
            message: "Course Created Successfully",
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "something went wrong in createcourse try block"
        })
    }
}