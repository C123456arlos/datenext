import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export async function sendVerificationEmail(email: string, token: string) {
    const link = `${baseUrl}/verify-email?token=${token}`
    return resend.emails.send({
        from: 'testing@resend.dev',
        to: email,
        subject: 'verify your email address',
        html: `
        <h1>verify email address</h1>
        <p>click the link to verify</p>
        <a href="${link}">verify email</a>
        `
    })
}
export async function sendPasswordResetEmail(email: string, token: string) {
    const link = `${baseUrl}/reset-password?token=${token}`
    return resend.emails.send({
        from: 'testing@resend.dev',
        to: email,
        subject: 'reset your password',
        html: `
        <h1>password reset requested</h1>
        <p>click the link below</p>
        <a href="${link}">reset password</a>
        `
    })
}


