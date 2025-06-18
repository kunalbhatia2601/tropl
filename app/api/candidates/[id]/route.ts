import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware'
import { updateCandidateSchema, createApiResponse } from '@/lib/validations'

// GET /api/candidates/[id] - Get candidate by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const candidate = await prisma.candidate.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            phone: true,
            name: true,
            avatar: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        applications: {
          include: {
            job: {
              select: {
                id: true,
                title: true,
                jobCode: true,
                status: true,
                client: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
          orderBy: { appliedAt: 'desc' },
        },
        interviews: {
          include: {
            job: {
              select: {
                id: true,
                title: true,
                jobCode: true,
              },
            },
          },
          orderBy: { scheduledAt: 'desc' },
        },
        _count: {
          select: {
            applications: true,
            interviews: true,
          },
        },
      },
    })

    if (!candidate) {
      return NextResponse.json(
        createApiResponse(false, null, '', 'Candidate not found'),
        { status: 404 }
      )
    }    // Parse JSON fields safely
    const responseCandidate = {
      ...candidate,
      skills: typeof candidate.skills === 'string' ? JSON.parse(candidate.skills || '[]') : candidate.skills || [],
      education: candidate.education && typeof candidate.education === 'string' ? JSON.parse(candidate.education) : candidate.education,
      workExperience: candidate.workExperience && typeof candidate.workExperience === 'string' ? JSON.parse(candidate.workExperience) : candidate.workExperience,
    }

    return NextResponse.json(
      createApiResponse(true, responseCandidate, 'Candidate retrieved successfully')
    )
  } catch (error) {
    console.error('Get candidate error:', error)
    return NextResponse.json(
      createApiResponse(false, null, '', 'Internal server error'),
      { status: 500 }
    )
  }
}

// PUT /api/candidates/[id] - Update candidate by ID
export const PUT = withAuth(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = updateCandidateSchema.parse(body)

    // Check if candidate exists and user has permission
    const existingCandidate = await prisma.candidate.findUnique({
      where: { id },
    })

    if (!existingCandidate) {
      return NextResponse.json(
        createApiResponse(false, null, '', 'Candidate not found'),
        { status: 404 }
      )
    }

    // Check if user owns this candidate profile or is admin/recruiter
    const userRole = request.user!.role
    const isOwner = existingCandidate.userId === request.user!.userId
    const canEdit = isOwner || userRole === 'ADMIN' || userRole === 'RECRUITER'

    if (!canEdit) {
      return NextResponse.json(
        createApiResponse(false, null, '', 'Permission denied'),
        { status: 403 }
      )
    }    // Update candidate
    const candidate = await prisma.candidate.update({
      where: { id },
      data: {
        ...validatedData,
        skills: validatedData.skills || undefined,
        education: validatedData.education ? JSON.stringify(validatedData.education) : undefined,
        workExperience: validatedData.workExperience ? JSON.stringify(validatedData.workExperience) : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            phone: true,
            name: true,
            avatar: true,
          },
        },
      },
    })    // Parse JSON fields for response safely
    const responseCandidate = {
      ...candidate,
      skills: typeof candidate.skills === 'string' ? JSON.parse(candidate.skills || '[]') : candidate.skills || [],
      education: candidate.education && typeof candidate.education === 'string' ? JSON.parse(candidate.education) : candidate.education,
      workExperience: candidate.workExperience && typeof candidate.workExperience === 'string' ? JSON.parse(candidate.workExperience) : candidate.workExperience,
    }

    return NextResponse.json(
      createApiResponse(true, responseCandidate, 'Candidate updated successfully')
    )
  } catch (error) {
    console.error('Update candidate error:', error)
    return NextResponse.json(
      createApiResponse(false, null, '', 'Internal server error'),
      { status: 500 }
    )
  }
})

// DELETE /api/candidates/[id] - Delete candidate by ID
export const DELETE = withAuth(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    // Check if candidate exists
    const existingCandidate = await prisma.candidate.findUnique({
      where: { id },
    })

    if (!existingCandidate) {
      return NextResponse.json(
        createApiResponse(false, null, '', 'Candidate not found'),
        { status: 404 }
      )
    }

    // Check permissions (only admin or owner can delete)
    const userRole = request.user!.role
    const isOwner = existingCandidate.userId === request.user!.userId

    if (!isOwner && userRole !== 'ADMIN') {
      return NextResponse.json(
        createApiResponse(false, null, '', 'Permission denied'),
        { status: 403 }
      )
    }    // Delete candidate (cascade will handle related records)
    await prisma.candidate.delete({
      where: { id },
    })

    return NextResponse.json(
      createApiResponse(true, null, 'Candidate deleted successfully')
    )
  } catch (error) {
    console.error('Delete candidate error:', error)
    return NextResponse.json(
      createApiResponse(false, null, '', 'Internal server error'),
      { status: 500 }
    )
  }
})
