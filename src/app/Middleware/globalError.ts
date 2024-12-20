/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import config from '../config';

import { TerrorSource } from '../interface/error';
import handleZodError from '../Error/zodError';
import mongooseValidationError from '../Error/validationError';
import AppError from '../Error/AppEror';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode;
    let message = err.message || "Something went wrong";
    let errorSources: TerrorSource = [
        {
            path: "",
            message: "Something went wrong"
        }
    ];



    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSource;
    } else if (err?.name === "ValidationError") {
        const simplifiedError = mongooseValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSource;
    }  else if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message;
        errorSources = [{
            path: '',
            message: err?.message
        }]
    } else if (err instanceof Error) {
        message = err.message;
        errorSources = [{
            path: '',
            message: err?.message
        }]
    } 

    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error:errorSources,
        stack: config.node_env === "development" ? err?.stack : null
    });
};

export default errorHandler;
