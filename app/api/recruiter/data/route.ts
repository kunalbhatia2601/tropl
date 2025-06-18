import { NextRequest, NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware'
import { createApiResponse } from '@/lib/validations'

// Simple in-memory storage for demo (replace with database later)
const recruiterData: Record<string, any> = {}

// GET - Retrieve recruiter's data
export const GET = withAuth(async (request: AuthenticatedRequest) => {
  try {
    const userId = request.user!.userId
    const data = recruiterData[userId] || {
      candidates: [],
      jobs: [],
      clients: [],
      vendors: [],
      applications: [],
      interviews: [],
    }

    return NextResponse.json(
      createApiResponse(true, data, 'Data retrieved successfully')
    )
  } catch (error) {
    console.error('Get data error:', error)
    return NextResponse.json(
      createApiResponse(false, null, '', 'Internal server error'),
      { status: 500 }
    )
  }
})

// POST - Save recruiter's data
export const POST = withAuth(async (request: AuthenticatedRequest) => {
  try {
    const userId = request.user!.userId
    const body = await request.json()
    
    // Initialize user data if it doesn't exist
    if (!recruiterData[userId]) {
      recruiterData[userId] = {
        candidates: [],
        jobs: [],
        clients: [],
        vendors: [],
        applications: [],
        interviews: [],
      }
    }

    // Update the specific data type
    if (body.type && body.data) {
      recruiterData[userId][body.type] = body.data
    } else {
      // Update entire data structure
      recruiterData[userId] = { ...recruiterData[userId], ...body }
    }

    return NextResponse.json(
      createApiResponse(true, recruiterData[userId], 'Data saved successfully')
    )
  } catch (error) {
    console.error('Save data error:', error)
    return NextResponse.json(
      createApiResponse(false, null, '', 'Internal server error'),
      { status: 500 }
    )
  }
})
