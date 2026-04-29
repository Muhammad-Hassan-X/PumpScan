import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utilities/index.js";
/**
 * Middleware that attaches sendResponse globally to res.
 */
export const responseHandler = (req: Request, res: Response, next: NextFunction) => {
    res.sendResponse = function (statusCode, success, message, data, error) {
        return sendResponse(this, statusCode, success, message, data, error);
    };
    next();
};
