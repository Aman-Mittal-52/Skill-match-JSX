import { useState, useEffect } from "react";
import { Search, Trash2, Eye, Edit, MoreHorizontal, Filter, Calendar, Building, MapPin, IndianRupee, User, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  fetchAdminJobs, 
  adminDeleteJob, 
  adminUpdateJobStatus,
  optimisticallyUpdateJobStatus,
  optimisticallyDeleteJob,
  selectAdminJobs,
  selectAdminJobsStatus,
  selectAdminJobsError,
  selectAdminDeleteStatus,
  selectAdminUpdateStatus,
  setFilters 
} from "@/features/jobs/jobsSlice";
import { BigLoader } from "@/components/ui/BigLoader";
import { toast } from "sonner";

const AdminJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobs = useSelector(selectAdminJobs);
  const status = useSelector(selectAdminJobsStatus);
  const error = useSelector(selectAdminJobsError);
  const deleteStatus = useSelector(selectAdminDeleteStatus);
  const updateStatus = useSelector(selectAdminUpdateStatus);
  const filters = useSelector((state) => state.jobs.filters);

  // State for filters and search
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery);
  const [selectedType, setSelectedType] = useState(filters.jobType);
  const [selectedLocation, setSelectedLocation] = useState(filters.location);
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [updatingJobId, setUpdatingJobId] = useState(null);
  const [deletingJobId, setDeletingJobId] = useState(null);

  // Fetch jobs on component mount
  useEffect(() => {
    console.log('AdminJobs component mounted, fetching jobs...');
    dispatch(fetchAdminJobs());
  }, [dispatch]);

  // Update filters in Redux store
  useEffect(() => {
    console.log('Filters updated:', { searchQuery, selectedType, selectedLocation, selectedStatus });
    dispatch(setFilters({
      searchQuery,
      jobType: selectedType,
      location: selectedLocation
    }));
  }, [dispatch, searchQuery, selectedType, selectedLocation]);

  // Filter jobs based on search and filters
  const filteredJobs = (jobs || []).filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.contactName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || job.jobType === selectedType;
    const matchesLocation = selectedLocation === "all" || job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesStatus = selectedStatus === "all" || job.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesLocation && matchesStatus;
  });

  // Debug logging
  console.log("Current filters:", { searchQuery, selectedType, selectedLocation, selectedStatus });
  console.log("Jobs data received:", jobs);
  console.log("Jobs type:", typeof jobs);
  console.log("Jobs is array:", Array.isArray(jobs));
  console.log("Filtered jobs count:", filteredJobs.length);
  console.log("API Status:", status);
  if (error) console.error("API Error:", error);

  // Handle job actions
  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setViewDialogOpen(true);
  };

  const handleDeleteJob = (job) => {
    setJobToDelete(job);
    setDeleteDialogOpen(true);
  };

  const handleStatusUpdate = async (jobId, newStatus) => {
    try {
      setUpdatingJobId(jobId);
      // Optimistically update the UI immediately
      dispatch(optimisticallyUpdateJobStatus({ jobId, status: newStatus }));
      
      // Dispatch the API action
      const result = await dispatch(adminUpdateJobStatus({ jobId, status: newStatus })).unwrap();
      console.log('Status update result:', result);
      toast.success(`Job status updated to ${newStatus}`);
    } catch (error) {
      console.error('Status update error:', error);
      // Revert optimistic update on error
      dispatch(optimisticallyUpdateJobStatus({ jobId, status: newStatus === 'open' ? 'closed' : 'open' }));
      toast.error(error || "Failed to update job status");
    } finally {
      setUpdatingJobId(null);
    }
  };

  const confirmDelete = async () => {
    if (jobToDelete) {
      try {
        setDeletingJobId(jobToDelete._id);
        // Optimistically remove the job from the UI
        dispatch(optimisticallyDeleteJob(jobToDelete._id));
        
        await dispatch(adminDeleteJob(jobToDelete._id)).unwrap();
        toast.success("Job deleted successfully");
        setDeleteDialogOpen(false);
        setJobToDelete(null);
      } catch (error) {
        console.error('Delete error:', error);
        // Note: We can't easily revert delete optimistic update, but the error toast will inform the user
        toast.error(error || "Failed to delete job");
        // Refetch jobs to ensure UI is in sync
        dispatch(fetchAdminJobs());
      } finally {
        setDeletingJobId(null);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getJobTypeColor = (jobType) => {
    switch (jobType) {
      case 'full-time':
        return 'bg-blue-100 text-blue-800';
      case 'part-time':
        return 'bg-yellow-100 text-yellow-800';
      case 'internship':
        return 'bg-purple-100 text-purple-800';
      case 'freelance':
        return 'bg-orange-100 text-orange-800';
      case 'temporary':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (status === 'loading') {
    return <BigLoader />;
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
        <h1 className="text-3xl font-bold mb-4">Admin Jobs Management</h1>
        <p className="text-gray-600">Manage and monitor all job postings on the platform</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobs?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Jobs</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {(jobs || []).filter(job => job.status === 'open').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed Jobs</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {(jobs || []).filter(job => job.status === 'closed').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(jobs || []).filter(job => {
                const jobDate = new Date(job.createdAt);
                const now = new Date();
                return jobDate.getMonth() === now.getMonth() && jobDate.getFullYear() === now.getFullYear();
              }).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search jobs, companies, descriptions..."
              className="pl-10 bg-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
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
            <SelectItem value="hyderabad">Hyderabad</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <Card key={job._id} className={`hover:shadow-lg transition-shadow ${
            updatingJobId === job._id ? 'ring-2 ring-blue-500' : ''
          } ${deletingJobId === job._id ? 'opacity-50' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold mb-2">
                    {job.title}
                    {updatingJobId === job._id && (
                      <span className="ml-2 text-sm text-blue-600">(Updating...)</span>
                    )}
                    {deletingJobId === job._id && (
                      <span className="ml-2 text-sm text-red-600">(Deleting...)</span>
                    )}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 mb-2">
                    {job.companyName}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                    <Badge className={getJobTypeColor(job.jobType)}>
                      {job.jobType}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewDetails(job)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleStatusUpdate(job._id, job.status === 'open' ? 'closed' : 'open')}
                      disabled={updatingJobId === job._id || updateStatus === 'loading'}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      {updatingJobId === job._id ? 'Updating...' : 'Toggle Status'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDeleteJob(job)}
                      className="text-red-600"
                      disabled={deletingJobId === job._id || deleteStatus === 'loading'}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      {deletingJobId === job._id ? 'Deleting...' : 'Delete Job'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="mr-2 h-4 w-4" />
                  {job.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <IndianRupee className="mr-2 h-4 w-4" />
                  {job.salary}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="mr-2 h-4 w-4" />
                  {job.contactName}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="mr-2 h-4 w-4" />
                  {job.mobileNumber}
                </div>
                <div className="text-xs text-gray-500">
                  Posted: {formatDate(job.createdAt)}
                </div>
                {job.tags && job.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {job.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {job.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Job</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{jobToDelete?.title}" at {jobToDelete?.companyName}? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={deleteStatus === 'loading'}
            >
              {deleteStatus === 'loading' ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Job Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedJob?.title}</DialogTitle>
            <DialogDescription>
              {selectedJob?.companyName}
            </DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Job Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Type:</strong> {selectedJob.jobType}</div>
                    <div><strong>Location:</strong> {selectedJob.location}</div>
                    <div><strong>Salary:</strong> {selectedJob.salary}</div>
                    <div><strong>Status:</strong> 
                      <Badge className={`ml-2 ${getStatusColor(selectedJob.status)}`}>
                        {selectedJob.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Name:</strong> {selectedJob.contactName}</div>
                    <div><strong>Phone:</strong> {selectedJob.mobileNumber}</div>
                    <div><strong>WhatsApp:</strong> {selectedJob.whatsappNumber}</div>
                    <div><strong>Posted By:</strong> {selectedJob.postedBy?.name}</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm text-gray-600">{selectedJob.description}</p>
              </div>
              {selectedJob.tags && selectedJob.tags.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="text-xs text-gray-500">
                <div>Created: {formatDate(selectedJob.createdAt)}</div>
                <div>Updated: {formatDate(selectedJob.updatedAt)}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminJobs;