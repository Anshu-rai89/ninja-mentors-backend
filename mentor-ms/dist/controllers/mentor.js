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
exports.getVerifiedMentors = exports.createMentor = void 0;
const logger_1 = __importDefault(require("../configs/logger"));
const express_validator_1 = require("express-validator");
const Mentor_1 = require("../models/Mentor");
// Controller function for creating a new mentor
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createMentor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Check for validation errors
    const errors = (0, express_validator_1.validationResult)(req);
    if ((errors.isEmpty()) === false) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Create a new mentor instance based on the request body
        const newMentor = new Mentor_1.Mentor(req.body);
        const mentor = yield newMentor.save();
        return res.status(201).json(mentor);
    }
    catch (error) {
        next(error);
    }
});
exports.createMentor = createMentor;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getVerifiedMentors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Query the database for verified mentors
        const verifiedMentors = yield Mentor_1.Mentor.find({ verified: true });
        res.status(200).json(verifiedMentors);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getVerifiedMentors = getVerifiedMentors;
