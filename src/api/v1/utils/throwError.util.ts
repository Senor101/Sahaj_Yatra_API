
import { response } from "express";

const throwError = (message:string, statusCode:number) => {
    return response.status(statusCode).json({
        error:message
    })
}

export default throwError;
