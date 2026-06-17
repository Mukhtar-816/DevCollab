const { z } = require("zod");

const loginSchema = z.object({
    email: z.string().trim().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters")
});

const registerSchema = z.object({
    email: z.string().trim().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    name: z.string().trim().min(2, "Name is too short").optional()
});


module.exports = {
    loginSchema, registerSchema
};