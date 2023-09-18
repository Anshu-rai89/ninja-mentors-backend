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
exports.Mentor = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Define the Mentor schema
const mentorSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    rating: {
        type: Number,
        default: 5
    },
    students: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Student'
        }],
    degree: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    workExperience: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    onborded: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    skills: [{
            type: String
        }],
    linkedin: String,
    github: String
});
// Hash the password before saving it to the database
mentorSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password') === false)
            return next();
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(this.password, salt);
            this.password = hashedPassword;
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
// Method to compare a password with the hashed password in the database
mentorSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
// Create and export the Mentor model
exports.Mentor = mongoose_1.default.model('Mentor', mentorSchema);
