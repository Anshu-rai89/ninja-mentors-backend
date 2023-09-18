import mongoose, { type Document } from 'mongoose'

// Define the Mentor schema
const mentorSchema = new mongoose.Schema({
  name: {
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
    type: mongoose.Schema.Types.ObjectId,
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
})

// Define the Mentor interface to enforce TypeScript type checking
export interface IMentor extends Document {
  name: string
  email: string
  avatar: string
  degree: string
  college: string
  course: string
  workExperience: number
  company: string
  designation: string
  bio: string
  linkedin?: string
  github?: string
  skills: string[]
  onborded: boolean
  verified: boolean
  rating: number
  students: any
}

// Create and export the Mentor model
export const Mentor = mongoose.model<IMentor>('Mentor', mentorSchema)
