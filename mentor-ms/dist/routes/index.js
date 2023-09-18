"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const mentor_1 = require("../controllers/mentor");
const router = express_1.default.Router();
// Validation middleware for the mentor creation request
const mentorValidationRules = [
    (0, express_validator_1.body)('name').isString().trim().notEmpty(),
    (0, express_validator_1.body)('password').isString().trim().notEmpty().isLength({ min: 5, max: 10 }),
    (0, express_validator_1.body)('email').isEmail().normalizeEmail(),
    (0, express_validator_1.body)('degree').isString().trim().notEmpty(),
    (0, express_validator_1.body)('college').isString().trim().notEmpty(),
    (0, express_validator_1.body)('course').isString().trim().notEmpty(),
    (0, express_validator_1.body)('workExperience').isNumeric(),
    (0, express_validator_1.body)('company').isString().trim().notEmpty(),
    (0, express_validator_1.body)('designation').isString().trim().notEmpty(),
    (0, express_validator_1.body)('bio').isString().trim().notEmpty(),
    (0, express_validator_1.body)('linkedin').optional().isURL(),
    (0, express_validator_1.body)('github').optional().isURL(),
    (0, express_validator_1.body)('skills').isArray()
];
router.post('/mentor', mentorValidationRules, mentor_1.createMentor);
router.get('/mentor', mentor_1.getVerifiedMentors);
exports.default = router;
