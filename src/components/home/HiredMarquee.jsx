import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Building2,
  MapPin,
  IndianRupee,
  Calendar,
  CheckCircle,
  Star,
  TrendingUp,
  Award,
  ArrowRight
} from 'lucide-react';
import { InteractiveHoverButton } from '../ui/interactive-hover-button';
import { Badge } from '../ui/badge';

// Data arrays for marquee cards
const names = [
  'Arjun', 'Rohan', 'Vikram', 'Aman', 'Rahul', 'Karan', 'Siddharth', 'Aniket',
];
const jobs = [
  'Software Engineer', 'Product Manager', 'Data Analyst', 'UX Designer',
  'DevOps Engineer', 'QA Tester', 'Full Stack Developer', 'Data Scientist',
];
const salaries = [
  '50,000', '60,000', '45,000', '70,000',
  '55,000', '65,000', '58,000', '62,000',
];
const hotels = [
  'Taj Mahal Palace', 'The Oberoi', 'Leela Palace', 'JW Marriott',
  'ITC Grand Chola', 'Hyatt Regency', 'Radisson Blu', 'Novotel',
];
const locations = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai',
  'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad',
];
const experience = [
  '2 years', '3 years', '1 year', '4 years',
  '2.5 years', '3.5 years', '2 years', '3 years',
];

export default function HiredMarquee() {
  const navigate = useNavigate();

  // Combine data arrays into card objects
  const cards = names.map((name, i) => ({
    name,
    job: jobs[i],
    salary: salaries[i],
    company: hotels[i],
    location: locations[i],
    experience: experience[i],
    rating: Math.floor(Math.random() * 2) + 4, // Random rating between 4-5
  }));

  // Duplicate for seamless loop
  const looped = [...cards, ...cards];

  return (
    <div className="w-full overflow-hidden py-16 ">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <TrendingUp className="h-8 w-8 text-green-600" />
          Recent Success Stories
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See how our platform has helped professionals land their dream jobs at top companies
        </p>
      </div>

      {/* Top row: scroll left */}
      <div className="relative mb-8">
        <div className="flex animate-scroll-left hover:[animation-play-state:paused]">
          {looped.map((c, idx) => (
            <Card key={idx} className="flex-shrink-0 mx-4 w-72 hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 hover:border-green-200">
              <CardHeader className="pb-3">
                {/* Header with rating */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(c.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    {[...Array(5 - c.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 " />
                    ))}
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>

                {/* Name and job title */}
                <CardTitle className="text-lg font-semibold ">{c.name}</CardTitle>
                <CardDescription className="text-base font-medium ">{c.job}</CardDescription>

                {/* Company with icon */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
                  <Building2 className="w-4 h-4" />
                  <span className="font-medium">{c.company}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Location */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{c.location}</span>
                </div>

                {/* Experience */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{c.experience} experience</span>
                </div>

                {/* Salary with icon */}
                <div className="flex items-center space-x-2 text-lg font-bold text-green-600 bg-green-50 rounded-lg p-2">
                  <IndianRupee className="w-5 h-5" />
                  <span>{c.salary}/month</span>
                </div>
              </CardContent>

              <CardFooter className="pt-3 border-t border-gray-100">
                <div className='flex flex-col items-center justify-between gap-2 w-full'>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Successfully Hired</span>
                </div>
                <div>
                  <Badge>
                    via Skill Match
                  </Badge>  
                </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        {/* Edge fade overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>

      {/* Bottom row: scroll right */}
      <div className="relative">
        <div className="flex animate-scroll-right hover:[animation-play-state:paused]">
          {looped.map((c, idx) => (
            <Card key={idx} className="flex-shrink-0 mx-4 w-72 hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 hover:border-blue-200">
              <CardHeader className="pb-3">
                {/* Header with rating */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(c.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    {[...Array(5 - c.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 " />
                    ))}
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>

                {/* Name and job title */}
                <CardTitle className="text-lg font-semibold ">{c.name}</CardTitle>
                <CardDescription className="text-base font-medium ">{c.job}</CardDescription>

                {/* Company with icon */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
                  <Building2 className="w-4 h-4" />
                  <span className="font-medium">{c.company}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Location */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{c.location}</span>
                </div>

                {/* Experience */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{c.experience} experience</span>
                </div>

                {/* Salary with icon */}
                <div className="flex items-center space-x-2 text-lg font-bold text-green-600 bg-green-50 rounded-lg p-2">
                  <IndianRupee className="w-5 h-5" />
                  <span>{c.salary}/month</span>
                </div>
              </CardContent>

              <CardFooter className="pt-3 border-t border-gray-100">
                <div className='flex flex-col items-center justify-between gap-2 w-full'>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Successfully Hired</span>
                </div>
                <div>
                  <Badge>
                    via Skill Match
                  </Badge>  
                </div>
                </div>
                    
                
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">Join thousands of professionals who found their dream jobs</p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span>98% success rate • 10,000+ placements</span>
        </div>

        {/* Explore Jobs Button */}
        <InteractiveHoverButton
          onClick={() => navigate('/explore-jobs')}
        >
          <span>Explore Jobs</span>
        </InteractiveHoverButton>
      </div>
    </div>
  );
}