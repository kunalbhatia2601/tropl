import Link from 'next/link';
import { Brain, Linkedin, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">
                tropl<span className="text-primary">.ai</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Transforming recruitment with intelligent AI solutions. Designed for consulting excellence 
              and built to scale with your organization's growth.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/candidate/login" className="text-gray-400 hover:text-white transition-colors inline-block">
                  For Candidates
                </Link>
              </li>
              <li>
                <Link href="/recruiter/login" className="text-gray-400 hover:text-white transition-colors inline-block">
                  For Recruiters
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors inline-block">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} tropl.ai. All rights reserved. Powered by AI, designed for excellence.</p>
        </div>
      </div>
    </footer>
  );
}
