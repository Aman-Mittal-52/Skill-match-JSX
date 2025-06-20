import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@/utils/api';

// Async thunk for fetching jobs
export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async (_, { rejectWithValue }) => {
        try {
            console.log('Fetching jobs from API...');
            const response = await apiService.get('/jobs');
            console.log('Jobs fetched successfully:', response);
            return response.data;
        } catch (error) {
            console.error('Error fetching jobs:', error);
            return rejectWithValue(error.response?.data || 'Failed to fetch jobs');
        }
    }
);

// Async thunk for searching jobs
export const searchJobs = createAsyncThunk(
    'jobs/searchJobs',
    async (searchQuery, { rejectWithValue }) => {
        try {
            console.log('Searching jobs with query:', searchQuery); // Debug log
            const response = await apiService.get(`/jobs/search?query=${encodeURIComponent(searchQuery)}`);
            console.log('Search results:', response.data); // Debug log
            return response.data;
        } catch (error) {
            console.error('Error searching jobs:', error);
            return rejectWithValue(error.response?.data || 'Failed to search jobs');
        }
    }
);

// Async thunk for applying to a job
export const applyToJob = createAsyncThunk(
    'jobs/applyToJob',
    async (jobId, { rejectWithValue }) => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (!user) {
            toast.error('Please login to apply for jobs');
            return rejectWithValue('User logged out');
        }

        const phone = user?.mobileNumber
        try {
            console.log('Applying to job:', jobId);
            const response = await apiService.post(`/jobs/${jobId}/apply`, {
                phone
            });
            console.log('Application submitted successfully:', response);

            // Check if the response indicates already applied
            if (response.data && response.data.message === 'You have already applied to this job') {
                return rejectWithValue(`${user.name} has already applied to this job`);
            }

            return response.data;
        } catch (error) {
            console.error('Error applying to job:', error);
            
            // Handle the case where the API returns a 400 with "already applied" message
            if (error.response && error.response.status === 400 && error.response.data && error.response.data.message === 'already applied') {
                return rejectWithValue('You have already applied to this job');
            }
            
            return rejectWithValue(error.response?.data || 'Failed to apply to job');
        }
    }
);

// Async thunk for posting a job
export const postJob = createAsyncThunk(
    'jobs/postJob',
    async (jobData, { rejectWithValue }) => {
        try {
            console.log('Posting new job:', jobData);
            const response = await apiService.post('/jobs', jobData);
            console.log('Job posted successfully:', response);
            return response.data;
        } catch (error) {
            console.error('Error posting job:', error);
            return rejectWithValue(error.response?.data || 'Failed to post job');
        }
    }
);

// Async thunk for fetching posted jobs
export const fetchPostedJobs = createAsyncThunk(
    'jobs/fetchPostedJobs',
    async (_, { rejectWithValue }) => {
        try {
            console.log('Fetching posted jobs...');
            const response = await apiService.get('/jobs/recruiter/jobs');
            console.log('Posted jobs fetched successfully:', response);
            return response.data;
        } catch (error) {
            console.error('Error fetching posted jobs:', error);
            return rejectWithValue(error.response?.data || 'Failed to fetch posted jobs');
        }
    }
);

// Async thunk for deleting a job
export const deleteJob = createAsyncThunk(
    'jobs/deleteJob',
    async (jobId, { rejectWithValue }) => {
        try {
            console.log('Deleting job:', jobId);
            const response = await apiService.delete(`/jobs/${jobId}`);
            console.log('Job deleted successfully:', response);
            return jobId;
        } catch (error) {
            console.error('Error deleting job:', error);
            return rejectWithValue(error.response?.data || 'Failed to delete job');
        }
    }
);

// Async thunk for updating a job
export const updateJob = createAsyncThunk(
    'jobs/updateJob',
    async ({ jobId, jobData }, { rejectWithValue }) => {
        try {
            console.log('Updating job:', jobId, jobData);
            const response = await apiService.put(`/jobs/${jobId}`, jobData);
            console.log('Job updated successfully:', response);
            return response.data;
        } catch (error) {
            console.error('Error updating job:', error);
            return rejectWithValue(error.response?.data || 'Failed to update job');
        }
    }
);

