import { NextRequest, NextResponse } from 'next/server'
import { AuthUtils } from '@/lib/auth'
import { createApiResponse } from '@/lib/validations'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)
    const { email, password } = validatedData

    // Hardcoded admin user for now (replace with database lookup later)
    const adminUser = {
      id: 'admin-user-id',
      email: 'admin@tropl.ai',
      password: 'admin123', // In production, this should be hashed
      name: 'Admin User',
      role: 'RECRUITER',
      verified: true,
      recruiter: {
        id: 'admin-recruiter-id',
        companyName: 'Tropl',
        department: 'HR',
        designation: 'Admin',
        experience: 5,
      }
    }

    // Check credentials
    if (email !== adminUser.email || password !== adminUser.password) {
      return NextResponse.json(
        createApiResponse(false, null, '', 'Invalid email or password'),
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = AuthUtils.generateToken({
      userId: adminUser.id,
      email: adminUser.email,
      role: adminUser.role,
    })

    // Prepare user data for response (exclude password)
    const userData = {
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
      verified: adminUser.verified,
      recruiter: adminUser.recruiter,
    }

    return NextResponse.json(
      createApiResponse(true, { user: userData, token }, 'Login successful')
    )
  } catch (error) {
    console.error('Recruiter login error:', error)
    return NextResponse.json(
      createApiResponse(false, null, '', 'Internal server error'),
      { status: 500 }
    )
  }
}
