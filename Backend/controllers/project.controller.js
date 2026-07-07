const projectService = require("../services/project.service.js");
const CustomError = require("../utils/CustomError.js");

const createProject =async (req,res, next) => {
    try {
        const {...data} = req.body;
        const user = req.user;

        if (!data || data?.length == 0) throw new CustomError(400, "Invalid data values");

        const response = await projectService.createProject(user._id, data);

        return res.status(201).json({
            success : true,
            message : "project created Successfully",
            project : response
        });
    } catch (error) {
        next(error);
    }
};

const deleteProject = async(req, res, next) => {
    try {
        const projectId = req.params?.id;
        const user = req.user;

        const response = await projectService.deleteProject(user._id, projectId);

        return res.status(201).json({
            success : true,
            message : "Project Deleted Successfully"
        });
    } catch (error) {
        next(error);
    }
};


const updateProject = async(req, res, next) => {
    try {
        const projectId = req.params.id;
        const user = req.user;
        const {...data} = req.body;

        const response = await projectService.updateProject(user._id,projectId, data);

        return res.status(200).json({
            success : true,
            message : "Project Details Successfully",
            project : response
        });
    } catch (error) {
        next(error);
    }
};

const getProjectById = async (req, res, next) => {
    try {
        const projectId = req.params?.id;
        const user = req.user;

        const response = await projectService.getProjectById(user._id, projectId);

        return res.status(200).json({
            success : true,
            message : "Project Fetched Successfully",
            project : response
        });
    } catch (error) {
        next(error);
    }
};




module.exports = {
    createProject,
    deleteProject,
    updateProject,
    getProjectById,
};