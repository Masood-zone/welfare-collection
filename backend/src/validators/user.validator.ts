import {z} from "zod"

export const Role = z.enum([
    "ADMIN", 
    "MEMBER"
])

export const userSchema = z.object({
    fullname: z.string({required_error: "Full name cannot be empty"})
    .trim()
    .min(5, "Full name must be at least 5 characters long"),
    email: z.string({required_error: "please provide a valid email"}).email()
    .trim(),
    phoneNumber: z.string({required_error: "Please provide a phone number"})
    .min(10, "Phone number must be at least 10 digits long")
    .max(15, "Phone number must be at most 15 digits long"),
    password: z.string({required_error: "Please provide a password"}).min(8, "Password must be at least 8 characters long"),
    role: Role,
})

export type userData = z.infer<typeof userSchema>