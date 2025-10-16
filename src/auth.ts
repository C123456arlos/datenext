// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
// import authConfig from './auth.config'
// const prisma = new PrismaClient()
// export const { auth, handlers, signIn, signOut } = NextAuth({
//     callbacks: {
//         async jwt({ user, token }) {
//             // if (user) {
//             // token.id = token.sub
//             // token.username = user.id
//             token.profileComplete = user.profileComplete
//             console.log('user', token)
//             return token
//             // }ss
//         },
//         async session({ session, token }) {
//             if (token.sub && session.user) {
//                 session.user.id = token.sub
//                 session.user.profileComplete = token.profileComplete as boolean
//             }
//             console.log('session:::', session)
//             return session
//         }
//     },
//     adapter: PrismaAdapter(prisma),
//     session: { strategy: 'jwt' },
//     ...authConfig
// })

















// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { PrismaClient, Role } from "@prisma/client"
// import authConfig from "./auth.config"

// const prisma = new PrismaClient()

// export const { auth, handlers, signIn, signOut } = NextAuth({
//     callbacks: {
//         async jwt({ user, token }) {
//             // if (user) {
//             token.profileComplete = user.profileComplete;
//             // token.role = user.role;
//             // }
//             console.log('user:::', user)
//             return token;
//         },
//         async session({ session, token }) {
//             if (token.sub && session.user) {
//                 session.user.id = token.sub;
//                 // session.user.profileComplete = token.profileComplete as boolean;
//                 // session.user.role = token.role as Role;
//             }

//             return session;
//         }
//     },
//     adapter: PrismaAdapter(prisma),
//     session: { strategy: "jwt" },
//     ...authConfig,
// })

// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { PrismaClient, Role } from "@prisma/client"
// import authConfig from "./auth.config"

// const prisma = new PrismaClient()

// export const { auth, handlers, signIn, signOut } = NextAuth({
//     callbacks: {
//         async jwt({ user, token }) {
//             if (user) {
//                 token.profileComplete = user.id;

//             }
//             console.log('user:::', user)
//             return token;
//         },
//         async session({ session, token }) {
//             if (token.sub && session.user) {
//                 session.user.id = token.sub;

//             }

//             return session;
//         }
//     },
//     adapter: PrismaAdapter(prisma),
//     session: { strategy: "jwt" },
//     ...authConfig,
// })


import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient, Role } from "@prisma/client"
import authConfig from "./auth.config"

const prisma = new PrismaClient()

export const { auth, handlers, signIn, signOut } = NextAuth({
    callbacks: {
        async jwt({ user, token }) {
            if (user) {
                token.profileComplete = user.profileComplete;
                token.role = user.role
            }
            return token;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.profileComplete = token.profileComplete as boolean;
                session.user.role = token.role as Role
            }

            return session;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
})



