import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth, withRole, AuthenticatedRequest } from '@/lib/middleware'
import { createJobSchema, listQuerySchema, createApiResponse } from '@/lib/validations'

// GET /api/jobs - List all jobs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryParams = Object.fromEntries(searchParams)
    const { page, limit, sortBy, sortOrder, query, filters } = listQuerySchema.parse(queryParams)

    const where: any = {}
    
    // Add search functionality
    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { jobCode: { contains: query, mode: 'insensitive' } },
        { location: { contains: query, mode: 'insensitive' } },
        { client: { name: { contains: query, mode: 'insensitive' } } },
      ]
    }

    // Add filters
    if (filters) {
      if (filters.status) {
        where.status = filters.status
      }
      if (filters.jobType) {
        where.jobType = filters.jobType
      }
      if (filters.experienceLevel) {
        where.experienceLevel = filters.experienceLevel
      }
      if (filters.clientId) {
        where.clientId = filters.clientId
      }
      if (filters.recruiterId) {
        where.recruiterId = filters.recruiterId
      }
      if (filters.minSalary) {
        where.minSalary = { gte: parseFloat(filters.minSalary) }
      }
      if (filters.maxSalary) {
        where.maxSalary = { lte: parseFloat(filters.maxSalary) }
      }
    }

    const orderBy: any = {}
    if (sortBy) {
      orderBy[sortBy] = sortOrder
    } else {
      orderBy.createdAt = 'desc'
    }

    const skip = (page - 1) * limit

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        include: {
          client: {
            select: {
              id: true,
              name: true,
              contactPerson: true,
            },
          },
          vendor: {
            select: {
              id: true,
              name: true,
            },
          },
          recruiter: {
            select: {
              id: true,
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
          _count: {
            select: {
              applications: true,
              interviews: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy,
      }),
      prisma.job.count({ where }),
    ])    // Parse JSON fields
    const responseJobs = jobs.map(job => ({
      ...job,
    }))

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json(
      createApiResponse(
        true,
        responseJobs,
        'Jobs retrieved successfully',
        undefined,
        { page, limit, total, totalPages }
      )
    )
  } catch (error) {
    console.error('Get jobs error:', error)
    return NextResponse.json(
      createApiResponse(false, null, '', 'Internal server error'),
      { status: 500 }
    )
  }
}

// POST /api/jobs - Create a new job (Recruiters and Admins only)
export const POST = withRole(['RECRUITER', 'ADMIN'], async (request: AuthenticatedRequest) => {
  try {
    const body = await request.json()
    const validatedData = createJobSchema.parse(body)

    // Generate unique job code
    const jobCodePrefix = 'JOB'
    const latestJob = await prisma.job.findFirst({
      where: {
        jobCode: {
          startsWith: jobCodePrefix,
        },
      },
      orderBy: {
        jobCode: 'desc',
      },
    })

    let jobNumber = 1
    if (latestJob) {
      const match = latestJob.jobCode.match(/JOB-(\d+)/)
      if (match) {
        jobNumber = parseInt(match[1]) + 1
      }
    }

    const jobCode = `${jobCodePrefix}-${jobNumber.toString().padStart(3, '0')}`    // Create job
    const job = await prisma.job.create({
      data: {
        ...validatedData,
        jobCode,
        recruiterId: request.user!.userId,
        requirements: validatedData.requirements,
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            contactPerson: true,
          },
        },
        vendor: {
          select: {
            id: true,
            name: true,
          },
        },
        recruiter: {
          select: {
            id: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(
      createApiResponse(true, job, 'Job created successfully'),
      { status: 201 }
    )
  } catch (error) {
    console.error('Create job error:', error)
    return NextResponse.json(
      createApiResponse(false, null, '', 'Internal server error'),
      { status: 500 }
    )
  }
})
