import { z } from "zod";

export const createAdmin = z.object({
  name: z.string().min(3, { message: "Name must be 3 or more characters long" }).optional(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Password must be 5 or more characters long" }),
});

export const updateAdmin = z.object({
  name: z.string().min(3, { message: "Name must be 3 or more characters long" }).optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Password must be 5 or more characters long" }),
});

export const createCourse = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string().optional(),
  location: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  adminId: z.string(),
  active: z.boolean().optional(),
  info: z.object({}).passthrough().optional(),
});

export const updateCourse = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  active: z.boolean().optional(),
  info: z.object({}).passthrough().optional(),
});

export const createCandidate = z.object({
  name: z.string(),
  email: z.string().optional(),
  address: z.string().optional(),
  telephoneNumber: z.string().optional(),
  company: z.string().optional(),
  createdById: z.string(),
});

export const updateCandidate = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  telephoneNumber: z.string().optional(),
  company: z.string().optional(),
});

export const createResult = z.object({
  courseId: z.string({ required_error: "CourseID", invalid_type_error: "CourseID must be a string" }),
  candidateId: z.string({
    required_error: "CandidateID",
    invalid_type_error: "CandidateID must be a string",
  }),
  passdate: z.coerce.date().optional(),
  expiryDate: z.coerce.date().optional(),
});

export const updateResult = z.object({
  courseId: z.string().optional(),
  candidateId: z.string().optional(),
  passdate: z.coerce.date().optional(),
  expiryDate: z.coerce.date().optional(),
});
