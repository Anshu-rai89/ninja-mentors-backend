"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../configs/logger"));
// Define an async error handling middleware
const asyncErrorHandler = (error, req, res, next
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
    // Handle the error here
    logger_1.default.error(error);
    // You can customize the error response based on your requirements
    res.status(500).json({ error: 'Internal Server Error' });
};
exports.default = asyncErrorHandler;
