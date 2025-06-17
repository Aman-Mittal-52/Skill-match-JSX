import { AppWindowIcon, CodeIcon } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { registerUser, clearError } from "@/features/auth/authSlice"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function TabsComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // State for job seeker registration
  const [jobSeekerData, setJobSeekerData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    role: "seeker"
  });

  // State for recruiter registration
  const [recruiterData, setRecruiterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    role: "recruiter"
  });

  const handleJobSeekerChange = (e) => {
    const { id, value, files } = e.target;
    setJobSeekerData(prev => ({
      ...prev,
      [id]: files ? files[0] : value
    }));
    if (error) {
      dispatch(clearError());
    }
  };

  const handleRecruiterChange = (e) => {
    const { id, value } = e.target;
    setRecruiterData(prev => ({
      ...prev,
      [id]: value
    }));
    if (error) {
      dispatch(clearError());
    }
  };

  const handleJobSeekerSubmit = async (e) => {
    e.preventDefault();
    console.log("Job seeker registration attempt with:", jobSeekerData);

    // Validate form
    if (!jobSeekerData.name || !jobSeekerData.email || !jobSeekerData.password || !jobSeekerData.confirmPassword || !jobSeekerData.mobileNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (jobSeekerData.password !== jobSeekerData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(jobSeekerData).forEach(key => {
        if (key !== 'confirmPassword') {
          formData.append(key, jobSeekerData[key]);
        }
      });

      const result = await dispatch(registerUser(formData)).unwrap();
      toast.success("Registration successful");
      console.log("Registration successful:", result);
      navigate('/dashboard');
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error(err.message || "Registration failed");
    }
  };

  const handleRecruiterSubmit = async (e) => {
    e.preventDefault();
    console.log("Recruiter registration attempt with:", recruiterData);

    // Validate form
    if (!recruiterData.name || !recruiterData.email || !recruiterData.password || !recruiterData.confirmPassword || !recruiterData.mobileNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (recruiterData.password !== recruiterData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const result = await dispatch(registerUser(recruiterData)).unwrap();
      toast.success("Registration successful");
      console.log("Registration successful:", result);
      navigate('/dashboard');
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <div className="flex w-full max-w-7xl mx-auto flex-col gap-6">
      <Tabs defaultValue="apply">
        <TabsList>
          <TabsTrigger value="apply">Need a Job?</TabsTrigger>
          <TabsTrigger value="post">Hire Talent</TabsTrigger>
        </TabsList>
        <TabsContent value="apply">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Register</CardTitle>
              <CardDescription>
                Register now to access thousands of job listings tailored to your skills and preferences. Build your profile, upload your resume, and connect directly with top employers. Whether you're a fresher or a seasoned professional, Job Dekho makes your job search easy and effective.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleJobSeekerSubmit}>
              <CardContent className="grid gap-6 grid-cols-3">
                <div className="grid gap-3 col-span-1">
                  <Label htmlFor="name">Username</Label>
                  <Input 
                    id="name" 
                    placeholder="Pablo Escobar" 
                    value={jobSeekerData.name}
                    onChange={handleJobSeekerChange}
                  />
                </div>
                <div className="grid gap-3 col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    type="email" 
                    id="email" 
                    placeholder="example@gmail.com"
                    value={jobSeekerData.email}
                    onChange={handleJobSeekerChange}
                  />
                </div>
                <div className="grid gap-3 col-span-1">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    type="password" 
                    id="password" 
                    placeholder="********"
                    value={jobSeekerData.password}
                    onChange={handleJobSeekerChange}
                  />
                </div>
                <div className="grid gap-3 col-span-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    type="password" 
                    id="confirmPassword" 
                    placeholder="********"
                    value={jobSeekerData.confirmPassword}
                    onChange={handleJobSeekerChange}
                  />
                </div>
                <div className="grid gap-3 col-span-1">
                  <Label htmlFor="mobileNumber">Phone Number</Label>
                  <Input 
                    type="number" 
                    id="mobileNumber" 
                    placeholder="1234567890"
                    value={jobSeekerData.mobileNumber}
                    onChange={handleJobSeekerChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? "Registering..." : "Start Finding"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="post">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Register • Hello Recruiter 👋</CardTitle>
              <CardDescription>
                Post a job and get matched with the best candidates. We'll help you find the right person for the job.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleRecruiterSubmit}>
              <CardContent className="grid gap-6 grid-cols-3">
                <div className="grid gap-3 col-span-1">
                  <Label htmlFor="name">Username</Label>
                  <Input 
                    id="name" 
                    placeholder="Pablo Escobar"
                    value={recruiterData.name}
                    onChange={handleRecruiterChange}
                  />
                </div>
                <div className="grid gap-3 col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    type="email" 
                    id="email" 
                    placeholder="example@gmail.com"
                    value={recruiterData.email}
                    onChange={handleRecruiterChange}
                  />
                </div>
                <div className="grid gap-3 col-span-1">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    type="password" 
                    id="password" 
                    placeholder="********"
                    value={recruiterData.password}
                    onChange={handleRecruiterChange}
                  />
                </div>
                <div className="grid gap-3 col-span-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    type="password" 
                    id="confirmPassword" 
                    placeholder="********"
                    value={recruiterData.confirmPassword}
                    onChange={handleRecruiterChange}
                  />
                </div>
                <div className="grid gap-3 col-span-1">
                  <Label htmlFor="mobileNumber">Phone Number</Label>
                  <Input 
                    type="number" 
                    id="mobileNumber" 
                    placeholder="1234567890"
                    value={recruiterData.mobileNumber}
                    onChange={handleRecruiterChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? "Registering..." : "Save password"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
