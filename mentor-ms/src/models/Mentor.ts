import mongoose, { type Document } from 'mongoose'
import bcrypt from 'bcrypt'

// Define the Mentor schema
const mentorSchema = new mongoose.Schema({
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
  password: string
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

// Hash the password before saving it to the database
mentorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) { next(); return }

  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
  } catch (error: any) {
    next(error)
  }
})

// Method to compare a password with the hashed password in the database
mentorSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

// Create and export the Mentor model
export const Mentor = mongoose.model<IMentor>('Mentor', mentorSchema)
