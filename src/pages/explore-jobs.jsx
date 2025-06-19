import { useState, useEffect } from "react";
import { Search, Briefcase, Clock, MapPin, DollarSign, Tag, MessageCircle, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchJobs, selectAllJobs, selectJobsStatus, selectJobsError, setFilters } from "@/features/jobs/jobsSlice";
import { BigLoader } from "@/components/ui/BigLoader";

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

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <Card 
            key={job._id} 
            className="hover:shadow-lg transition-shadow flex flex-col h-full cursor-pointer"
            onClick={() => handleCardClick(job._id)}
          >
            <CardHeader>
              <CardTitle className="text-xl">{job.title}</CardTitle>
              <CardDescription className="text-lg">{job.companyName}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase className="h-4 w-4 mr-2" />
                  {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {job.salary}
                </div>
                {job.tags && job.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <p className="mt-4 text-gray-600">{job.description}</p>
              <div className="mt-4 text-sm text-gray-500">
                <p className="font-bold my-4 flex gap-2 items-center border rounded-full w-fit px-2 py-1"> <User className="w-4 h-4"/> {job.contactName}</p>
                <p className="font-bold flex gap-2 items-center"><Phone/> {job.mobileNumber}</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 mt-auto pt-4">
              {job.whatsappNumber && (
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-700 border-green-200"
                  onClick={(e) => handleWhatsAppClick(job, e)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  Contact on WhatsApp
                </Button>
              )}
              <Button className="w-full">Apply Now</Button>
            </CardFooter>
          </Card>
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