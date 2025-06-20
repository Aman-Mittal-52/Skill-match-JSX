import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchJobApplications,
  updateApplicationStatus,
  selectJobApplications,
  selectJobApplicationsStatus,
  selectJobApplicationsError,
  selectUpdateStatusStatus,
  selectUpdateStatusError,
} from "@/features/application/applicationSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BigLoader } from "@/components/ui/BigLoader";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, User, Mail, Phone, Calendar, FileMinus, CheckCircle, XCircle, Star, Search } from "lucide-react";

export default function AppliedApplication() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  const applications = useSelector(selectJobApplications);
  const status = useSelector(selectJobApplicationsStatus);
  const error = useSelector(selectJobApplicationsError);
  const updateStatusStatus = useSelector(selectUpdateStatusStatus);
  const updateStatusError = useSelector(selectUpdateStatusError);

  useEffect(() => {
    if (jobId) {
      dispatch(fetchJobApplications(jobId));
    }
  }, [dispatch, jobId]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'applied':
        return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    setUpdatingStatus(applicationId);
    try {
      await dispatch(updateApplicationStatus({ applicationId, status: newStatus })).unwrap();
    } catch (error) {
      console.error('Error updating application status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const canUpdateStatus = (currentStatus) => {
    return currentStatus?.toLowerCase() === 'applied';
  };

  const filteredApplications = applications.filter(application => {
    const matchesSearch = 
      application.seekerId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.seekerId?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.seekerPhone?.includes(searchQuery);
    
    const matchesStatus = selectedStatus === "all" || application.status?.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const getStatusCount = (status) => {
    return applications.filter(app => 
      status === "all" ? true : app.status?.toLowerCase() === status.toLowerCase()
    ).length;
  };

  if (status === "loading") {
    return <BigLoader />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/jobs/posted")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Posted Jobs
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold">Job Applications</h1>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, or phone..."
              className="pl-10 bg-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status ({getStatusCount("all")})</SelectItem>
            <SelectItem value="applied">Applied ({getStatusCount("applied")})</SelectItem>
            <SelectItem value="shortlisted">Shortlisted ({getStatusCount("shortlisted")})</SelectItem>
            <SelectItem value="rejected">Rejected ({getStatusCount("rejected")})</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {applications.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No applications yet</h3>
          <p className="text-sm">Applications for this job will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {getStatusCount(selectedStatus)} application{getStatusCount(selectedStatus) !== 1 ? 's' : ''} received
            </p>
          </div>
          
          <div className="grid gap-4">
            {filteredApplications.map((application) => (
              <Card key={application._id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="w-5 h-5" />
                        {application.seekerId?.name || 'Anonymous Applicant'}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {application.seekerId?.email || 'No email provided'}
                        </span>
                        {application.seekerPhone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {application.seekerPhone}
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getStatusColor(application.status)}>
                        {application.status || 'Applied'}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(application.createdAt)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {application.coverLetter && (
                    <div className="mb-4">
                      <h4 className="font-medium text-sm mb-2">Cover Letter</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                        {application.coverLetter}
                      </p>
                    </div>
                  )}
                  
                
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Resume Files</h4>
                    {application.seekerId?.resumeUrls && application.seekerId.resumeUrls.length > 0 ? (
                      <div className="space-y-2">
                        {application.seekerId.resumeUrls.map((resumeUrl, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              Resume {index + 1}
                            </Badge>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.open(resumeUrl, '_blank')}
                              className="flex-1 justify-start"
                            >
                              <span className="truncate">
                                {resumeUrl.split('/').pop() || `Resume ${index + 1}`}
                              </span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Card className="flex flex-col  gap-2 py-4 rounded-md">
                        <CardContent className="flex flex-col items-start justify-start gap-2">
                          <CardTitle>No resume files attached</CardTitle>
                          <CardDescription className="flex items-center gap-2"> <FileMinus/>The applicant hasn't uploaded any resume files</CardDescription>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  {application.seekerPhone && (
                    <div className="mt-4 space-y-2">
                      <h4 className="font-medium text-sm">Contact Options</h4>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex-1 flex items-center justify-center gap-2 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-700"
                          onClick={() => {
                            const whatsappUrl = `https://wa.me/${application.seekerPhone}`;
                            window.open(whatsappUrl, '_blank');
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                          </svg>
                          WhatsApp
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:text-blue-700"
                          onClick={() => {
                            window.open(`tel:${application.seekerPhone}`, '_self');
                          }}
                        >
                          <Phone className="w-4 h-4" />
                          Call
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {canUpdateStatus(application.status) && (
                    <div className="mt-4 space-y-2">
                      <h4 className="font-medium text-sm">Application Actions</h4>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={updatingStatus === application._id}
                          className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-700"
                          onClick={() => handleStatusUpdate(application._id, 'shortlisted')}
                        >
                          {updatingStatus === application._id ? (
                            <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Star className="w-4 h-4" />
                          )}
                          {updatingStatus === application._id ? 'Updating...' : 'Shortlist'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={updatingStatus === application._id}
                          className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-700"
                          onClick={() => handleStatusUpdate(application._id, 'rejected')}
                        >
                          {updatingStatus === application._id ? (
                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          {updatingStatus === application._id ? 'Updating...' : 'Reject'}
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {!canUpdateStatus(application.status) && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {application.status?.toLowerCase() === 'shortlisted' ? (
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                          <span className="text-sm font-medium">
                            {application.status?.toLowerCase() === 'shortlisted' 
                              ? 'Application shortlisted' 
                              : 'Application rejected'}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={updatingStatus === application._id}
                          onClick={() => {
                            // Reset status back to 'applied' to allow re-selection
                            handleStatusUpdate(application._id, 'applied');
                          }}
                          className="text-xs h-7 px-2"
                        >
                          {updatingStatus === application._id ? (
                            <div className="w-3 h-3 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            'Change Status'
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {application.status?.toLowerCase() === 'shortlisted' 
                          ? 'This candidate has been moved to the shortlist for further consideration.' 
                          : 'This application has been rejected and cannot be changed.'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 