import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { useSelector } from 'react-redux';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Building2 } from 'lucide-react';
import { DropdownMenuDemo } from '../navbar/dropdown';


function ListItem({ title, description }) {
  
  return (
    <li>
      <NavigationMenuLink asChild>
        <div className="cursor-default rounded-sm p-3 hover:bg-accent hover:text-accent-foreground">
          <div className="text-sm font-medium">{title}</div>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </NavigationMenuLink>
    </li>
  );
}


export default function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search submission
  const handleSearch = () => {
    console.log('Search initiated with term:', searchTerm); // Debug log
    // TODO: Implement actual search functionality
  };

  // Available job categories for navigation
  const jobCategories = [
    { title: "Software Engineering", description: "Develop and maintain apps." },
    { title: "Data Science", description: "Work with data and AI." },
    { title: "UI/UX Design", description: "Craft user experiences." },
    { title: "Marketing", description: "Grow brand and reach." },
    { title: "Sales", description: "Drive customer engagement." },
    { title: "Human Resources", description: "Manage people operations." },
  ];

  // Handle input change for search
  const handleInputChange = (e) => {
    console.log('Search input changed:', e.target.value); // Debug log
    setSearchTerm(e.target.value);
  };

  // Handle key press for search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter key pressed, initiating search'); // Debug log
      handleSearch();
    }
  };

  return (
    <header className="
      sticky top-4 left-0 right-0 z-50
      backdrop-blur-xl
      m-4
      border
      text-black
      dark:border
      border-white/10
      rounded-xl
      px-4
      border-black
      py-3
      transition-all
      duration-300
    ">
      {/* === Desktop View === */}
      <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto gap-6">
        {/* Left: Logo */}
        <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
          <div className="flex items-center gap-2 skill-match-font">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='mr-2'><rect width="32" height="32" rx="6" fill="#000"/><path d="M8 16L16 8L24 16L16 24L8 16Z" fill="#fff"/></svg>
            Skill Match
          </div>
        </Link>

        {/* Center: Search */}
        <div className="flex items-center gap-2 w-full max-w-md">
          <Input
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Search jobs…"
            className="w-full h-9 bg-muted dark:bg-muted"
          />
          <Button 
            variant="outline" 
            onClick={handleSearch} 
            className="h-9 px-4 dark:text-white"
          >
            Search
          </Button>
        </div>

        {/* Right: Navigation Items */}
        <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] sm:w-[400px] md:grid-cols-2 gap-2 p-2">
                    {jobCategories.map((cat, idx) => (
                      <ListItem key={idx} title={cat.title} description={cat.description} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button variant="ghost">
            <Link to="/jobs">Explore Jobs</Link>
          </Button>
          <ThemeToggle />
          {isAuthenticated ? (
          <DropdownMenuDemo/>
          ) : (
            <Link to="/auth/login">
              <Button className="px-4 py-2 rounded-md">Login</Button>
            </Link>
          )}
        </div>
      </div>

      {/* === Mobile View === */}
      <div className="flex flex-col gap-4 md:hidden max-w-7xl mx-auto shadow-2xl p-4 rounded-xl border border-gray-200">
        {/* Top Row: Logo + Toggle + Login */}
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Skill Match
          </Link>
          <div className="flex gap-3 items-center">
            <ThemeToggle />
            <Link to="/auth/login">
              <Button className="px-4 py-1">Login</Button>
            </Link>
          </div>
        </div>

        {/* Middle Row: Navigation */}
        <div className="flex gap-4 text-sm">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className='dark:text-white'>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] sm:w-[400px] md:grid-cols-2 gap-2 p-2 dark:text-white">
                    {jobCategories.map((cat, idx) => (
                      <ListItem key={idx} title={cat.title} description={cat.description} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button variant="ghost" className="px-4 py-1 dark:text-white">
            <Link to="/jobs">Explore Jobs</Link>
          </Button>
        </div>

        {/* Bottom Row: Search */}
        <div className="flex gap-2">
          <Input
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Search jobs…"
            className="flex-grow h-9"
          />
          <Button onClick={handleSearch} className="h-9 px-4">Search</Button>
        </div>
      </div>
    </header>
  );
}