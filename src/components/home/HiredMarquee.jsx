
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Building2 } from 'lucide-react';

// Data arrays for marquee cards
const names = [
  'Arjun', 'Rohan', 'Vikram', 'Aman', 'Rahul', 'Karan', 'Siddharth', 'Aniket',
];
const jobs = [
  'Software Engineer', 'Product Manager', 'Data Analyst', 'UX Designer',
  'DevOps Engineer', 'QA Tester', 'Full Stack Developer', 'Data Scientist',
];
const salaries = [
  '₹50,000', '₹60,000', '₹45,000', '₹70,000',
  '₹55,000', '₹65,000', '₹58,000', '₹62,000',
];
const hotels = [
  'Taj Mahal Palace', 'The Oberoi', 'Leela Palace', 'JW Marriott',
  'ITC Grand Chola', 'Hyatt Regency', 'Radisson Blu', 'Novotel',
];

export default function HiredMarquee() {
  // Combine data arrays into card objects
  const cards = names.map((name, i) => ({
    name,
    job: jobs[i],
    salary: salaries[i],
    company: hotels[i],
  }));

  // Duplicate for seamless loop
  const looped = [...cards, ...cards];

  return (
    <div className="w-full overflow-hidden py-12 ">
      {/* Top row: scroll left */}
      <div className="relative mb-8">
        <div className="flex animate-scroll-left hover:[animation-play-state:paused]">
          {looped.map((c, idx) => (
            <Card key={idx} className="flex-shrink-0 mx-4 w-60 hover:scale-105 transition-transform duration-300">
              <CardHeader>
                {/* Display name */}
                <CardTitle>{c.name}</CardTitle>
                {/* Display job title */}
                <CardDescription>{c.job}</CardDescription>
                {/* Hotel with icon */}
                <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <Building2 className="w-4 h-4" />
                  <span>at {c.company}</span>
                </div>
              </CardHeader>
              <CardContent>
                {/* Display salary */}
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">{c.salary}</p>
              </CardContent>
              <CardFooter>
                {/* Hired tag */}
                <p className="text-sm text-gray-600 dark:text-gray-300">hired</p>
              </CardFooter>
            </Card>
          ))}
        </div>
        {/* Edge fade overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent dark:from-background pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent dark:from-background pointer-events-none" />
      </div>

      {/* Bottom row: scroll right */}
      <div className="relative">
        <div className="flex animate-scroll-right hover:[animation-play-state:paused]">
          {looped.map((c, idx) => (
            <Card key={idx} className="flex-shrink-0 mx-4 w-60 hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle>{c.name}</CardTitle>
                <CardDescription>{c.job}</CardDescription>
                <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <Building2 className="w-4 h-4" />
                  <span>at {c.company}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">{c.salary}</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-600 dark:text-gray-300">hired</p>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent dark:from-background pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent dark:from-background pointer-events-none" />
      </div>
    </div>
  );
}