const Section = require('../models/Section')
const SubSection = require('../models/SubSection')

const { filesendtocloudinary } = require('../utils/filesendtocloudinary')

require('dotenv').config()

//update subsection
exports.updateSubSection = async (req, res) => {
    try {
        //get data
        const { SubsectionId, title, description } = req.body;
        //find section
        const subsectiontoupdate = await SubSection.findById(SubsectionId);
        if (!subsectiontoupdate) {
            return res.status(404).json({
                success: false,
                message: "subsection did not exist"
            });
        }
        //update the values
        if (title !== undefined) {
            subsectiontoupdate.title = title
        }
        if (description !== undefined) {
            subsectiontoupdate.description = description
        }
        // Upload the video file to Cloudinary
        if (req.files && req.files.videoFile !== undefined) {
            const video = req.files.videoFile;
            const uploadDetails = await filesendtocloudinary(
                video,
                process.env.FOLDER_VIDEO
            );
            subsectiontoupdate.videoUrl = uploadDetails.secure_url;
            subsectiontoupdate.timeDuration = `${uploadDetails.duration}`
        }
        //update subsection
        await subsectiontoupdate.save()
        // Return the updated section in the response
        return res.status(200).json({
            success: true,
            message: "subsection updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong in updateSubSection try block"
        });
    }
}

//delete subsection
exports.deleteSubSection = async (req, res) => {
    try {
        //get data
        const { subSectionId, sectionId } = req.body;
        //validate data
        if (!subSectionId || !sectionId) {
            return res.status(404).json({
                success: false,
                message: "all fields are required",
            });
        }
        
        //update section
        const updatedSection = await Section.findByIdAndUpdate({ _id: sectionId }, { $pull: { subSection: subSectionId } }, { new: true });
        if (!updatedSection) {
            return res.status(400).json({
                success: false,
                message: "section does not exist",
            });
        }
        //delete subsection
        const deletedsubsection = await SubSection.findByIdAndDelete(subSectionId);
        if (!deletedsubsection) {
            return res.status(400).json({
                success: false,
                message: "Sub-section does not exist",
            });
        }
        //return response
        return res.status(200).json({
            success: true,
            message: "Sub-section deleted",
            data: updatedSection
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong inside deletesubsection try block",
        });
    }
};

function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.round(durationInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

//create Subsection
exports.createSubSection = async (req, res) => {
    try {
        //get the data
        const { sectionId, title, description } = req.body;
        const video = req.files.videoFile;
        // validate
        if (!sectionId || !title || !description || !video) {
            return res.status(404).json({ success: false, message: "All Fields are Required" });
        }
        //check if section exist
        const ifsection = await Section.findById(sectionId);
        if (!ifsection) {
            return res.status(404).json({ success: false, message: "Section not found" });
        }
        // Upload the video file to Cloudinary
        const uploadDetails = await filesendtocloudinary(
            video,
            process.env.FOLDER_VIDEO
        );
        //converting the time of video to profession look
        const formattedDuration = formatDuration(uploadDetails.duration);
        // Create a new sub-section
        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: formattedDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });

        // Update the corresponding section with the newly created sub-section
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: SubSectionDetails._id } },
            { new: true }
        ).populate("subSection");
        //return response
        return res.status(200).json({
            success: true,
            data: updatedSection
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "something went wrong in createsubsection try block",
            error: error.message,
        });
    }
};