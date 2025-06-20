import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile, uploadUserResume, clearUserError, deleteUserResume } from '@/features/user/userSlice';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, Loader, Plus, ExternalLink } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { User, Pen, Trash2, File } from 'lucide-react';
import { BigLoader } from '@/components/ui/BigLoader';

export default function Profile() {
  const dispatch = useDispatch();
  const { profile, loading, error, resumeUploadStatus, resumeUploadError } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', mobileNumber: '' });
  const fileInputRef = useRef();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        mobileNumber: profile.mobileNumber || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearUserError());
    }
    if (resumeUploadError) {
      toast.error(resumeUploadError);
      dispatch(clearUserError());
    }
  }, [error, resumeUploadError, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setEditDialogOpen(true);
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setFormData({
      name: profile?.name || '',
      email: profile?.email || '',
      mobileNumber: profile?.mobileNumber || '',
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserProfile(formData)).unwrap();
      toast.success('Profile updated!');
      setEditMode(false);
    } catch (err) {
      // error handled by slice
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      await dispatch(uploadUserResume(file)).unwrap();
      toast.success('Resume uploaded!');
    } catch (err) {
      // error handled by slice
    }
  };

  const handleDeleteResume = async () => {
    if (!resumeToDelete) return;
    try {
      await dispatch(deleteUserResume(resumeToDelete)).unwrap();
      toast.success('Resume deleted!');
      setDeleteDialogOpen(false);
      setResumeToDelete(null);
    } catch (err) {
      // error handled by slice
    }
  };

  if (loading && !profile) {
    return (
      <BigLoader />
    );
  }

  return (
    <div className="flex flex-col mt-4 sm:mt-10 items-center min-h-[calc(100vh-200px)] px-4 sm:px-6 lg:px-8">

      <div className='w-full max-w-7xl border p-4 sm:p-6 lg:p-8 rounded-2xl mb-6 sm:mb-8 bg-background'>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
          <Avatar className="h-16 w-16 sm:h-20 sm:w-20 text-2xl sm:text-3xl">
            <AvatarFallback>{profile?.name?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-xl sm:text-2xl font-semibold truncate">{profile?.name || 'User'}</div>
            <div className="text-gray-400 text-sm sm:text-base truncate">{profile?.mobileNumber || 'mobile number'}</div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-gray-400">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-base sm:text-lg">{profile?.role || 'Role'}</span>
            </div>
            <Button size="sm" variant="outline" onClick={handleEdit} className="mt-2 w-full sm:w-auto">
              <Pen className="w-4 h-4 mr-1" /> Edit
            </Button>
          </div>
        </div>
      </div>


      <div className="w-full max-w-7xl rounded-2xl">

        {/* Resumes Section */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="text-xl sm:text-2xl font-semibold">Resume</span>
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={resumeUploadStatus === 'loading'}
            className="w-full sm:w-auto"
          >
            {resumeUploadStatus === 'loading' ? (
              <Loader className="animate-spin w-4 h-4 mr-2" />
            ) : null}
            Upload Resume
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {profile?.resumeUrls && profile.resumeUrls.length > 0 ? (
            profile.resumeUrls.map((url, index) => (
              <div key={index} className="flex items-center bg-background border rounded-lg px-3 sm:px-4 py-3 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-1.5 sm:p-2 flex-shrink-0">
                    <File className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm sm:text-base truncate">
                      Resume {profile.resumeUrls.length > 1 ? index + 1 : ''}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground truncate">
                      {url.split('/').pop() || `Resume ${index + 1}`}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(url, '_blank')}
                  className="flex items-center space-x-1 flex-shrink-0"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span className="hidden sm:inline">View</span>
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center py-6 sm:py-8 bg-gray-50 rounded-lg col-span-1 sm:col-span-2 lg:col-span-3">
              <File className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm sm:text-base">No resume files uploaded</p>
            </div>
          )}
        </div>
        <input
          type="file"
          accept=".pdf,image/*"
          ref={fileInputRef}
          onChange={handleResumeUpload}
          className="hidden"
          disabled={resumeUploadStatus === 'loading'}
        />

        <div className='w-full mt-5 max-w-7xl border-2 p-4 sm:p-6 lg:p-8 rounded-2xl mb-6 sm:mb-8 bg-background'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <span className='text-xl sm:text-2xl font-semibold'>Applied Jobs</span>
            <Button variant="outline" className="w-full sm:w-auto">
              <Eye className='w-4 h-4 mr-1' /> View All
            </Button>
          </div>
        </div>
      
        <div className="mt-6 sm:mt-8">
          <span className="text-xs text-gray-400">Profile information is private and secure.</span>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? <Loader className="animate-spin w-4 h-4 mr-2" /> : null}
                Save
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={handleEditDialogClose} disabled={loading} className="w-full sm:w-auto">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Resume Alert Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-sm sm:text-base text-gray-300">This action cannot be undone. This will permanently delete your resume.</div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="destructive" onClick={handleDeleteResume} disabled={loading} className="w-full sm:w-auto">
              {loading ? <Loader className="animate-spin w-4 h-4 mr-2" /> : null}
              Delete
            </Button>
            <DialogClose asChild>
              <Button variant="outline" type="button" onClick={() => setDeleteDialogOpen(false)} disabled={loading} className="w-full sm:w-auto">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 