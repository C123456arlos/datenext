import { z } from 'zod'
import { calculateAge } from '../util'
export const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6, {
        message: 'password must be 6 characters'
    })
})
export const profileSchema = z.object({
    gender: z.string().min(1),
    description: z.string().min(1),
    city: z.string().min(3),
    country: z.string().min(1),
    dateOfBirth: z.string().min(1, { message: 'date of birth required' }).refine(
        dateString => {
            const age = calculateAge(new Date(dateString))
            return age >= 18
        }, {
        message: 'you must be at least 18'
    }
    )
})
export const combinedRegisterSchema = registerSchema.and(profileSchema)
export type RegisterSchema = z.infer<typeof registerSchema & typeof profileSchema>
export type ProfileSchema = z.infer<typeof profileSchema>