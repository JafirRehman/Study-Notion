const Course = require('../models/Course')
const Section = require('../models/Section')
const SubSection = require('../models/SubSection')

// DELETE a section
exports.deleteSection = async (req, res) => {
    try {
        //get the data
        const { sectionId, courseId } = req.body;  //req.body only for testing otherwise use req.params for deploying
        const section = await Section.findById(sectionId)
        if (!section) {
            return res.status(400).json({
                success: false,
                message: "this section does not even exist",
            });
        }
        //update course
        await Course.findByIdAndUpdate(
            courseId,
            { $pull: { courseContent: sectionId } },
            { new: true }
        ).populate({ path: "courseContent", populate: { path: "subSection" } })

        // Delete the associated subsections
        await SubSection.deleteMany({ _id: { $in: section.subSection } })
        //delete section
        await Section.findByIdAndDelete(sectionId);
        //return res
        return res.status(200).json({
            success: true,
            message: "Section deleted",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong inside deletesection try block",
        });
    }
};

// UPDATE a section
exports.updateSection = async (req, res) => {
    try {
        //get the data
        const { sectionName, sectionId } = req.body;
        // validate data
        if (!sectionName || !sectionId) {
            return res.status(200).json({
                success: false,
                message: "all feilds are required",
                updatedsection,
            });
        }
        //update section
        const updatedsection = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        );
        // return response
        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            updatedsection,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong in updateSection try block",
        });
    }
};

//create section
exports.createSection = async (req, res) => {
    try {
        // get the data
        const { sectionName, courseId } = req.body;

        // Validate the input
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "all feilds required",
            });
        }
        //check if course exist or not
        const ifcourse = await Course.findById(courseId);
        if (!ifcourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
        // Create section
        const newSection = await Section.create({ sectionName });
        // update course
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                },
            },
            { new: true }
        )
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
        // Return the response
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourse,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong in createsection try block"
        })
    }
}