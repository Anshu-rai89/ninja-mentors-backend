"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOptions = {
    // Specify the allowed origins. '*' allows all origins (not recommended for production).
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false // Disable preflight requests.
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(errorHandler_1.default);
app.use('/api/v1', routes_1.default);
app.get('/health', (req, res) => {
    res.send('Hello, TypeScript Express!');
});
exports.default = app;
