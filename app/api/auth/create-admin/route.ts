import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AuthUtils } from '@/lib/auth'
import { createApiResponse } from '@/lib/validations'

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@tropl.ai' }
    })

    if (existingAdmin) {
      return NextResponse.json(
        createApiResponse(false, null, '', 'Admin user already exists'),
        { status: 400 }
      )
    }

    // Hash the admin password
    const hashedPassword = await AuthUtils.hashPassword('admin123')

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@tropl.ai',
        name: 'Admin User',
        role: 'RECRUITER',
        password: hashedPassword,
        verified: true,
      },
    })

    // Create recruiter profile for admin
    const recruiterProfile = await prisma.recruiter.create({
      data: {
        userId: adminUser.id,
        companyName: 'Tropl',
        department: 'HR',
        designation: 'Admin',
        experience: 5,
      },
    })

    return NextResponse.json(
      createApiResponse(true, { 
        user: adminUser, 
        recruiter: recruiterProfile 
      }, 'Admin user created successfully'),
      { status: 201 }
    )
  } catch (error) {
    console.error('Create admin error:', error)
    return NextResponse.json(
      createApiResponse(false, null, '', 'Internal server error'),
      { status: 500 }
    )
  }
}
