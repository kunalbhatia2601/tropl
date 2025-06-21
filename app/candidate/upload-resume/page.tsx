'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ResumeUpload } from '@/components/ResumeUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, MapPin, DollarSign, Briefcase } from 'lucide-react';

interface ProfileData {
  fullName: string;
  phone: string;
  location: string;
  experience: string;
  expectedSalary: string;
  skills: string;
  summary: string;
}

export default function UploadResumePage() {
  const [step, setStep] = useState<'upload' | 'profile'>('upload');
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    phone: '',
    location: '',
    experience: '',
    expectedSalary: '',
    skills: '',
    summary: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const handleUploadComplete = (files: any[]) => {
    setUploadedFiles(files);
    
    // Pre-populate profile data with extracted information
    if (files.length > 0 && files[0].extractedData) {
      const extracted = files[0].extractedData;
      setProfileData(prev => ({
        ...prev,
        fullName: extracted.name || prev.fullName,
        phone: extracted.phone || prev.phone,
        location: extracted.contactDetails?.address || prev.location,
        skills: extracted.skills?.join(', ') || prev.skills,
        summary: extracted.summary || prev.summary
      }));
    }
    
    setStep('profile');
  };

  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: connect to API
      console.log('Submitting profile:', { profileData, uploadedFiles });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to interview status
      router.push('/candidate/interview-status');
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Profile
          </h1>
          <p className="text-gray-600">
            Upload your resume and fill in any missing information to get started
          </p>
        </div>

        {step === 'upload' && (
          <ResumeUpload 
            onUploadComplete={handleUploadComplete}
            maxFiles={1}
          />
        )}

        {step === 'profile' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Complete Your Profile</span>
              </CardTitle>
              <CardDescription>
                Fill in any missing information from your resume to improve AI matching
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name*</Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => handleProfileChange('fullName', e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number*</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location" className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>Location*</span>
                    </Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleProfileChange('location', e.target.value)}
                      placeholder="New York, NY"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="experience" className="flex items-center space-x-1">
                      <Briefcase className="h-4 w-4" />
                      <span>Experience Level*</span>
                    </Label>
                    <Select onValueChange={(value) => handleProfileChange('experience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                        <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                        <SelectItem value="executive">Executive (10+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="expectedSalary" className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4" />
                    <span>Expected Salary Range</span>
                  </Label>
                  <Input
                    id="expectedSalary"
                    value={profileData.expectedSalary}
                    onChange={(e) => handleProfileChange('expectedSalary', e.target.value)}
                    placeholder="e.g., $80,000 - $120,000"
                  />
                </div>

                <div>
                  <Label htmlFor="skills">Key Skills & Technologies</Label>
                  <Textarea
                    id="skills"
                    value={profileData.skills}
                    onChange={(e) => handleProfileChange('skills', e.target.value)}
                    placeholder="e.g., JavaScript, React, Project Management, Data Analysis..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    value={profileData.summary}
                    onChange={(e) => handleProfileChange('summary', e.target.value)}
                    placeholder="Brief summary of your background and career objectives..."
                    rows={4}
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setStep('upload')}
                    className="flex-1"
                  >
                    Back to Upload
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    disabled={isSubmitting || !profileData.fullName || !profileData.phone || !profileData.location || !profileData.experience}
                  >
                    {isSubmitting ? 'Processing...' : 'Complete Profile & Continue'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}