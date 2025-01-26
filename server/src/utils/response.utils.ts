import { Response } from 'express';

export const sendSuccessResponse = (
    res: Response,
    data: any,
    message: string,
    statusCode: number = 200
): void => {
    res.status(statusCode).json({ success: true, message, data });
};

export const sendErrorResponse = (
    res: Response,
    message: string,
    statusCode: number = 500,
    error: any = null
): void => {
    res.status(statusCode).json({ success: false, message, error });
};
