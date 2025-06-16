'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, Video, Star, Share2, Camera } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface InterviewStatusProps {
  status: 'incomplete' | 'scheduled' | 'completed' | 'scored';
  interviewData?: {
    scheduledDate?: string;
    expiryTime?: string;
    whatsappLink?: string;
    emailSent?: boolean;
    score?: number;
    matchPercentage?: number;
  };
}

export function InterviewStatus({ status, interviewData }: InterviewStatusProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [showWebcam, setShowWebcam] = useState(false);

  useEffect(() => {
    if (interviewData?.expiryTime) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const expiry = new Date(interviewData.expiryTime!).getTime();
        const difference = expiry - now;

        if (difference > 0) {
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          
          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeRemaining('Expired');
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [interviewData?.expiryTime]);

  const getStatusColor = () => {
    switch (status) {
      case 'incomplete': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-primary/10 text-primary';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scored': return 'bg-accent text-accent-foreground';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'incomplete': return 'Not Started';
      case 'scheduled': return 'Scheduled';
      case 'completed': return 'Completed';
      case 'scored': return 'Scored';
      default: return 'Unknown';
    }
  };

  const handleWebcamCapture = () => {
    setShowWebcam(true);
    // TODO: implement webcam capture
    console.log('Webcam capture initiated');
  };

  const handleStartInterview = () => {
    // TODO: connect to interview API
    console.log('Starting interview...');
  };

  const shareWhatsApp = () => {
    if (interviewData?.whatsappLink) {
      window.open(interviewData.whatsappLink, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Video className="h-5 w-5" />
              <span>Interview Status</span>
            </CardTitle>
            <Badge className={getStatusColor()}>
              {getStatusText()}
            </Badge>
          </div>
          <CardDescription>
            Track your AI interview progress and access your interview link
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {status === 'incomplete' && (
            <Alert>
              <Calendar className="h-4 w-4" />
              <AlertDescription>
                Complete your profile to schedule your AI interview. This typically takes 5-10 minutes.
              </AlertDescription>
            </Alert>
          )}

          {status === 'scheduled' && interviewData && (
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-primary">Interview Scheduled</h3>
                  {timeRemaining && (
                    <div className="flex items-center space-x-2 text-primary/80">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">Expires in: {timeRemaining}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary/80">Interview Link:</span>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="bg-primary hover:bg-primary/90"
                        onClick={handleStartInterview}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Start Interview
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={shareWhatsApp}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {interviewData.emailSent && (
                    <p className="text-xs text-primary/80">
                      ✓ Interview link sent to your email
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Before you start:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Ensure you have a stable internet connection</li>
                  <li>• Find a quiet, well-lit environment</li>
                  <li>• Allow camera and microphone permissions</li>
                  <li>• Have your ID ready for verification</li>
                </ul>
                
                <Button 
                  className="mt-3 w-full" 
                  variant="outline"
                  onClick={handleWebcamCapture}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Test Camera & Start Interview
                </Button>
              </div>
            </div>
          )}

          {status === 'completed' && (
            <Alert className="border-green-200 bg-green-50">
              <Video className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Interview completed successfully! Our AI is analyzing your responses. 
                Results will be available within 24 hours.
              </AlertDescription>
            </Alert>
          )}

          {status === 'scored' && interviewData && (
            <div className="space-y-4">
              <Alert className="border-accent bg-accent text-accent-foreground">
                <Star className="h-4 w-4 text-accent-foreground" />
                <AlertDescription className="text-accent-foreground">
                  Your AI interview has been scored and is ready for review!
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">AI Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {interviewData.score}/100
                      </div>
                      <Progress value={interviewData.score} className="mb-2" />
                      <p className="text-sm text-gray-600">
                        {interviewData.score && interviewData.score >= 80 ? 'Excellent' : 
                         interviewData.score && interviewData.score >= 60 ? 'Good' : 'Needs Improvement'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Job Match</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {interviewData.matchPercentage}%
                      </div>
                      <Progress value={interviewData.matchPercentage} className="mb-2" />
                      <p className="text-sm text-gray-600">
                        {interviewData.matchPercentage && interviewData.matchPercentage >= 80 ? 'High Match' : 
                         interviewData.matchPercentage && interviewData.matchPercentage >= 60 ? 'Moderate Match' : 'Low Match'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Detailed Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-green-700">Strengths:</h4>
                      <p className="text-sm text-gray-600">
                        • Strong communication skills and technical knowledge
                        • Excellent problem-solving approach
                        • Good cultural fit for consulting environment
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-700">Areas for Improvement:</h4>
                      <p className="text-sm text-gray-600">
                        • Consider expanding experience with project management tools
                        • Strengthen presentation skills for client-facing roles
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}