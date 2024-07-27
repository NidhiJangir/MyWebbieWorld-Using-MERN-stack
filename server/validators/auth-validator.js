const {z} = require("zod");

const loginSchema = z.object({
    email: z
    .string({ required_error: "Email is required to fill"})
    .trim()
    .email({message: "Inavalid email address"})
    .min(3, {message: "Email must be at least of 3 characters."})
    .max(255, { message:"Email must not be more than 255 characters"}),
    password: z
    .string({ required_error: "password is required to fill"})
    .min(7, {message: "Password must be at least of 6 characters."})
    .max(1024, { message:"Password must not be more than 1024 characters"}),
});

//creating object schema

const signupSchema = loginSchema.extend({
    username: z
    .string({ required_error: "Name is required to fill"})
    .trim()
    .min(3, {message: "Name must be at least of 3 characters."})
    .max(255, { message:"Name must not be more than 255 characters"}),
    
    phone: z
    .string({ required_error: "Phone number is required to fill"})
    .trim()
    .min(10, {message: "Phone Number must be of 10 characters."})
    .max(20, { message:"Phone must not be more than 20 characters"}),
    
});
module.exports= {signupSchema, loginSchema};