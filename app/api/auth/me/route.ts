import { NextRequest, NextResponse } from 'next/server'
import { AuthUtils } from '@/lib/auth'
import { createApiResponse } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const token = AuthUtils.extractTokenFromRequest(request)
    
    if (!token) {
      return NextResponse.json(
        createApiResponse(false, null, '', 'No token provided'),
        { status: 401 }
      )
    }

    const payload = AuthUtils.verifyToken(token)
    
    return NextResponse.json(
      createApiResponse(true, { user: payload }, 'Token is valid')
    )
  } catch (error) {
    return NextResponse.json(
      createApiResponse(false, null, '', 'Invalid token'),
      { status: 401 }
    )
  }
}
