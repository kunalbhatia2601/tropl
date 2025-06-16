'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Upload, Zap, Users, ArrowRight, Star, Brain, Target, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      quote: "tropl.ai revolutionized our hiring process. We've reduced time-to-hire by 70% while improving candidate quality significantly.",
      author: "Sarah Johnson",
      role: "VP of Talent, McKinsey & Co",
      initials: "SJ",
      color: "bg-primary/10 text-primary"
    },
    {
      quote: "The AI-powered matching is incredibly accurate. We're finding the right candidates faster than ever before.",
      author: "Michael Rodriguez",
      role: "Head of HR, Deloitte",
      initials: "MR",
      color: "bg-accent text-accent-foreground"
    },
    {
      quote: "Outstanding platform that scales with our growing needs. The ROI has been exceptional.",
      author: "Emily Chen",
      role: "Talent Director, BCG",
      initials: "EC",
      color: "bg-secondary text-secondary-foreground"
    }
  ];

  const stats = [
    { value: "95%", label: "Client Satisfaction", icon: Star },
    { value: "75%", label: "Faster Hiring", icon: TrendingUp },
    { value: "60%", label: "Reduced Turnover", icon: Target },
    { value: "10K+", label: "Successful Hires", icon: Award }
  ];

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Enhanced Hero Section with Animations */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-600/10 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center justify-center mb-6">
              <Brain className="h-16 w-16 text-orange-600 animate-pulse" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Streamlining Smart Hiring with{' '}
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent animate-pulse">
                AI
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionary AI-powered recruitment platform designed for consulting excellence. 
              Transform your hiring process with intelligent resume parsing, automated interviews, and precision job matching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/candidate/login">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Find Your Next Role
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/recruiter/login">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white !text-white font-semibold hover:!bg-white hover:!text-gray-900 px-8 py-4 text-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300 !bg-transparent"
                >
                  Start Recruiting
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <div className="w-4 h-4 bg-orange-600/60 rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float animation-delay-1000">
          <div className="w-6 h-6 bg-orange-500/60 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float animation-delay-2000">
          <div className="w-3 h-3 bg-orange-600/40 rounded-full opacity-60"></div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="py-16 px-4 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center transform transition-all duration-1000 delay-${index * 200} ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-accent/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Intelligent Hiring Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Leverage cutting-edge AI technology to streamline every aspect of your recruitment process
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Upload,
                title: "Smart Resume Parsing",
                description: "Advanced AI extracts and analyzes key information from resumes, automatically identifying skills, experience, and qualifications with precision.",
                color: "from-primary to-primary/80"
              },
              {
                icon: Zap,
                title: "AI-Powered Interviews",
                description: "Automated video interviews with intelligent scoring. Our AI evaluates responses, communication skills, and cultural fit for comprehensive assessment.",
                color: "from-primary to-primary/80"
              },
              {
                icon: Users,
                title: "Precision Job Matching",
                description: "Machine learning algorithms match candidates to opportunities based on skills, experience, salary expectations, and cultural alignment.",
                color: "from-primary to-primary/80"
              }
            ].map((feature, index) => (
              <Card 
                key={index}
                className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group ${
                  isVisible ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-8">
                Why Choose tropl.ai?
              </h2>
              <div className="space-y-8">
                {[
                  {
                    title: "Enterprise-Grade Security",
                    description: "Bank-level encryption and compliance with industry standards to protect sensitive candidate and company data."
                  },
                  {
                    title: "Reduced Time-to-Hire",
                    description: "Accelerate your recruitment process by up to 75% with automated screening and intelligent candidate ranking."
                  },
                  {
                    title: "Higher Quality Hires",
                    description: "AI-driven insights lead to better hiring decisions and improved candidate-role fit, reducing turnover by 60%."
                  },
                  {
                    title: "Seamless Integration",
                    description: "Easy integration with existing HR systems and workflows, ensuring smooth adoption across your organization."
                  }
                ].map((benefit, index) => (
                  <div 
                    key={index}
                    className={`flex items-start space-x-4 transform transition-all duration-700 delay-${index * 100} ${
                      isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                    }`}
                  >
                    <CheckCircle className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-xl">{benefit.title}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:text-center">
              <div className="bg-gradient-to-br from-accent/20 to-primary/10 p-8 rounded-2xl shadow-2xl">
                <div className="text-center">
                  <div className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                    95%
                  </div>
                  <div className="text-gray-600 mb-8 text-xl">Client Satisfaction Rate</div>
                </div>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="bg-white p-4 rounded-xl shadow-lg">
                    <div className="text-3xl font-bold text-gray-900">75%</div>
                    <div className="text-sm text-gray-600">Faster Hiring</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-lg">
                    <div className="text-3xl font-bold text-gray-900">60%</div>
                    <div className="text-sm text-gray-600">Reduced Turnover</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-lg">
                    <div className="text-3xl font-bold text-gray-900">10K+</div>
                    <div className="text-sm text-gray-600">Successful Hires</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-lg">
                    <div className="text-3xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Enterprise Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section with Carousel */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-300">
              See what our clients say about transforming their hiring process
            </p>
          </div>
          
          <div className="relative">
            <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-lg">
              <CardContent className="pt-8 pb-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-white text-xl mb-8 italic leading-relaxed">
                    "{testimonials[currentTestimonial].quote}"
                  </p>
                  <div className="flex items-center justify-center">
                    <div className={`w-16 h-16 ${testimonials[currentTestimonial].color} rounded-full flex items-center justify-center mr-4 shadow-lg`}>
                      <span className="font-bold text-lg">{testimonials[currentTestimonial].initials}</span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white text-lg">{testimonials[currentTestimonial].author}</div>
                      <div className="text-gray-300">{testimonials[currentTestimonial].role}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-600/20 to-orange-500/20"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of leading companies using tropl.ai to build exceptional teams faster and more efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/candidate/login">
              <Button 
                size="lg" 
                className="bg-white text-orange-700 font-semibold hover:bg-gray-100 hover:text-orange-800 px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started as Candidate
              </Button>
            </Link>
            <Link href="/recruiter/login">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white !text-white font-semibold hover:!bg-white hover:!text-orange-700 px-8 py-4 text-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300 !bg-transparent"
              >
                Start Recruiting
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}