import React from 'react';
import { 
  FileText, 
  Shield, 
  BookOpen, 
  HelpCircle, 
  Users, 
  Mail, 
  Phone, 
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Github
} from 'lucide-react';

function Footer() {
  return (
    <div className="bg-accent rounded-t-3xl p-6 md:p-12">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Logo and Description Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                <rect width="32" height="32" rx="6" fill="#000"/>
                <path d="M8 16L16 8L24 16L16 24L8 16Z" fill="#fff"/>
              </svg>
              <span className="text-2xl font-bold">Skill Match</span>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Skill Match is a platform that helps you find the right job faster — it's quick and free! 
              Connect with employers and discover opportunities that match your skills.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@skillmatch.com</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 2339292971</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>A40 Apartment, 52 street, Downtown, UK</span>
              </div>
            </div>
          </div>

          {/* Legal Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Legal
            </h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <FileText className="h-4 w-4 mr-2" />
                Terms of Service
              </a>
              <a href="#" className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <Shield className="h-4 w-4 mr-2" />
                Privacy Policy
              </a>
              <a href="#" className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <BookOpen className="h-4 w-4 mr-2" />
                License Agreement
              </a>
            </div>
          </div>

          {/* About Us Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              About Us
            </h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQ
              </a>
              <a href="#" className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <Users className="h-4 w-4 mr-2" />
                Our Team
              </a>
              <a href="#" className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <BookOpen className="h-4 w-4 mr-2" />
                Blog
              </a>
              <a href="#" className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                Contact Us
              </a>
              <a href="#" className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <FileText className="h-4 w-4 mr-2" />
                Press Kit
              </a>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <p className="text-sm text-gray-600 mb-4">
              Stay connected with us on social media for the latest job opportunities and updates.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              © 2024 Skill Match. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Accessibility
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;