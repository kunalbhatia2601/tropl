'use client';

import { useState } from 'react';
import { InterviewStatus } from '@/components/InterviewStatus';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function InterviewStatusPage() {
  // Mock data - this would come from API based on user authentication
  const [status] = useState<'incomplete' | 'scheduled' | 'completed' | 'scored'>('scheduled');
  
  const interviewData = {
    scheduledDate: '2024-01-15T14:00:00Z',
    expiryTime: '2024-01-15T16:00:00Z', // 2 hours from scheduled time
    whatsappLink: 'https://wa.me/1234567890?text=Interview%20Link',
    emailSent: true,
    score: 85,
    matchPercentage: 92
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Interview Status
          </h1>
          <p className="text-gray-600">
            Track your AI interview progress and access your results
          </p>
        </div>

        <div className="mb-6">
          <InterviewStatus 
            status={status} 
            interviewData={interviewData} 
          />
        </div>

        <div className="flex justify-center space-x-4">
          <Link href="/candidate/dashboard">
            <Button variant="outline">
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/candidate/upload-resume">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Update Resume
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}