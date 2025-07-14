import { z } from "zod";

export const userValidationSchema = z.object({
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }).email("Invalid email address"),

  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }).min(8, "Password must be at least 8 characters long"),

  fullName: z.string({
    required_error: "Full name is required",
    invalid_type_error: "Full name must be a string",
  }),

  address: z.string().optional(),

  gender: z.enum(["male", "female", "others"]).optional(),

  contactNo: z.string().optional(),

  profileImageUrl: z.string().optional(),

  passwordChangedAt: z.date().optional(),

  role: z.enum(["user", "admin", "editor", "reviewer"]).optional(),

  status: z.enum(["in-progress", "blocked"]).optional(),

  isDeleted: z.boolean().optional(),

  credits: z.number().optional(),

  isActive: z.boolean().optional(),
});
