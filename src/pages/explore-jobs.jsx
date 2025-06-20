import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobCard } from "@/components/ui/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchJobs, selectAllJobs, selectJobsStatus, selectJobsError, setFilters } from "@/features/jobs/jobsSlice";
import { BigLoader } from "@/components/ui/BigLoader";
import LogoMarquee from "@/components/home/LogosMarquee";

export function ExploreJobs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobs = useSelector(selectAllJobs);
  const status = useSelector(selectJobsStatus);
  const error = useSelector(selectJobsError);
  const filters = useSelector((state) => state.jobs.filters);

  // State for filters and search
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery);
  const [selectedType, setSelectedType] = useState(filters.jobType);
  const [selectedLocation, setSelectedLocation] = useState(filters.location);

  // Fetch jobs on component mount
  useEffect(() => {
    console.log('Component mounted, fetching jobs...');
    dispatch(fetchJobs());
  }, [dispatch]);

  // Update filters in Redux store
  useEffect(() => {
    console.log('Filters updated:', { searchQuery, selectedType, selectedLocation });
    dispatch(setFilters({
      searchQuery,
      jobType: selectedType,
      location: selectedLocation
    }));
  }, [dispatch, searchQuery, selectedType, selectedLocation]);

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || job.jobType === selectedType;
    const matchesLocation = selectedLocation === "all" || job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesType && matchesLocation;
  });

  // Debug logging
  console.log("Current filters:", { searchQuery, selectedType, selectedLocation });
  console.log("Filtered jobs count:", filteredJobs.length);
  console.log("API Status:", status);
  if (error) console.error("API Error:", error);

  // Function to generate WhatsApp message
  const generateWhatsAppMessage = (job) => {
    const message = `Hello ${job.contactName},\n\nI am interested in the ${job.title} position at ${job.companyName}. I would like to know more about this opportunity.\n\nBest regards`;
    return encodeURIComponent(message);
  };

  // Function to handle job card click
  const handleCardClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  // Function to handle WhatsApp click
  const handleWhatsAppClick = (job, e) => {
    e.stopPropagation(); // Prevent card click when clicking WhatsApp button
    if (!job.whatsappNumber) return;
    
    const phone = job.whatsappNumber.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
    const message = generateWhatsAppMessage(job);
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    
    console.log('Opening WhatsApp with URL:', whatsappUrl);
    window.open(whatsappUrl, '_blank');
  };

  if (status === 'loading') {
    return (
      <BigLoader/>
    );
  }

  if (status === 'failed') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-semibold">Error loading jobs</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Explore Jobs</h1>
        <p className="text-gray-600">Find your dream job from thousands of opportunities</p>
      </div>

      {/* Search and Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search jobs, companies or descriptions..."
              className="pl-10 bg-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Select value={selectedType} onValueChange={setSelectedType }>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="full-time">Full Time</SelectItem>
            <SelectItem value="part-time">Part Time</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
            <SelectItem value="freelance">Freelance</SelectItem>
            <SelectItem value="temporary">Temporary</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="delhi">Delhi</SelectItem>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="bangalore">Bangalore</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Trusted Companies Section */}
      <div className="mb-12">
        <LogoMarquee />
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onCardClick={handleCardClick}
            onWhatsAppClick={handleWhatsAppClick}
          />
        ))}
      </div>

      {/* No Results Message */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
} 