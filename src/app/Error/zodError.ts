import { ZodError, ZodIssue } from "zod";
import { Return } from "../interface/retrun";
import { TerrorSource } from "../interface/error";



const handleZodError = (zodError: ZodError): Return => {
    const errorSources: TerrorSource = zodError.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    return {
        statusCode: 400,
        message: " validation error",
        errorSource: errorSources
    };
};


export default handleZodError