// Async thunk for toggling job status
export const toggleJobStatus = createAsyncThunk(
    'jobs/toggleJobStatus',
    async (jobId, { rejectWithValue, getState }) => {
        try {
            console.log('Toggling job status:', jobId);
            const state = getState();
            const job = state.jobs.postedJobs.find(j => j._id === jobId);
            if (!job) {
                return rejectWithValue('Job not found');
            }
            
            const newStatus = job.status === 'open' ? 'closed' : 'open';
            const response = await apiService.put(`/jobs/${jobId}`, { status: newStatus });
            console.log('Job status toggled successfully:', response);
            return response.data;
        } catch (error) {
            console.error('Error toggling job status:', error);
            return rejectWithValue(error.response?.data || 'Failed to toggle job status');
        }
    }
);

// Async thunk for fetching admin jobs
export const fetchAdminJobs = createAsyncThunk(
    'jobs/fetchAdminJobs',
    async (_, { rejectWithValue }) => {
        try {
            console.log('Fetching admin jobs...');
            const response = await apiService.get('/admin/jobs');
            console.log('Admin jobs response:', response);
            console.log('Admin jobs response.data:', response.data);
            console.log('Admin jobs response.data.jobs:', response.data.jobs);
            
            // Handle the nested structure: response.data.jobs
            const jobsData = response.data.jobs || response.data;
            console.log('Final jobs data to be returned:', jobsData);
            return jobsData;
        } catch (error) {
            console.error('Error fetching admin jobs:', error);
            return rejectWithValue(error.response?.data || 'Failed to fetch admin jobs');
        }
    }
);

// Async thunk for admin to delete a job
export const adminDeleteJob = createAsyncThunk(
    'jobs/adminDeleteJob',
    async (jobId, { rejectWithValue }) => {
        try {
            console.log('Admin deleting job:', jobId);
            const response = await apiService.delete(`/admin/jobs/${jobId}`);
            console.log('Job deleted successfully by admin:', response);
            return jobId;
        } catch (error) {
            console.error('Error deleting job as admin:', error);
            return rejectWithValue(error.response?.data || 'Failed to delete job');
        }
    }
);

// Async thunk for admin to update job status
export const adminUpdateJobStatus = createAsyncThunk(
    'jobs/adminUpdateJobStatus',
    async ({ jobId, status }, { rejectWithValue }) => {
        try {
            console.log('Admin updating job status:', jobId, status);
            const response = await apiService.put(`/admin/jobs/${jobId}`, { status });
            console.log('Job status updated successfully by admin:', response);
            return response.data;
        } catch (error) {
            console.error('Error updating job status as admin:', error);
            return rejectWithValue(error.response?.data || 'Failed to update job status');
        }
    }
);

