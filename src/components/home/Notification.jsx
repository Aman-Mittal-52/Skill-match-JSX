"use client"

import { cn } from "@/lib/utils"
import { AnimatedList } from "@/components/ui/animated-list"

// Indian names for hotel staff
const indianNames = [
  "Rajesh Kumar",
  "Priya Sharma",
  "Amit Singh",
  "Sneha Patel",
  "Vikram Gupta",
  "Kavya Reddy",
  "Arjun Nair",
  "Pooja Agarwal",
  "Rohit Joshi",
  "Meera Iyer",
  "Sanjay Verma",
  "Anita Desai",
  "Karan Malhotra",
  "Ritu Bansal",
  "Deepak Yadav",
  "Shruti Kapoor",
  "Manish Tiwari",
  "Neha Chopra",
  "Suresh Pillai",
  "Divya Menon",
  "Rahul Saxena",
  "Swati Jain",
  "Nikhil Bhatt",
  "Preeti Sinha",
  "Ajay Pandey",
  "Riya Khanna",
  "Varun Sethi",
  "Nisha Goyal",
  "Harsh Agrawal",
  "Simran Kaur",
]

// Hotel industry job roles
const hotelJobRoles = [
  "Front Desk Executive",
  "Hotel Receptionist",
  "Housekeeping Supervisor",
  "Room Service Attendant",
  "Concierge",
  "Guest Relations Executive",
  "Food & Beverage Manager",
  "Executive Chef",
  "Sous Chef",
  "Commis Chef",
  "Restaurant Manager",
  "Banquet Manager",
  "Event Coordinator",
  "Housekeeping Manager",
  "Maintenance Engineer",
  "Security Supervisor",
  "Spa Therapist",
  "Bell Boy",
  "Valet Parking Attendant",
  "Hotel Manager",
  "Assistant Manager",
  "Sales Executive",
  "Revenue Manager",
  "Accounts Executive",
  "HR Executive",
  "Laundry Supervisor",
  "Kitchen Steward",
  "Bartender",
  "Waiter",
  "Room Attendant",
]

const generateRandomSalaryLPA = () => {
  // Hotel industry salary ranges in India (2-25 LPA)
  const salaryRanges = {
    entry: { min: 2, max: 4 }, // Entry level positions
    mid: { min: 4, max: 8 }, // Mid level positions
    senior: { min: 8, max: 15 }, // Senior positions
    management: { min: 12, max: 25 }, // Management positions
  }

  const levels = Object.values(salaryRanges)
  const randomLevel = levels[Math.floor(Math.random() * levels.length)]

  const salary = (Math.random() * (randomLevel.max - randomLevel.min) + randomLevel.min).toFixed(1)
  return `₹${salary} LPA`
}

const generateRandomHire = () => {
  const randomName = indianNames[Math.floor(Math.random() * indianNames.length)]
  const randomRole = hotelJobRoles[Math.floor(Math.random() * hotelJobRoles.length)]
  const randomSalary = generateRandomSalaryLPA()

  return {
    name: randomName,
    role: randomRole,
    salary: randomSalary,
    icon: "👤",
    time: "Today",
  }
}

// Generate more job hires for infinite loop
const jobHires = Array.from({ length: 50 }, () => generateRandomHire())

const JobHireCard = ({ name, role, salary, icon, time }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
          <span className="text-xl">{icon}</span>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <span className="text-sm font-medium">Hired</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{role}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-orange-600 dark:text-orange-400">{salary}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
          </div>
        </div>
      </div>
    </figure>
  )
}

export default function AnimatedListDemo({ className }) {
  return (
    <div className={cn("relative flex h-[500px] w-full flex-col overflow-hidden p-2", className)}>
      <AnimatedList delay={1500}>
        {jobHires.map((hire, idx) => (
          <JobHireCard {...hire} key={`hire-${idx}-${Math.random()}`} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background dark:from-transparent"></div>
    </div>
  )
}
