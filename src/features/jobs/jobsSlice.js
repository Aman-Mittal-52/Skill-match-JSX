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

const initialState = {
    jobs: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
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
            });
    }
});

// Export actions
export const { setFilters, clearFilters } = jobsSlice.actions;

// Export selectors
export const selectAllJobs = (state) => state.jobs.jobs;
export const selectJobsStatus = (state) => state.jobs.status;
export const selectJobsError = (state) => state.jobs.error;
export const selectJobsFilters = (state) => state.jobs.filters;

// Export reducer
export default jobsSlice.reducer; 