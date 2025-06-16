import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Users, Target, Award, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About tropl.ai
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing the recruitment industry with cutting-edge AI technology, 
            designed specifically for consulting excellence and enterprise-grade hiring solutions.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed text-center">
                To transform the hiring process through intelligent automation, enabling organizations 
                to identify and secure top talent faster and more accurately than ever before.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <Brain className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed text-center">
                To become the global standard for AI-powered recruitment, where every hiring decision 
                is data-driven, bias-free, and optimized for long-term success.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Company Story */}
        <div className="mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Our Story</CardTitle>
              <CardDescription className="text-lg">
                Founded by recruitment and AI experts from leading consulting firms
              </CardDescription>
            </CardHeader>
            <CardContent className="max-w-4xl mx-auto">
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  tropl.ai was born from the frustration of traditional recruitment processes in the consulting industry. 
                  Our founders, having worked at top-tier consulting firms like McKinsey, BCG, and Bain, witnessed 
                  firsthand how inefficient and biased traditional hiring could be.
                </p>
                <p>
                  In 2023, we assembled a team of AI researchers, recruitment specialists, and enterprise software 
                  engineers to build a platform that would fundamentally change how organizations identify, assess, 
                  and hire talent. Our focus on consulting-grade excellence means every feature is designed with 
                  precision, scalability, and enterprise security in mind.
                </p>
                <p>
                  Today, tropl.ai serves hundreds of organizations worldwide, from boutique consulting firms to 
                  Fortune 500 companies, helping them build exceptional teams through the power of artificial intelligence.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md text-center">
              <CardContent className="pt-6">
                <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Excellence</h3>
                <p className="text-sm text-gray-600">
                  We strive for perfection in every algorithm, every interface, and every client interaction.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md text-center">
              <CardContent className="pt-6">
                <Users className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Fairness</h3>
                <p className="text-sm text-gray-600">
                  Our AI is designed to eliminate bias and promote diversity in hiring decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md text-center">
              <CardContent className="pt-6">
                <Brain className="h-10 w-10 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-sm text-gray-600">
                  We continuously push the boundaries of what's possible with AI and machine learning.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md text-center">
              <CardContent className="pt-6">
                <Award className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Integrity</h3>
                <p className="text-sm text-gray-600">
                  We maintain the highest standards of data security and ethical AI practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-lg text-gray-600">Experienced leaders from consulting and technology</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">AS</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Alex Smith</h3>
                <p className="text-blue-600 font-medium mb-2">CEO & Co-Founder</p>
                <p className="text-sm text-gray-600">
                  Former McKinsey Partner with 15+ years in strategy consulting and digital transformation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">MJ</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Maria Johnson</h3>
                <p className="text-green-600 font-medium mb-2">CTO & Co-Founder</p>
                <p className="text-sm text-gray-600">
                  AI researcher from Stanford with expertise in machine learning and natural language processing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">DL</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">David Lee</h3>
                <p className="text-purple-600 font-medium mb-2">VP of Product</p>
                <p className="text-sm text-gray-600">
                  Former BCG Principal and product leader with deep expertise in HR technology and user experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <Card className="border-0 shadow-lg bg-primary text-white">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Hiring?</h2>
              <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                Join hundreds of leading organizations using tropl.ai to build exceptional teams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition-colors"
                >
                  Contact Sales
                </a>
                <a 
                  href="/candidate/login" 
                  className="border border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-md font-medium transition-colors"
                >
                  Get Started
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}