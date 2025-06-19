import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobDetails } from '@/features/auth/authSlice';
import { applyToJob, selectApplicationStatus, selectApplicationError } from '@/features/jobs/jobsSlice';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, DollarSign, Tag, User, Phone } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import apiService from '@/lib/api';
import { BigLoader } from '@/components/ui/BigLoader';


export function JobDetails() {
    const { jobId } = useParams();
    const dispatch = useDispatch();
    const [relatedJobs, setRelatedJobs] = useState([]);
    const [loadingRelated, setLoadingRelated] = useState(false);

    const user = useSelector((state) => state.auth.user);

    // Get job details from Redux store
    const { currentJob, jobLoading, jobError } = useSelector((state) => state.auth);
    const applicationStatus = useSelector(selectApplicationStatus);
    const applicationError = useSelector(selectApplicationError);

    // Function to fetch related jobs
    const fetchRelatedJobs = async (tags) => {
        try {
            setLoadingRelated(true);
            console.log('Fetching related jobs for tags:', tags); // Debug log

            // Create a query string from the first 2 tags
            const queryTags = tags.slice(0, 2).join(' ');
            const response = await apiService.get(`/jobs/search?query=${encodeURIComponent(queryTags)}`);

            console.log('Related jobs response:', response.data); // Debug log

            // Filter out the current job from related jobs
            const filteredJobs = response.data.filter(job => job._id !== jobId).slice(0, 3);
            setRelatedJobs(filteredJobs);
            console.log(relatedJobs)

        } catch (error) {
            console.error('Error fetching related jobs:', error);
            toast.error('Failed to load related jobs');
        } finally {
            setLoadingRelated(false);
        }
    };

    useEffect(() => {
        console.log('Fetching job details for ID:', jobId); // Debug log
        dispatch(fetchJobDetails(jobId));
    }, [dispatch, jobId]);

    // Fetch related jobs when current job changes
    useEffect(() => {
        if (currentJob?.tags?.length > 0) {
            fetchRelatedJobs(currentJob.tags);
        }

    }, [currentJob]);

    // Handle job application
    const handleApply = () => {
        if (!currentJob) return;

        dispatch(applyToJob(jobId))
            .unwrap()
            .then(() => {
                toast.success('Application submitted successfully!');
            })
            .catch((error) => {
                toast.error(error || 'Failed to submit application');
            });
    };

    // Show loading state
    if (jobLoading) {
        return (
            <BigLoader />
        );
    }

    // Show error state
    if (jobError) {
        toast.error(jobError || 'Failed to load job details');
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">Error loading job details</div>
            </div>
        );
    }

    // Show job details
    return (
        <div className="container mx-auto px-4 py-8">
            {currentJob ? (
                <>
                    <Card className="max-w-7xl mx-auto mb-8">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">{currentJob.title}</CardTitle>
                            <p className="text-xl text-gray-600">{currentJob.companyName}</p>
                        </CardHeader>

                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-4">
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="h-5 w-5 mr-2" />
                                        <span>{currentJob.location}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Briefcase className="h-5 w-5 mr-2" />
                                        <span>{currentJob.jobType.charAt(0).toUpperCase() + currentJob.jobType.slice(1)}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <DollarSign className="h-5 w-5 mr-2" />
                                        <span>{currentJob.salary}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center text-gray-600">
                                        <User className="h-5 w-5 mr-2" />
                                        <span>{currentJob.contactName}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Phone className="h-5 w-5 mr-2" />
                                        <span>{currentJob.mobileNumber}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Description</h3>
                                <p className="text-gray-600">{currentJob.description}</p>
                            </div>

                            {currentJob.tags && currentJob.tags.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold mb-4">Skills Required</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {currentJob.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                            >
                                                <Tag className="h-4 w-4 mr-1" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>

                        <CardFooter className="flex gap-4">
                            {currentJob.whatsappNumber && (
                                <Button
                                    variant="outline"
                                    className="flex items-center justify-center gap-2 bg-green-50 text-green-700 border-green-200"
                                    onClick={() => {
                                        const message = `Hello, I'm interested in the ${currentJob.title} position at ${currentJob.companyName}`;
                                        const whatsappUrl = `https://wa.me/${currentJob.whatsappNumber}?text=${encodeURIComponent(message)}`;
                                        window.open(whatsappUrl, '_blank');
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                    </svg>
                                    Contact on WhatsApp
                                </Button>
                            )}
                            {
                                user.role === 'recruiter' ? (
                                    <Button className='flex-1 cursor-not-allowed'>
                                        Recruiter can't apply
                                    </Button>
                                ) : (
                                    <Button
                                        className="flex-1"
                                        onClick={handleApply}
                                        disabled={applicationStatus === 'loading' || user.role === 'recruiter'}
                                    >
                                        {applicationStatus === 'loading' ? (
                                            <>
                                                <Loader className="w-4 h-4 mr-2 animate-spin" />
                                                Applying...
                                            </>
                                        ) : (
                                            'Apply Now'
                                        )}
                                    </Button>
                                )
                            }
                        </CardFooter>
                    </Card>

                    {/* Related Jobs Section */}
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6">Similar Jobs You Might Like</h2>
                        {loadingRelated ? (
                            <div className="flex justify-center items-center h-40">
                                <Loader className="animate-spin w-8 h-8" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedJobs.map((job) => (
                                    <Link
                                        key={job._id}
                                        to={`/jobs/${job._id}`}
                                        className="block"
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                                            <CardHeader>
                                                <CardTitle className="text-xl">{job.title}</CardTitle>
                                                <p className="text-gray-600">{job.companyName}</p>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    <div className="flex items-center text-gray-600">
                                                        <MapPin className="h-4 w-4 mr-2" />
                                                        <span className="text-sm">{job.location}</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <Briefcase className="h-4 w-4 mr-2" />
                                                        <span className="text-sm">{job.jobType}</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <DollarSign className="h-4 w-4 mr-2" />
                                                        <span className="text-sm">{job.salary}</span>
                                                    </div>
                                                </div>
                                                {job.tags && job.tags.length > 0 && (
                                                    <div className="mt-4 flex flex-wrap gap-2">
                                                        {job.tags.slice(0, 3).map((tag, index) => (
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
                                            </CardContent>
                                            <CardFooter>
                                                <InteractiveHoverButton className="w-full">
                                                    View Details
                                                </InteractiveHoverButton>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <Card className="text-center py-12">
                    <CardContent>
                        <p className="text-gray-600">No job details found.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}