import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from 'next-auth'
import { getUserByEmail } from './app/actions/authActions'
import { compare } from 'bcryptjs'
import { loginSchema } from './lib/schemas/LoginSchema'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true
        }),
        Credentials({
            name: 'credentials',
            async authorize(creds) {
                const validated = loginSchema.safeParse(creds)
                if (validated.success) {
                    const { email, password } = validated.data
                    const user = await getUserByEmail(email)
                    if (!user || !user.passwordHash || !(await compare(password, user.passwordHash))) return null
                    return user
                }
                return null
            }
        })]
} satisfies NextAuthConfig

