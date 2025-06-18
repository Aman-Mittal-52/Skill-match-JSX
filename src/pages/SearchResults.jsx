import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { selectAllJobs, selectJobsStatus, selectJobsError } from '@/features/jobs/jobsSlice';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MapPin, Briefcase, DollarSign, Tag, User, Phone, Loader } from 'lucide-react';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

export function SearchResults() {

    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    // Get jobs data from Redux store
    const jobs = useSelector(selectAllJobs);
    const status = useSelector(selectJobsStatus);
    const error = useSelector(selectJobsError);

    useEffect(() => {
        console.log('Search query:', query); // Debug log
        console.log('Current jobs:', jobs); // Debug log
    }, [query, jobs]);

    // Handle WhatsApp click
    const handleWhatsAppClick = (job) => {
        console.log('Opening WhatsApp for job:', job); // Debug log
        const message = `Hello, I'm interested in the ${job.title} position at ${job.companyName}`;
        const whatsappUrl = `https://wa.me/${job.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    // Show loading state
    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader className="animate-spin w-12 h-12" />
            </div>
        );
    }

    // Show error state
    if (status === 'failed') {
        toast.error(error || 'Failed to load search results');
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">Error loading search results</div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Search Results | Skill Match</title>
                <meta
                    name="description"
                    content={`Search results for "${query}" - Find your next part-time tech job`}
                />
            </Helmet>

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 dark:text-white">
                    Search Results for "{query}"
                </h1>

                {jobs.length === 0 ? (
                    <div className="text-center py-12 flex flex-col gap-3 justify-center items-center">
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            No jobs found matching your search criteria.
                        </p>
                        <InteractiveHoverButton className='w-fit' onClick={() => { navigate('/jobs') }}>Explore Jobs</InteractiveHoverButton>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {jobs.map((job) => (
                            <Card key={job._id} className="hover:shadow-lg transition-shadow flex flex-col h-full">
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
                                        <p className="font-bold my-4 flex gap-2 items-center border rounded-full w-fit px-2 py-1">
                                            <User className="w-4 h-4" /> {job.contactName}
                                        </p>
                                        <p className="font-bold flex gap-2 items-center">
                                            <Phone /> {job.mobileNumber}
                                        </p>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col gap-2 mt-auto pt-4">
                                    {job.whatsappNumber && (
                                        <Button
                                            variant="outline"
                                            className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-700 border-green-200"
                                            onClick={() => handleWhatsAppClick(job)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                            </svg>
                                            Contact on WhatsApp
                                        </Button>
                                    )}
                                    <Button className="w-full">Apply Now</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
} 