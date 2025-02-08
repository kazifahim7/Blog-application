import catchAsync from "../../utils/catchAsync";
import { projectService } from "./project.service";

const createProject =catchAsync(async(req,res)=>{
    const data =req?.body
    const result= await projectService.createProjectIntoDB(data)

        res.status(201).json({
            success: true,
            message: "project created successfully",
            statusCode: 201,
            data: result
        })
})

const getAllProject = catchAsync(async(req,res)=>{
    const result = await projectService.allProjectFromDB()
    res.status(201).json({
        success: true,
        message: "project retrieved successfully",
        statusCode: 201,
        data: result
    })
})
const getSingleProject = catchAsync(async(req,res)=>{
    const result = await projectService.singleProjectFromDB(req.params.id)
    res.status(201).json({
        success: true,
        message: "project retrieved successfully",
        statusCode: 201,
        data: result
    })
})


const deleProject = catchAsync(async(req,res)=>{
   await projectService.deleprojectFromDB(req.params.id)
    res.status(201).json({
        success: true,
        message: "project deleted successfully",
        statusCode: 201,
    })
})
const updateProject = catchAsync(async(req,res)=>{
    const result = await projectService.updateProjectIntoDb(req.params.id,req.body)
    res.status(201).json({
        success: true,
        message: "project updated successfully",
        statusCode: 201,
        data: result
    })
})







export const projectController= {
    createProject,
    getAllProject,
    getSingleProject,
    deleProject,
    updateProject
}