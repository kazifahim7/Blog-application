import { TProject } from "./project.interface";
import { ProjectModel } from "./project.model";

const createProjectIntoDB = async (payload: TProject) => {
    const result = await ProjectModel.create(payload)
    return result
}


const allProjectFromDB=async()=>{
    const result = await ProjectModel.find()
    return result
}
const singleProjectFromDB =async(id:string)=>{
    const result = await ProjectModel.findById(id)
    return result
}
const deleprojectFromDB =async(id:string)=>{
    const result = await ProjectModel.findByIdAndDelete(id)
    return result
}

const updateProjectIntoDb =async(id:string,payload:Record<string,unknown>)=>{
    const result = await ProjectModel.findByIdAndUpdate(id,payload,{new:true})
    return result
}






export const projectService = {
    createProjectIntoDB,
    allProjectFromDB,
    singleProjectFromDB,
    deleprojectFromDB,
    updateProjectIntoDb
}