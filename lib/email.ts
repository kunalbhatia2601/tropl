import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export class EmailService {
  static async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      })
      return true
    } catch (error) {
      console.error('Email sending failed:', error)
      return false
    }
  }

  static async sendOTPEmail(email: string, otp: string, name?: string): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; text-align: center;">Verify Your Account</h2>
        <p>Hello ${name || 'User'},</p>
        <p>Your One-Time Password (OTP) for login is:</p>
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
        </div>
        <p>This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
        <p>If you didn't request this OTP, please ignore this email.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          This is an automated email. Please do not reply to this email.
        </p>
      </div>
    `

    return this.sendEmail({
      to: email,
      subject: 'Login OTP - Recruitment Platform',
      html,
      text: `Your OTP for login is: ${otp}. This OTP is valid for 10 minutes.`
    })
  }

  static async sendWelcomeEmail(email: string, name: string, role: string): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; text-align: center;">Welcome to Our Recruitment Platform!</h2>
        <p>Hello ${name},</p>
        <p>Welcome to our recruitment platform! Your account has been successfully created with the role of <strong>${role}</strong>.</p>
        <p>You can now login to your account and start exploring the platform.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            Login to Platform
          </a>
        </div>
        <p>If you have any questions, feel free to contact our support team.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          This is an automated email. Please do not reply to this email.
        </p>
      </div>
    `

    return this.sendEmail({
      to: email,
      subject: 'Welcome to Recruitment Platform',
      html,
      text: `Welcome ${name}! Your account has been created successfully as a ${role}.`
    })
  }
}
