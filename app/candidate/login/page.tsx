'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OTPLoginForm } from '@/components/OTPLoginForm';

export default function CandidateLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: { method: string; contact: string; otp?: string }) => {
    setIsLoading(true);
    
    // Mock authentication
    try {
      // TODO: connect to API
      console.log('Candidate login:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect based on user state
      if (data.contact === 'john@example.com' || data.contact === '+1234567890') {
        // Existing user - go to dashboard
        router.push('/candidate/dashboard');
      } else {
        // New user - go to upload resume
        router.push('/candidate/upload-resume');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to tropl.ai
          </h2>
          <p className="text-gray-600">
            Sign in to access your candidate portal and find your next opportunity
          </p>
        </div>
        
        <OTPLoginForm onLogin={handleLogin} isLoading={isLoading} />
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Are you a recruiter?{' '}
            <a href="/recruiter/login" className="text-primary hover:text-primary/80">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}