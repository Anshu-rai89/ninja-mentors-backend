"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const mongoUri = ((_a = process.env.MONGO_URI) !== null && _a !== void 0 ? _a : 'mongodb://localhost:27017/test');
        // Connect to MongoDB
        yield mongoose_1.default.connect(mongoUri);
        logger_1.default.info('DB connected');
    }
    catch (error) {
        logger_1.default.error(`Error -> ${error}`);
    }
});
