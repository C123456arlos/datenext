'use server'
import { auth, signIn, signOut } from '@/auth'
import { sendPasswordResetEmail, sendVerificationEmail } from '@/lib/mail'
import { prisma } from '@/lib/prisma'
import { LoginSchema } from '@/lib/schemas/LoginSchema'
import { combinedRegisterSchema, ProfileSchema, registerSchema, RegisterSchema } from '@/lib/schemas/RegisterSchema'
import { generateToken, getTokenByEmail, getTokenByToken } from '@/lib/token'
import { ActionResult } from '@/types'
import { TokenType, User } from '@prisma/client';
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'
// export async function signInUser(data: LoginSchema): Promise<ActionResult<string>>{
//     try {
//         const existingUser = await getUserByEmail(date.email)
//         if(!existingUser || !existingUser.email) return {status:'error', error}
// }
// }
export async function signInUser(data: LoginSchema): Promise<ActionResult<string>> {
    try {
        const existingUser = await getUserByEmail(data.email)
        if (!existingUser || !existingUser.email) return { status: 'error', error: 'invalid credentials' }
        if (!existingUser.emailVerified) {
            const { token, email } = await generateToken(existingUser.email, TokenType.VERIFICATION)
            await sendVerificationEmail(email, token)
            return { status: 'error', error: ' verify email' }
        }
        const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })
        console.log(result)
        return { status: 'success', data: 'logged in' }
    } catch (error) {
        console.log(error)
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { status: 'error', error: 'invalid credetnials' }
                default:
                    return { status: 'error', error: 'something went wrong' }
            }
        } else {
            return { status: 'error', error: 'somthing else went worng' }
        }
    }
}
export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
    try {
        const validated = combinedRegisterSchema.safeParse(data)
        if (!validated.success) {
            return { status: 'error', error: validated.error.errors }
        }
        const { name, email, password, gender, description, city, country, dateOfBirth } = validated.data
        const hashedPassword = await bcrypt.hash(password, 10)
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })
        if (existingUser) return { status: 'error', error: "user exists" }
        const user = await prisma.user.create({
            data: {
                name, email, passwordHash: hashedPassword,
                member: {
                    create: {
                        name, description, city, country, dateOfBirth: new Date(dateOfBirth),
                        gender
                    }
                }
            }
        })
        const verificationToken = await generateToken(email, TokenType.VERIFICATION)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        return { status: 'success', data: user }
    } catch (error) {
        console.log(error)
        return { status: 'error', error: 'something went wrong' }
    }
}
export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
}
export async function signOutUser() {
    await signOut({ redirectTo: '/' })
}
// export async function getAuthUserId() {
//     const session = await auth()
//     const userId = session?.user?.id
//     if (!userId) throw new Error('unauthorized')
//     return userId
// }
export async function getAuthUserId() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) throw new Error('Unauthorized');

    return userId;
}
export async function verifyEmail(token: string): Promise<ActionResult<string>> {
    try {
        const existingToken = await getTokenByToken(token)
        if (!existingToken) {
            return { status: 'error', error: 'invalid token' }
        }
        const hasExpired = new Date() > existingToken.expires
        if (hasExpired) {
            return { status: 'error', error: 'token expired' }
        }
        const existingUser = await getUserByEmail(existingToken.email)
        if (!existingUser) {
            return { status: 'error', error: 'user not found' }
        }
        await prisma.user.update({
            where: { id: existingUser.id },
            data: { emailVerified: new Date() }
        })
        await prisma.token.delete({ where: { id: existingToken.id } })
        return { status: 'success', data: 'success' }
    } catch (error) {
        console.log(error)
        throw error
    }
}
export async function generateResetPasswordEmail(email: string): Promise<ActionResult<string>> {
    try {
        const existingUser = await getUserByEmail(email)
        if (!existingUser) {
            return { status: 'error', error: 'email not found' }
        }
        const token = await generateToken(email, TokenType.PASSWORD_RESET)
        await sendPasswordResetEmail(token.email, token.token)
        return { status: 'success', data: 'password reset email sent' }
    } catch (error) {
        console.log(error)
        return { status: 'error', error: 'something went wrong' }
    }
}
// export async function resetPassword(password: string, token: string | null): Promise<ActionResult<string>> {
//     try {
//         if (!token) return { status: 'error', error: 'missing token' }
//         const existingToken = await getTokenByToken(token)
//         if (!existingToken) {
//             return { status: 'error', error: 'invalid token' }
//         }
//         const hasExpired = new Date() > existingToken.expires
//         if (hasExpired) {
//             return { status: 'error', error: 'token has expired' }
//         }
//         const existingUser = await getUserByEmail(existingToken.email)
//         if (!existingUser) {
//             return { status: 'error', error: 'user not found' }
//         }
//         const hashedPassword = await bcrypt.hash(password, 10)
//         await prisma.user.update({
//             where: { id: existingUser.id },
//             data: { passwordHash: hashedPassword }
//         })
//         await prisma.token.delete({
//             where: { id: existingToken.id }
//         })
//         return { status: 'success', data: 'password updated. try logging in' }
//     } catch (error) {
//         console.log(error)
//         return { status: 'error', error: 'something went wrong' }
//     }
// }

