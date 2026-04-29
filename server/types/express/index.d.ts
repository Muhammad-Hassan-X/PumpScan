import { Response } from "express";

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
    export interface Response {
      sendResponse: (
        statusCode: number,
        success: boolean,
        message: string,
        data?: any,
        error?: any,
      ) => void;
    }
  }
}
