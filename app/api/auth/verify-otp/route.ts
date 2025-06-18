import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AuthUtils } from '@/lib/auth'
import { verifyOTPSchema, createApiResponse } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = verifyOTPSchema.parse(body)
    const { contact, otp, method } = validatedData

    // Determine if contact is email or phone
    const isEmail = method === 'email' || contact.includes('@')

    // Find user
    const user = await prisma.user.findFirst({
      where: isEmail ? { email: contact } : { phone: contact },
      include: {
        recruiter: true,
        candidate: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        createApiResponse(false, null, '', 'User not found'),
        { status: 404 }
      )
    }

    // Verify OTP
    if (!user.otpCode || user.otpCode !== otp) {
      return NextResponse.json(
        createApiResponse(false, null, '', 'Invalid OTP'),
        { status: 400 }
      )
    }

    if (!user.otpExpiry || !AuthUtils.isOTPValid(user.otpExpiry)) {
      return NextResponse.json(
        createApiResponse(false, null, '', 'OTP has expired'),
        { status: 400 }
      )
    }

    // Update user - clear OTP and mark as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        verified: true,
        otpCode: null,
        otpExpiry: null,
        lastLogin: new Date(),
      },
    })

    // Generate JWT token
    const token = AuthUtils.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    // Prepare user data for response
    const userData = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      verified: true,
      profile: user.role === 'RECRUITER' ? user.recruiter : user.candidate,
    }

    return NextResponse.json(
      createApiResponse(true, { user: userData, token }, 'Login successful')
    )
  } catch (error) {
    console.error('OTP verification error:', error)
    return NextResponse.json(
      createApiResponse(false, null, '', 'Internal server error'),
      { status: 500 }
    )
  }
}
