import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@/lib/api';

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

const initialState = {
    jobs: [],
    postedJobs: [], // Add posted jobs array
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    applicationStatus: 'idle', // Track application status separately
    applicationError: null,
    postStatus: 'idle', // Track post status
    postError: null,
    deleteStatus: 'idle', // Add delete status
    deleteError: null, // Add delete error
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
                state.status = 'loading';
                state.error = null;
            })
            .addCase(toggleJobStatus.fulfilled, (state, action) => {
                console.log('Job status toggled successfully:', action.payload);
                state.status = 'succeeded';
                // Update the specific job in postedJobs array
                const index = state.postedJobs.findIndex(job => job._id === action.payload._id);
                if (index !== -1) {
                    state.postedJobs[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(toggleJobStatus.rejected, (state, action) => {
                console.error('Failed to toggle job status:', action.payload);
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

// Export actions
export const { setFilters, clearFilters } = jobsSlice.actions;

// Export selectors
export const selectAllJobs = (state) => state.jobs.jobs;
export const selectPostedJobs = (state) => state.jobs.postedJobs;
export const selectJobsStatus = (state) => state.jobs.status;
export const selectJobsError = (state) => state.jobs.error;
export const selectJobsFilters = (state) => state.jobs.filters;
export const selectApplicationStatus = (state) => state.jobs.applicationStatus;
export const selectApplicationError = (state) => state.jobs.applicationError;
export const selectPostStatus = (state) => state.jobs.postStatus;
export const selectPostError = (state) => state.jobs.postError;
export const selectDeleteStatus = (state) => state.jobs.deleteStatus;
export const selectDeleteError = (state) => state.jobs.deleteError;

// Export reducer
export default jobsSlice.reducer; 