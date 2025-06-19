import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@/lib/api';

// Async thunk for registration
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            console.log('Attempting registration with:', userData);
            const response = await apiService.post('/auth/register', userData);
            console.log('Registration response:', response);

            // Store token in localStorage
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            return response;
        } catch (error) {
            console.error('Registration error:', error);
            return rejectWithValue(error.response?.data || 'Registration failed');
        }
    }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            console.log('Attempting login with:', credentials);
            const response = await apiService.post('/auth/login', credentials);
            console.log('Login response:', response);

            if (!response.data) {
                throw new Error('No data received from server');
            }

            // Store token in localStorage
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Login failed';
            return rejectWithValue(errorMessage);
        }
    }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            console.log('Attempting to logout...');
            // You can add API call here if needed for server-side logout
            // const response = await apiService.post('/auth/logout');

            // Clear local storage
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');

            console.log('Logout successful');
            return true;
        } catch (error) {
            console.error('Logout error:', error);
            return rejectWithValue(error.message || 'Logout failed');
        }
    }
);

// Async thunk for fetching job details
export const fetchJobDetails = createAsyncThunk(
    'jobs/fetchJobDetails',
    async (jobId, { rejectWithValue }) => {
        try {
            console.log('Fetching job details for ID:', jobId); // Debug log
            const response = await apiService.get(`/jobs/${jobId}`);
            console.log('Job details response:', response); // Debug log
            return response.data;
        } catch (error) {
            console.error('Error fetching job details:', error); // Debug log
            return rejectWithValue(error.response?.data || 'Failed to fetch job details');
        }
    }
);

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('authToken'),
    isAuthenticated: localStorage.getItem('authToken') ? true : false,
    loading: false,
    error: null,
    currentJob: null, // Add this for storing current job details
    jobLoading: false, // Add this for job loading state
    jobError: null // Add this for job error state
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            console.log('Clearing auth state...');
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            console.log('Auth state cleared successfully');
        },
        clearError: (state) => {
            state.error = null;
        },
        clearJobError: (state) => {
            state.jobError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Registration cases
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout cases
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Job details cases
            .addCase(fetchJobDetails.pending, (state) => {
                state.jobLoading = true;
                state.jobError = null;
            })
            .addCase(fetchJobDetails.fulfilled, (state, action) => {
                state.jobLoading = false;
                state.currentJob = action.payload;
            })
            .addCase(fetchJobDetails.rejected, (state, action) => {
                state.jobLoading = false;
                state.jobError = action.payload;
            });
    }
});

export const { logout, clearError, clearJobError } = authSlice.actions;
export default authSlice.reducer; 