import * as z from "zod"

export const SignupValidationSchema = z.object({
    name: z.string().min(2, {message: "Name should be atleast 2 characters"}),
    username: z.string().min(2, {message: "Username should be atleast 3  characters"}),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must have atleast 8 characters'})
});

export const SigninValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {message: 'Password cannot be empty!'})
})

export const PostValidationSchema = z.object({
    caption: z.string().min(3).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(3).max(100),
    tags: z.string(),
})

export const ProfileUpdateValidationScheme = z.object({
    name: z.string().min(2, {message: 'Name should be atleast 2 characters'}),
    username: z.string().min(2, {message: 'Username should be atleast 3 characters'}),
    bio: z.string().min(2, {message: 'Bio should be atleast 3 characters'}),
    file: z.custom<File[]>(),
    imageUrl: z.string(),
    imageId: z.string(),
})