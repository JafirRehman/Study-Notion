const Category = require('../models/Category')
const Course = require('../models/Course')


function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}
//categorypage
exports.categoryPageDetails = async (req, res) => {
    try {
        //get category id
        const { categoryid } = req.body
        //validate category
        if (!categoryid) {
            return res.status(400).json({
                success: false,
                message: "category id is required"
            })
        }
        //get all courses of that category with populate
        const categorydata = await Category.findOne({ categoryid }).populate({
            path: "course",
            populate: [
                { path: "instructor" },
                { path: "ratingAndReviews" }
            ]
        })
        //validate category
        if (!categorydata) {
            return res.status(400).json({
                success: false,
                message: "we cant found this category"
            })
        }
        //validate courses
        if (categorydata.course.length === 0) {
            return res.status(400).json({
                success: false,
                message: "no courses found for this category"
            })
        }
        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryid },
        })
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
                ._id
        ).populate({
            path: "course",
        })
        // Get top-selling courses across all categories
        const allCategories = await Category.find()
            .populate({
                path: "course",
            })
        //collect all courses into one single array
        //difference between map and flatMap
        const allCourses = allCategories.flatMap((category) => category.course)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.studentsEnroled.length - a.studentsEnroled.length)
            .slice(0, 10)

        //return response 
        return res.status(200).json({
            success: true,
            data: {
                categorydata,
                differentCategory,
                mostSellingCourses,
            },
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong in addcoursetocategory try block"
        })
    }
}

//addcoursetocategory

exports.addcoursetocategory = async (req, res) => {
    try {
        //get course and category id
        const { courseid, categoryid } = req.body;
        //validate
        if (!courseid || !categoryid) {
            return res.status(400).json({
                success: false,
                message: "all feilds are required"
            })
        }
        //make sure category exist
        const category = await Category.findOne({ categoryid })
        if (!category) {
            return res.status(402).json({
                success: false,
                message: "this category does not exist"
            })
        }
        //make sure course exist
        const course = await Course.findOne({ courseid })
        if (!course) {
            return res.status(402).json({
                success: false,
                message: "this course does not exist"
            })
        }
        //make sure course does not already exist in category
        if (category.course.includes(courseid)) {
            return res.status(402).json({
                success: false,
                message: "this course already exist in given category"
            })
        }
        //add course to give category
        await Category.findOneAndUpdate({ categoryid }, {
            $push: {
                course: courseid
            }
        })
        //return response
        return res.status(200).json({
            success: true,
            message: "course added to category successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong in addcoursetocategory try block"
        })
    }
}

//getallcategories

exports.showAllCategories = async (req, res) => {
    try {
        const allcategories = await Category.find({}, { name: true, discription: true })
        return res.status(200).json({
            success: true,
            data: allcategories
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong in getallcategories try block"
        })
    }
}

//createcategory

exports.createCategory = async (req, res) => {
    try {
        //get name and discription
        const { name, discription } = req.body;
        //validate name and discription
        if (!name || !discription) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        //make sure same name does not exist before
        const categorydata = await Category.findOne({ name })
        if (categorydata) {
            return res.status(400).json({
                success: false,
                message: "this category already exist"
            })
        }
        //create category
        await Category.create({ name, discription })
        //return response
        return res.status(200).json({
            success: true,
            message: "category created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong in createcategory try block"
        })
    }
}