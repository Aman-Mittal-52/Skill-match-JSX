import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { selectAllJobs, selectJobsStatus, selectJobsError, searchJobs } from '@/features/jobs/jobsSlice';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { JobCard } from '@/components/ui/JobCard';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { BigLoader } from '@/components/ui/BigLoader';

export function SearchResults() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    // Get jobs data from Redux store
    const jobs = useSelector(selectAllJobs);
    const status = useSelector(selectJobsStatus);
    const error = useSelector(selectJobsError);

    // Trigger search when component mounts or query changes
    useEffect(() => {
        if (query) {
            console.log('Searching for query:', query); // Debug log
            dispatch(searchJobs(query));
        }
    }, [dispatch, query]);

    useEffect(() => {
        console.log('Search query:', query); // Debug log
        console.log('Current jobs:', jobs); // Debug log
    }, [query, jobs]);

    // Handle card click to navigate to job details
    const handleCardClick = (jobId) => {
        console.log('Navigating to job details:', jobId); // Debug log
        navigate(`/jobs/${jobId}`);
    };

    // Handle WhatsApp click
    const handleWhatsAppClick = (job, e) => {
        e.stopPropagation(); // Prevent card click when clicking WhatsApp button
        console.log('Opening WhatsApp for job:', job); // Debug log
        const message = `Hello, I'm interested in the ${job.title} position at ${job.companyName}`;
        const whatsappUrl = `https://wa.me/${job.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    // Show loading state
    if (status === 'loading') {
        return (
            <BigLoader/>
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
                            <JobCard
                                key={job._id}
                                job={job}
                                onCardClick={handleCardClick}
                                onWhatsAppClick={handleWhatsAppClick}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
} 