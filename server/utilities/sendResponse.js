/**
 * A reusable helper for sending consistent JSON responses.
 */
export const sendResponse = (res, statusCode, success, message, data, error) => {
    const response = {
        success,
        message,
    };
    if (data !== undefined)
        response.data = data;
    if (error !== undefined)
        response.error = error;
    return res.status(statusCode).json(response);
};
