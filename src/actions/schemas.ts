import {z} from 'zod'

export const logInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Your password must be minimun of 6 characters")
})

export const signUpSchema = z.object({
      email: z.string().email(),
      username:z.string().min(5,"username must be at least 5 characters long"),
    password: z.string().min(6, "Your password must be minimun of 6 characters")
})

export const postSchema = z.object({
    title: z.string().min(3, "Titles must have at least 3 characters"),
    content: z.string().optional(),
    // image: z.instanceof(FormData).optional()
})
