import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withRole, AuthenticatedRequest } from '@/lib/middleware'
import { createVendorSchema, listQuerySchema, createApiResponse } from '@/lib/validations'

// GET /api/vendors - List all vendors
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryParams = Object.fromEntries(searchParams)
    const { page, limit, sortBy, sortOrder, query, filters } = listQuerySchema.parse(queryParams)

    const where: any = {}
    
    // Add search functionality
    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { contactPerson: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
      ]
    }    // Add filters
    if (filters) {
      if (filters.status) {
        where.status = filters.status
      }
      if (filters.specialization) {
        where.specialization = { has: filters.specialization }
      }
      if (filters.minRating) {
        where.rating = { gte: parseFloat(filters.minRating) }
      }
    }

    const orderBy: any = {}
    if (sortBy) {
      orderBy[sortBy] = sortOrder
    } else {
      orderBy.name = 'asc'
    }

    const skip = (page - 1) * limit

    const [vendors, total] = await Promise.all([
      prisma.vendor.findMany({
        where,
        include: {
          _count: {
            select: {
              jobs: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy,
      }),
      prisma.vendor.count({ where }),
    ])    // Parse JSON fields safely
    const responseVendors = vendors.map(vendor => ({
      ...vendor,
      specialization: typeof vendor.specialization === 'string' ? JSON.parse(vendor.specialization || '[]') : vendor.specialization || [],
    }))

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json(
      createApiResponse(
        true,
        responseVendors,
        'Vendors retrieved successfully',
        undefined,
        { page, limit, total, totalPages }
      )
    )
  } catch (error) {
    console.error('Get vendors error:', error)
    return NextResponse.json(
      createApiResponse(false, null, '', 'Internal server error'),
      { status: 500 }
    )
  }
}

// POST /api/vendors - Create a new vendor (Recruiters and Admins only)
export const POST = withRole(['RECRUITER', 'ADMIN'], async (request: AuthenticatedRequest) => {
  try {
    const body = await request.json()
    const validatedData = createVendorSchema.parse(body)

    // Check if vendor with this email already exists
    const existingVendor = await prisma.vendor.findUnique({
      where: { email: validatedData.email },
    })

    if (existingVendor) {
      return NextResponse.json(
        createApiResponse(false, null, '', 'Vendor with this email already exists'),
        { status: 400 }
      )
    }    // Create vendor
    const vendor = await prisma.vendor.create({
      data: {
        ...validatedData,
        specialization: validatedData.specialization,
      },
      include: {
        _count: {
          select: {
            jobs: true,
          },
        },
      },
    })

    return NextResponse.json(
      createApiResponse(true, vendor, 'Vendor created successfully'),
      { status: 201 }
    )
  } catch (error) {
    console.error('Create vendor error:', error)
    return NextResponse.json(
      createApiResponse(false, null, '', 'Internal server error'),
      { status: 500 }
    )
  }
})