const initialState = {
    jobs: [],
    postedJobs: [], // Add posted jobs array
    adminJobs: [], // Add admin jobs array
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    applicationStatus: 'idle', // Track application status separately
    applicationError: null,
    postStatus: 'idle', // Track post status
    postError: null,
    deleteStatus: 'idle', // Add delete status
    deleteError: null, // Add delete error
    toggleStatus: 'idle', // Track toggle status separately
    toggleError: null, // Track toggle error separately
    adminJobsStatus: 'idle', // Track admin jobs status
    adminJobsError: null, // Track admin jobs error
    adminDeleteStatus: 'idle', // Track admin delete status
    adminDeleteError: null, // Track admin delete error
    adminUpdateStatus: 'idle', // Track admin update status
    adminUpdateError: null, // Track admin update error
    filters: {
        searchQuery: '',
        jobType: 'all',
        location: 'all',
        tags: []
    }
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = initialState.filters;
        },
        // Optimistic updates for admin actions
        optimisticallyUpdateJobStatus: (state, action) => {
            const { jobId, status } = action.payload;
            const jobIndex = state.adminJobs.findIndex(job => job._id === jobId);
            if (jobIndex !== -1) {
                state.adminJobs[jobIndex].status = status;
            }
        },
        optimisticallyDeleteJob: (state, action) => {
            const jobId = action.payload;
            state.adminJobs = state.adminJobs.filter(job => job._id !== jobId);
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchJobs cases
            .addCase(fetchJobs.pending, (state) => {
                console.log('Fetching jobs...');
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                console.log('Jobs fetched successfully:', action.payload);
                state.status = 'succeeded';
                state.jobs = action.payload;
                state.error = null;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                console.error('Failed to fetch jobs:', action.payload);
                state.status = 'failed';
                state.error = action.payload;
            })
            // Handle searchJobs cases
            .addCase(searchJobs.pending, (state) => {
                console.log('Searching jobs...'); // Debug log
                state.status = 'loading';
                state.error = null;
            })
            .addCase(searchJobs.fulfilled, (state, action) => {
                console.log('Search completed successfully:', action.payload); // Debug log
                state.status = 'succeeded';
                state.jobs = action.payload;
                state.error = null;
            })
            .addCase(searchJobs.rejected, (state, action) => {
                console.error('Search failed:', action.payload); // Debug log
                state.status = 'failed';
                state.error = action.payload;
            })
            // Handle applyToJob cases
            .addCase(applyToJob.pending, (state) => {
                console.log('Submitting job application...');
                state.applicationStatus = 'loading';
                state.applicationError = null;
            })
            .addCase(applyToJob.fulfilled, (state, action) => {
                console.log('Application submitted successfully:', action.payload);
                state.applicationStatus = 'succeeded';
                state.applicationError = null;
            })
            .addCase(applyToJob.rejected, (state, action) => {
                state.applicationStatus = 'failed';
                state.applicationError = action.payload;
            })
            // Handle postJob cases
            .addCase(postJob.pending, (state) => {
                console.log('Posting job...');
                state.postStatus = 'loading';
                state.postError = null;
            })
            .addCase(postJob.fulfilled, (state, action) => {
                console.log('Job posted successfully:', action.payload);
                state.postStatus = 'succeeded';
                state.postError = null;
                state.jobs.unshift(action.payload); // Add new job to the beginning of the list
            })
            .addCase(postJob.rejected, (state, action) => {
                console.error('Failed to post job:', action.payload);
                state.postStatus = 'failed';
                state.postError = action.payload;
            })
            // Handle fetchPostedJobs cases
            .addCase(fetchPostedJobs.pending, (state) => {
                console.log('Fetching posted jobs...');
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchPostedJobs.fulfilled, (state, action) => {
                console.log('Posted jobs fetched successfully:', action.payload);
                state.status = 'succeeded';
                state.postedJobs = action.payload;
                state.error = null;
            })
            .addCase(fetchPostedJobs.rejected, (state, action) => {
                console.error('Failed to fetch posted jobs:', action.payload);
                state.status = 'failed';
                state.error = action.payload;
            })
            // Handle deleteJob cases
            .addCase(deleteJob.pending, (state) => {
                console.log('Deleting job...');
                state.deleteStatus = 'loading';
                state.deleteError = null;
            })
            .addCase(deleteJob.fulfilled, (state, action) => {
                console.log('Job deleted successfully:', action.payload);
                state.deleteStatus = 'succeeded';
                state.deleteError = null;
                state.postedJobs = state.postedJobs.filter(job => job._id !== action.payload);
            })
            .addCase(deleteJob.rejected, (state, action) => {
                console.error('Failed to delete job:', action.payload);
                state.deleteStatus = 'failed';
                state.deleteError = action.payload;
            })
            // Handle updateJob cases
            .addCase(updateJob.pending, (state) => {
                console.log('Updating job...');
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateJob.fulfilled, (state, action) => {
                console.log('Job updated successfully:', action.payload);
                state.status = 'succeeded';
                // Update the specific job in postedJobs array
                const index = state.postedJobs.findIndex(job => job._id === action.payload._id);
                if (index !== -1) {
                    state.postedJobs[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateJob.rejected, (state, action) => {
                console.error('Failed to update job:', action.payload);
                state.status = 'failed';
                state.error = action.payload;
            })
            // Handle toggleJobStatus cases
            .addCase(toggleJobStatus.pending, (state) => {
                console.log('Toggling job status...');
                state.toggleStatus = 'loading';
                state.toggleError = null;
            })
            .addCase(toggleJobStatus.fulfilled, (state, action) => {
                console.log('Job status toggled successfully:', action.payload);
                state.toggleStatus = 'succeeded';
                // Update the specific job in postedJobs array
                const index = state.postedJobs.findIndex(job => job._id === action.payload._id);
                if (index !== -1) {
                    state.postedJobs[index] = action.payload;
                }
                state.toggleError = null;
            })
            .addCase(toggleJobStatus.rejected, (state, action) => {
                console.error('Failed to toggle job status:', action.payload);
                state.toggleStatus = 'failed';
                state.toggleError = action.payload;
            })
            // Handle fetchAdminJobs cases
            .addCase(fetchAdminJobs.pending, (state) => {
                console.log('Fetching admin jobs...');
                state.adminJobsStatus = 'loading';
                state.adminJobsError = null;
            })
            .addCase(fetchAdminJobs.fulfilled, (state, action) => {
                console.log('Admin jobs fetched successfully:', action.payload);
                state.adminJobsStatus = 'succeeded';
                state.adminJobs = action.payload;
                state.adminJobsError = null;
            })
            .addCase(fetchAdminJobs.rejected, (state, action) => {
                console.error('Failed to fetch admin jobs:', action.payload);
                state.adminJobsStatus = 'failed';
                state.adminJobsError = action.payload;
            })
            // Handle adminDeleteJob cases
            .addCase(adminDeleteJob.pending, (state) => {
                console.log('Admin deleting job...');
                state.adminDeleteStatus = 'loading';
                state.adminDeleteError = null;
            })
            .addCase(adminDeleteJob.fulfilled, (state, action) => {
                console.log('Job deleted successfully by admin:', action.payload);
                state.adminDeleteStatus = 'succeeded';
                state.adminDeleteError = null;
                state.adminJobs = state.adminJobs.filter(job => job._id !== action.payload);
            })
            .addCase(adminDeleteJob.rejected, (state, action) => {
                console.error('Failed to delete job as admin:', action.payload);
                state.adminDeleteStatus = 'failed';
                state.adminDeleteError = action.payload;
            })
            // Handle adminUpdateJobStatus cases
            .addCase(adminUpdateJobStatus.pending, (state) => {
                console.log('Admin updating job status...');
                state.adminUpdateStatus = 'loading';
                state.adminUpdateError = null;
            })
            .addCase(adminUpdateJobStatus.fulfilled, (state, action) => {
                console.log('Job status updated successfully by admin:', action.payload);
                state.adminUpdateStatus = 'succeeded';
                // Update the specific job in adminJobs array
                const index = state.adminJobs.findIndex(job => job._id === action.payload._id);
                if (index !== -1) {
                    state.adminJobs[index] = action.payload;
                }
                state.adminUpdateError = null;
            })
            .addCase(adminUpdateJobStatus.rejected, (state, action) => {
                console.error('Failed to update job status as admin:', action.payload);
                state.adminUpdateStatus = 'failed';
                state.adminUpdateError = action.payload;
            });
    }
});

// Export actions
export const { setFilters, clearFilters, optimisticallyUpdateJobStatus, optimisticallyDeleteJob } = jobsSlice.actions;

// Export selectors
export const selectAllJobs = (state) => state.jobs.jobs;
export const selectPostedJobs = (state) => state.jobs.postedJobs;
export const selectAdminJobs = (state) => state.jobs.adminJobs;
export const selectJobsStatus = (state) => state.jobs.status;
export const selectJobsError = (state) => state.jobs.error;
export const selectJobsFilters = (state) => state.jobs.filters;
export const selectApplicationStatus = (state) => state.jobs.applicationStatus;
export const selectApplicationError = (state) => state.jobs.applicationError;
export const selectPostStatus = (state) => state.jobs.postStatus;
export const selectPostError = (state) => state.jobs.postError;
export const selectDeleteStatus = (state) => state.jobs.deleteStatus;
export const selectDeleteError = (state) => state.jobs.deleteError;
export const selectToggleStatus = (state) => state.jobs.toggleStatus;
export const selectToggleError = (state) => state.jobs.toggleError;
export const selectAdminJobsStatus = (state) => state.jobs.adminJobsStatus;
export const selectAdminJobsError = (state) => state.jobs.adminJobsError;
export const selectAdminDeleteStatus = (state) => state.jobs.adminDeleteStatus;
export const selectAdminDeleteError = (state) => state.jobs.adminDeleteError;
export const selectAdminUpdateStatus = (state) => state.jobs.adminUpdateStatus;
export const selectAdminUpdateError = (state) => state.jobs.adminUpdateError;

// Export reducer
export default jobsSlice.reducer; 