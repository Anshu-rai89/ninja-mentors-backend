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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./configs/db"));
const logger_1 = __importDefault(require("./configs/logger"));
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_1.default)();
        app_1.default.listen(port, () => {
            logger_1.default.info(`Server is running on port ${port}`);
        });
    });
}
void startServer();
