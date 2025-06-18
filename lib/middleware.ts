import { NextRequest, NextResponse } from 'next/server'
import { AuthUtils, JWTPayload } from '@/lib/auth'
import { createApiResponse } from '@/lib/validations'

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload
}

export function withAuth(handler: (req: AuthenticatedRequest, context?: any) => Promise<NextResponse>) {
  return async (request: NextRequest, context?: any) => {
    try {
      const token = AuthUtils.extractTokenFromRequest(request)
      
      if (!token) {
        return NextResponse.json(
          createApiResponse(false, null, '', 'Authentication required'),
          { status: 401 }
        )
      }

      const user = AuthUtils.verifyToken(token)
      
      // Add user to request object
      ;(request as AuthenticatedRequest).user = user
      
      return handler(request as AuthenticatedRequest, context)
    } catch (error) {
      return NextResponse.json(
        createApiResponse(false, null, '', 'Invalid authentication token'),
        { status: 401 }
      )
    }
  }
}

export function withRole(roles: string[], handler: (req: AuthenticatedRequest, context?: any) => Promise<NextResponse>) {
  return withAuth(async (request: AuthenticatedRequest, context?: any) => {
    const user = request.user!
    
    if (!roles.includes(user.role)) {
      return NextResponse.json(
        createApiResponse(false, null, '', 'Insufficient permissions'),
        { status: 403 }
      )
    }
    
    return handler(request, context)
  })
}
