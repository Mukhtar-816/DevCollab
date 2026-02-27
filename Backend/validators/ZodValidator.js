import { z } from "zod";

// Login schema
const loginSchemaValidator = z.object({
  // username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string(),//.email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long")
});

// Register schema
const registerSchemaValidator = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string(),//.email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long")
});

export default {
  loginSchemaValidator,
  registerSchemaValidator
};