import axios, { AxiosResponse, AxiosError } from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface LoginRequest {
  contact: string
  method: 'email' | 'mobile'
}

export interface VerifyOTPRequest {
  contact: string
  otp: string
  method: 'email' | 'mobile'
}

export interface User {
  id: string
  email: string
  phone?: string
  name?: string
  role: string
  avatar?: string
  verified: boolean
  profile?: any
}

export interface AuthResponse {
  user: User
  token: string
}

// Token management
let authToken: string | null = null

export const setAuthToken = (token: string | null) => {
  authToken = token
  if (token) {
    localStorage.setItem('auth_token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    localStorage.removeItem('auth_token')
    delete api.defaults.headers.common['Authorization']
  }
}

export const getAuthToken = (): string | null => {
  if (authToken) return authToken
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token')
    if (token) {
      setAuthToken(token)
      return token
    }
  }
  return null
}

// Initialize token on import
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('auth_token')
  if (token) {
    setAuthToken(token)
  }
}

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      setAuthToken(null)
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// API client class
export class ApiClient {
  // Authentication endpoints
  static async login(data: LoginRequest): Promise<ApiResponse> {
    const response = await api.post('/auth/login', data)
    return response.data
  }

  static async verifyOTP(data: VerifyOTPRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await api.post('/auth/verify-otp', data)
    if (response.data.success && response.data.data?.token) {
      setAuthToken(response.data.data.token)
    }
    return response.data
  }

  static async getMe(): Promise<ApiResponse<{ user: User }>> {
    const response = await api.get('/auth/me')
    return response.data
  }

  static logout() {
    setAuthToken(null)
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
  }

  // Candidates endpoints
  static async getCandidates(params?: any): Promise<ApiResponse<any[]>> {
    const response = await api.get('/candidates', { params })
    return response.data
  }

  static async getCandidate(id: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/candidates/${id}`)
    return response.data
  }

  static async createCandidate(data: any): Promise<ApiResponse<any>> {
    const response = await api.post('/candidates', data)
    return response.data
  }

  static async updateCandidate(id: string, data: any): Promise<ApiResponse<any>> {
    const response = await api.put(`/candidates/${id}`, data)
    return response.data
  }

  static async deleteCandidate(id: string): Promise<ApiResponse> {
    const response = await api.delete(`/candidates/${id}`)
    return response.data
  }

  // Jobs endpoints
  static async getJobs(params?: any): Promise<ApiResponse<any[]>> {
    const response = await api.get('/jobs', { params })
    return response.data
  }

  static async getJob(id: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/jobs/${id}`)
    return response.data
  }

  static async createJob(data: any): Promise<ApiResponse<any>> {
    const response = await api.post('/jobs', data)
    return response.data
  }

  static async updateJob(id: string, data: any): Promise<ApiResponse<any>> {
    const response = await api.put(`/jobs/${id}`, data)
    return response.data
  }

  static async deleteJob(id: string): Promise<ApiResponse> {
    const response = await api.delete(`/jobs/${id}`)
    return response.data
  }

  // Clients endpoints
  static async getClients(params?: any): Promise<ApiResponse<any[]>> {
    const response = await api.get('/clients', { params })
    return response.data
  }

  static async getClient(id: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/clients/${id}`)
    return response.data
  }

  static async createClient(data: any): Promise<ApiResponse<any>> {
    const response = await api.post('/clients', data)
    return response.data
  }

  static async updateClient(id: string, data: any): Promise<ApiResponse<any>> {
    const response = await api.put(`/clients/${id}`, data)
    return response.data
  }

  static async deleteClient(id: string): Promise<ApiResponse> {
    const response = await api.delete(`/clients/${id}`)
    return response.data
  }

  // Vendors endpoints
  static async getVendors(params?: any): Promise<ApiResponse<any[]>> {
    const response = await api.get('/vendors', { params })
    return response.data
  }

  static async getVendor(id: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/vendors/${id}`)
    return response.data
  }

  static async createVendor(data: any): Promise<ApiResponse<any>> {
    const response = await api.post('/vendors', data)
    return response.data
  }

  static async updateVendor(id: string, data: any): Promise<ApiResponse<any>> {
    const response = await api.put(`/vendors/${id}`, data)
    return response.data
  }

  static async deleteVendor(id: string): Promise<ApiResponse> {
    const response = await api.delete(`/vendors/${id}`)
    return response.data
  }

  // Job Applications endpoints
  static async getJobApplications(params?: any): Promise<ApiResponse<any[]>> {
    const response = await api.get('/job-applications', { params })
    return response.data
  }

  static async getJobApplication(id: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/job-applications/${id}`)
    return response.data
  }

  static async applyForJob(data: any): Promise<ApiResponse<any>> {
    const response = await api.post('/job-applications', data)
    return response.data
  }

  static async updateJobApplication(id: string, data: any): Promise<ApiResponse<any>> {
    const response = await api.put(`/job-applications/${id}`, data)
    return response.data
  }

  // File upload endpoints
  static async uploadFiles(files: File[], uploadType: string = 'RESUME'): Promise<ApiResponse<any>> {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })
    formData.append('uploadType', uploadType)

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }

  // Dashboard endpoints
  static async getDashboardStats(): Promise<ApiResponse<any>> {
    const response = await api.get('/dashboard/stats')
    return response.data
  }

  // Utility methods
  static handleApiError(error: any): string {
    if (error.response?.data?.error) {
      return error.response.data.error
    }
    if (error.response?.data?.message) {
      return error.response.data.message
    }
    if (error.message) {
      return error.message
    }
    return 'An unexpected error occurred'
  }

  static async makeRequest<T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: any,
    params?: any
  ): Promise<ApiResponse<T>> {
    try {
      const config: any = { params }
      if (data) {
        config.data = data
      }

      const response = await api.request({
        method: method.toLowerCase(),
        url: endpoint,
        ...config,
      })

      return response.data
    } catch (error) {
      throw new Error(this.handleApiError(error))
    }
  }
}

export default ApiClient
