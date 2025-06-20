import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@/utils/api';

// Async thunk to fetch current user's applications
export const fetchUserApplications = createAsyncThunk(
  'application/fetchUserApplications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get('/applications/me');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch applications');
    }
  }
);

// Async thunk to fetch applications for a specific job (for recruiters)
export const fetchJobApplications = createAsyncThunk(
  'application/fetchJobApplications',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await apiService.get(`/applications/job/${jobId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch job applications');
    }
  }
);

// Async thunk to update application status (for recruiters)
export const updateApplicationStatus = createAsyncThunk(
  'application/updateApplicationStatus',
  async ({ applicationId, status }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(`/applications/${applicationId}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update application status');
    }
  }
);

const initialState = {
  applications: [],
  jobApplications: [], // Applications for a specific job
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  jobApplicationsStatus: 'idle', // Status for job-specific applications
  updateStatusStatus: 'idle', // Status for updating application status
  error: null,
  jobApplicationsError: null,
  updateStatusError: null,
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    clearApplicationsError: (state) => {
      state.error = null;
    },
    clearJobApplicationsError: (state) => {
      state.jobApplicationsError = null;
    },
    clearUpdateStatusError: (state) => {
      state.updateStatusError = null;
    },
    clearJobApplications: (state) => {
      state.jobApplications = [];
      state.jobApplicationsStatus = 'idle';
      state.jobApplicationsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // User applications
      .addCase(fetchUserApplications.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserApplications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.applications = action.payload;
        state.error = null;
      })
      .addCase(fetchUserApplications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Job applications
      .addCase(fetchJobApplications.pending, (state) => {
        state.jobApplicationsStatus = 'loading';
        state.jobApplicationsError = null;
      })
      .addCase(fetchJobApplications.fulfilled, (state, action) => {
        state.jobApplicationsStatus = 'succeeded';
        state.jobApplications = action.payload;
        state.jobApplicationsError = null;
      })
      .addCase(fetchJobApplications.rejected, (state, action) => {
        state.jobApplicationsStatus = 'failed';
        state.jobApplicationsError = action.payload;
      })
      // Update application status
      .addCase(updateApplicationStatus.pending, (state) => {
        state.updateStatusStatus = 'loading';
        state.updateStatusError = null;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.updateStatusStatus = 'succeeded';
        state.updateStatusError = null;
        
        // Update the application in jobApplications array
        const updatedApplication = action.payload;
        const index = state.jobApplications.findIndex(app => app._id === updatedApplication._id);
        if (index !== -1) {
          state.jobApplications[index] = updatedApplication;
        }
        
        // Also update in user applications if it exists there
        const userAppIndex = state.applications.findIndex(app => app._id === updatedApplication._id);
        if (userAppIndex !== -1) {
          state.applications[userAppIndex] = updatedApplication;
        }
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.updateStatusStatus = 'failed';
        state.updateStatusError = action.payload;
      });
  },
});

export const { 
  clearApplicationsError, 
  clearJobApplicationsError, 
  clearJobApplications,
  clearUpdateStatusError
} = applicationSlice.actions;

// Selectors
export const selectUserApplications = (state) => state.application.applications;
export const selectApplicationsStatus = (state) => state.application.status;
export const selectApplicationsError = (state) => state.application.error;

// Job applications selectors
export const selectJobApplications = (state) => state.application.jobApplications;
export const selectJobApplicationsStatus = (state) => state.application.jobApplicationsStatus;
export const selectJobApplicationsError = (state) => state.application.jobApplicationsError;

// Update status selectors
export const selectUpdateStatusStatus = (state) => state.application.updateStatusStatus;
export const selectUpdateStatusError = (state) => state.application.updateStatusError;

export default applicationSlice.reducer;
