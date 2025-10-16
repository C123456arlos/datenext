import { z } from 'zod'
export const memberEditSchema = z.object({
    name: z.string().min(1, {
        message: 'name required'
    }),
    description: z.string().min(1, {
        message: 'descrip'
    }),
    city: z.string().min(1, {
        message: 'city'
    }),
    country: z.string().min(1, {
        message: 'country'
    })
})
export type MemberEditSchema = z.infer<typeof memberEditSchema>