export async function resetPassword(password: string, token: string | null): Promise<ActionResult<string>> {
    try {
        if (!token) return { status: 'error', error: 'Missing token' };

        const existingToken = await getTokenByToken(token);

        if (!existingToken) {
            return { status: 'error', error: 'Invalid token' }
        }

        const hasExpired = new Date() > existingToken.expires;

        if (hasExpired) {
            return { status: 'error', error: 'Token has expired' }
        }

        const existingUser = await getUserByEmail(existingToken.email);

        if (!existingUser) {
            return { status: 'error', error: 'User not found' }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { id: existingUser.id },
            data: { passwordHash: hashedPassword }
        });

        await prisma.token.delete({
            where: { id: existingToken.id }
        });

        return { status: 'success', data: 'Password updated successfully.  Please try logging in' }
    } catch (error) {
        console.log(error);
        return { status: 'error', error: 'Something went wrong' }
    }
}


// export async function verifyEmail(token: string): Promise<ActionResult<string>> {
//     try {
//         const existingToken = await getTokenByToken(token);

//         if (!existingToken) {
//             return { status: 'error', error: 'Invalid token' }
//         }

//         const hasExpired = new Date() > existingToken.expires;

//         if (hasExpired) {
//             return { status: 'error', error: 'Token has expired' }
//         }

//         const existingUser = await getUserByEmail(existingToken.email);

//         if (!existingUser) {
//             return { status: 'error', error: 'User not found' }
//         }

//         await prisma.user.update({
//             where: { id: existingUser.id },
//             data: { emailVerified: new Date() }
//         });

//         await prisma.token.delete({ where: { id: existingToken.id } })

//         return { status: 'success', data: 'Success' }

//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }
// export async function completeSocialLoginProfile(data: ProfileSchema): Promise<ActionResult<string>> {
//     const session = await auth()
//     if (!session?.user) return { status: 'error', error: 'user not found' }
//     try {
//         const user = await prisma.user.update({
//             where: { id: session.user.id },
//             data: {
//                 profileComplete: true,
//                 member: {
//                     create: {
//                         name: session.user.name as string,
//                         image: session.user.image,
//                         gender: data.gender,
//                         dateOfBirth: new Date(data.dateOfBirth),
//                         description: data.description,
//                         city: data.city,
//                         country: data.country
//                     }
//                 }
//             },
//             select: {
//                 accounts: {
//                     select: {
//                         provider: true
//                     }
//                 }
//             }
//         })
//         return { status: 'success', data: user.accounts[0].provider }
//     } catch (error) {
//         console.log(error)
//         throw error
//     }
// }





export async function completeSocialLoginProfile(data: ProfileSchema):
    Promise<ActionResult<string>> {

    const session = await auth();

    if (!session?.user) return { status: 'error', error: 'User not found' };

    try {
        const user = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                profileComplete: true,
                member: {
                    create: {
                        name: session.user.name as string,
                        image: session.user.image,
                        gender: data.gender,
                        dateOfBirth: new Date(data.dateOfBirth),
                        description: data.description,
                        city: data.city,
                        country: data.country
                    }
                }
            },
            select: {
                accounts: {
                    select: {
                        provider: true
                    }
                }
            }
        })

        return { status: 'success', data: user.accounts[0].provider }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export async function getUserRole() {
    const session = await auth()
    const role = session?.user.role
    if (!role) throw new Error('not in role')
    return role
}