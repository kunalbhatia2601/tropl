'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: string
  verified: boolean
  recruiter?: {
    id: string
    companyName: string
    department: string
    designation: string
    experience: number
  }
}

interface RecruiterData {
  candidates: any[]
  jobs: any[]
  clients: any[]
  vendors: any[]
  applications: any[]
  interviews: any[]
}

interface AuthContextType {
  user: User | null
  token: string | null
  data: RecruiterData
  login: (userData: User, authToken: string) => void
  logout: () => void
  updateData: (type: keyof RecruiterData, newData: any[]) => void
  saveData: () => Promise<void>
  loadData: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [data, setData] = useState<RecruiterData>({
    candidates: [],
    jobs: [],
    clients: [],
    vendors: [],
    applications: [],
    interviews: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
      loadData()
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = (userData: User, authToken: string) => {
    setUser(userData)
    setToken(authToken)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', authToken)
    loadData()
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setData({
      candidates: [],
      jobs: [],
      clients: [],
      vendors: [],
      applications: [],
      interviews: [],
    })
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const updateData = (type: keyof RecruiterData, newData: any[]) => {
    setData(prev => ({
      ...prev,
      [type]: newData
    }))
    
    // Auto-save after update
    setTimeout(() => {
      saveData()
    }, 1000)
  }

  const saveData = async () => {
    if (!token) return

    try {
      const response = await fetch('/api/recruiter/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        console.error('Failed to save data')
      }
    } catch (error) {
      console.error('Error saving data:', error)
    }
  }

  const loadData = async () => {
    if (!token) {
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/recruiter/data', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setData(result.data)
        }
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    token,
    data,
    login,
    logout,
    updateData,
    saveData,
    loadData,
    isLoading,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
