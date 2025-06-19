import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@/lib/api';

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

const initialState = {
  applications: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    clearApplicationsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { clearApplicationsError } = applicationSlice.actions;

// Selectors
export const selectUserApplications = (state) => state.application.applications;
export const selectApplicationsStatus = (state) => state.application.status;
export const selectApplicationsError = (state) => state.application.error;

export default applicationSlice.reducer;
