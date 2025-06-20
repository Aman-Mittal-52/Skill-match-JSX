import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchPostedJobs,
  deleteJob,
  updateJob,
  toggleJobStatus,
  selectPostedJobs,
  selectJobsStatus,
  selectJobsError,
  selectDeleteStatus,
} from "@/features/jobs/jobsSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Captions, CaptionsOff, Pencil, Trash2 } from "lucide-react";
import { BigLoader } from "@/components/ui/BigLoader";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function PostedJobs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postedJobs = useSelector(selectPostedJobs);
  const status = useSelector(selectJobsStatus);
  const error = useSelector(selectJobsError);
  const deleteStatus = useSelector(selectDeleteStatus);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    companyName: "",
    description: "",
    location: "",
    contactName: "",
    mobileNumber: "",
    whatsappNumber: "",
    salary: "",
    tags: "",
    jobType: "full-time",
  });

  useEffect(() => {
    dispatch(fetchPostedJobs());
  }, [dispatch]);

  const handleDelete = async (jobId) => {
    setJobToDelete(jobId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteJob(jobToDelete)).unwrap();
      toast.success("Job deleted successfully");
      setIsDeleteDialogOpen(false);
      setJobToDelete(null);
    } catch (error) {
      toast.error(error.message || "Failed to delete job");
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setEditFormData({
      title: job.title,
      companyName: job.companyName,
      description: job.description,
      location: job.location,
      contactName: job.contactName,
      mobileNumber: job.mobileNumber,
      whatsappNumber: job.whatsappNumber || "",
      salary: job.salary || "",
      tags: job.tags.join(", "),
      jobType: job.jobType,
    });
    setIsEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !editFormData.title ||
      !editFormData.companyName ||
      !editFormData.description ||
      !editFormData.location ||
      !editFormData.contactName ||
      !editFormData.mobileNumber
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const jobData = {
        ...editFormData,
        whatsappNumber: editFormData.whatsappNumber || editFormData.mobileNumber,
        tags: editFormData.tags ? editFormData.tags.split(",").map((tag) => tag.trim()) : [],
      };

      await dispatch(updateJob({ jobId: selectedJob._id, jobData })).unwrap();
      toast.success("Job updated successfully");
      setIsEditDialogOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update job");
    }
  };

  const handleJobStatusChange = async (jobId) => {
    try {
      await dispatch(toggleJobStatus(jobId)).unwrap();
      toast.success("Job status updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update job status");
    }
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Posted Jobs</h1>
        <Button onClick={() => navigate("/jobs/post")} className="w-full sm:w-auto">
          Post New Job
        </Button>
      </div>

      {postedJobs.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          You haven't posted any jobs yet.
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {postedJobs.map((job) => (
            <Card key={job._id} className="flex flex-col">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg sm:text-xl truncate">{job.title}</CardTitle>
                    <CardDescription className="truncate">{job.companyName}</CardDescription>
                  </div>
                  
                      <Badge
                        variant={job.status === "open" ? "default" : "secondary"}
                        className="shrink-0"
                      >
                        {job.status}
                      </Badge>

                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 flex-grow">
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 line-clamp-3">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm space-y-1">
                    <p className="flex items-center gap-1">
                      <span className="font-medium">Location • </span>
                      <span className="truncate">{job.location}</span>
                    </p>
                    <p className="flex items-center gap-1">
                      <span className="font-medium">Type • </span>
                      <span>{job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}</span>
                    </p>
                    {job.salary && (
                      <p className="flex items-center gap-1">
                        <span className="font-medium">Salary • </span>
                        <span>{job.salary}</span>
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 sm:p-6 pt-0 flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate(`/jobs/${job._id}/applications`)}
                >
                  View Applications
                </Button>
                <Button
                  variant={job.status === "open" ? "outline" : "default"}
                  className="w-full"
                  onClick={() => handleJobStatusChange(job._id)}
                >
                  {job.status === "open" ? (
                    <>
                      <CaptionsOff /> Close Job
                    </>
                  ) : (
                    <>
                      <Captions /> Open Job
                    </>
                  )}
                </Button>
                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(job)}
                    className="flex-1"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(job._id)}
                    disabled={deleteStatus === "loading"}
                    className="flex-1"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="min-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-base sm:text-xl">Edit Job</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Make changes to your job posting here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="flex flex-col flex-1 min-h-0 m-4">
            <div className="grid gap-2 sm:gap-4 py-1 px-1 sm:py-4 overflow-y-auto flex-1 min-h-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <div className="space-y-1">
                  <Label htmlFor="title" className="text-xs">Job Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditChange}
                    required
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="companyName" className="text-xs">Company Name *</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={editFormData.companyName}
                    onChange={handleEditChange}
                    required
                    className="h-9 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="description" className="text-xs">Job Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  required
                  className="min-h-[60px] sm:min-h-[100px] text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <div className="space-y-1">
                  <Label htmlFor="location" className="text-xs">Location *</Label>
                  <Input
                    id="location"
                    name="location"
                    value={editFormData.location}
                    onChange={handleEditChange}
                    required
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="jobType" className="text-xs">Job Type</Label>
                  <select
                    id="jobType"
                    name="jobType"
                    value={editFormData.jobType}
                    onChange={handleEditChange}
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs sm:text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-9"
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="freelance">Freelance</option>
                    <option value="temporary">Temporary</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <div className="space-y-1">
                  <Label htmlFor="contactName" className="text-xs">Contact Name *</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={editFormData.contactName}
                    onChange={handleEditChange}
                    required
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="mobileNumber" className="text-xs">Mobile Number *</Label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    value={editFormData.mobileNumber}
                    onChange={handleEditChange}
                    required
                    className="h-9 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <div className="space-y-1">
                  <Label htmlFor="whatsappNumber" className="text-xs">WhatsApp Number</Label>
                  <Input
                    id="whatsappNumber"
                    name="whatsappNumber"
                    value={editFormData.whatsappNumber}
                    onChange={handleEditChange}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="salary" className="text-xs">Salary</Label>
                  <Input
                    id="salary"
                    name="salary"
                    value={editFormData.salary}
                    onChange={handleEditChange}
                    className="h-9 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="tags" className="text-xs">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={editFormData.tags}
                  onChange={handleEditChange}
                  placeholder="Enter tags separated by commas"
                  className="h-9 text-sm"
                />
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2 mt-2 sm:mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="w-full sm:w-auto h-9"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full sm:w-auto h-9">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="w-[90vw]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this job? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setJobToDelete(null);
              }}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteStatus === "loading"}
              className="w-full sm:w-auto"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 