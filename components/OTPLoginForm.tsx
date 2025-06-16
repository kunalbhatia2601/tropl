'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Mail, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface OTPLoginFormProps {
  onLogin: (data: { method: string; contact: string; otp?: string }) => void;
  isLoading?: boolean;
}

export function OTPLoginForm({ onLogin, isLoading = false }: OTPLoginFormProps) {
  const [step, setStep] = useState<'contact' | 'otp'>('contact');
  const [method, setMethod] = useState<'email' | 'mobile'>('email');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [showExistingUserAlert, setShowExistingUserAlert] = useState(false);

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock: Check if user exists
    const existingUser = contact === 'john@example.com' || contact === '+1234567890';
    
    if (existingUser) {
      setShowExistingUserAlert(true);
    } else {
      setStep('otp');
      // TODO: connect to API
      console.log('Sending OTP to:', contact, 'via', method);
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ method, contact, otp });
  };

  const handleContinueExisting = () => {
    setShowExistingUserAlert(false);
    setStep('otp');
  };

  if (step === 'otp') {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Verify OTP</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to {contact}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <Label htmlFor="otp">OTP Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="text-center text-lg tracking-widest"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
            </Button>
            
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full"
              onClick={() => setStep('contact')}
            >
              Back to Contact Info
            </Button>
            
            <p className="text-center text-sm text-gray-600">
              Didn't receive the code?{' '}
              <Button variant="link" className="p-0 h-auto text-primary">
                Resend OTP
              </Button>
            </p>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Candidate Login</CardTitle>
        <CardDescription>
          Enter your contact information to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showExistingUserAlert && (
          <Alert className="mb-4 border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              This {method} is already registered. Would you like to update your resume?
              <div className="mt-2 space-x-2">
                <Button 
                  size="sm" 
                  onClick={handleContinueExisting}
                  className="bg-primary hover:bg-primary/90"
                >
                  Continue
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setShowExistingUserAlert(false)}
                >
                  Cancel
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={method} onValueChange={(value) => setMethod(value as 'email' | 'mobile')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Mobile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="mobile">
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}