import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

console.log('SMTP_HOST:', process.env.SMTP_HOST)
console.log('SMTP_PORT:', process.env.SMTP_PORT)
console.log('SMTP_USER:', process.env.SMTP_USER)
console.log('SMTP_PASS:', process.env.SMTP_PASS)

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

// Verify transporter
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP Error:', error)
    } else {
        console.log('Server is ready to take messages')
    }
})

export default transporter