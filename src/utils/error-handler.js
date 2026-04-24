const { StatusCodes } = require("http-status-codes");
const ApiRes = require("./api-response");

// middlewares/error-handler.js
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Log the error for the developer 
    res.status(statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(new ApiRes(statusCode || StatusCodes.INTERNAL_SERVER_ERROR, false, message || "Internal Server Error", process.env.NODE_ENV === 'development' ? err.stack : undefined));
};

module.exports = errorHandler;