import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@/utils/api';

// Thunks
export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const res = await apiService.get('/users/me');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateUserProfile = createAsyncThunk('user/updateProfile', async (profileData, { rejectWithValue }) => {
  try {
    const res = await apiService.put('/users/me', profileData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const uploadUserResume = createAsyncThunk('user/uploadResume', async (file, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiService.post('/users/me/resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deleteUserResume = createAsyncThunk('user/deleteResume', async (resumeUrl, { rejectWithValue }) => {
  try {
    const res = await apiService.delete('/users/me/resume', { url: resumeUrl });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Admin thunks
export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async (params = {}, { rejectWithValue }) => {
  try {
    const res = await apiService.get('/admin/users', params);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const banUser = createAsyncThunk('user/banUser', async (userId, { rejectWithValue }) => {
  try {
    const res = await apiService.put(`/admin/users/${userId}/ban`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const unbanUser = createAsyncThunk('user/unbanUser', async (userId, { rejectWithValue }) => {
  try {
    const res = await apiService.put(`/admin/users/${userId}/ban`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const initialState = {
  profile: null,
  loading: false,
  error: null,
  resumeUploadStatus: 'idle',
  resumeUploadError: null,
  // Admin state
  allUsers: [],
  adminLoading: false,
  adminError: null,
  filters: {
    searchQuery: '',
    role: 'all',
    status: 'all'
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError(state) {
      state.error = null;
      state.resumeUploadError = null;
      state.adminError = null;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    // Optimistic updates for immediate UI feedback
    optimisticallyBanUser(state, action) {
      const userIndex = state.allUsers.findIndex(user => user._id === action.payload);
      if (userIndex !== -1) {
        state.allUsers[userIndex].isBanned = true;
      }
    },
    optimisticallyUnbanUser(state, action) {
      const userIndex = state.allUsers.findIndex(user => user._id === action.payload);
      if (userIndex !== -1) {
        state.allUsers[userIndex].isBanned = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Upload resume
      .addCase(uploadUserResume.pending, (state) => {
        state.resumeUploadStatus = 'loading';
        state.resumeUploadError = null;
      })
      .addCase(uploadUserResume.fulfilled, (state, action) => {
        state.resumeUploadStatus = 'succeeded';
        if (state.profile) {
          state.profile.resumeUrls = [
            ...(state.profile.resumeUrls || []),
            action.payload.url
          ];
        }
      })
      .addCase(uploadUserResume.rejected, (state, action) => {
        state.resumeUploadStatus = 'failed';
        state.resumeUploadError = action.payload;
      })
      // Delete resume
      .addCase(deleteUserResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserResume.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.resumeUrls = state.profile.resumeUrls.filter(url => url !== action.payload.url);
        }
      })
      .addCase(deleteUserResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Admin: Fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.adminLoading = true;
        state.adminError = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.allUsers = action.payload.users;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload;
      })
      // Admin: Ban user
      .addCase(banUser.pending, (state) => {
        // Don't set global loading for individual user actions
        state.adminError = null;
      })
      .addCase(banUser.fulfilled, (state, action) => {
        const userIndex = state.allUsers.findIndex(user => user._id === action.payload._id);
        if (userIndex !== -1) {
          state.allUsers[userIndex] = action.payload;
        }
      })
      .addCase(banUser.rejected, (state, action) => {
        state.adminError = action.payload;
      })
      // Admin: Unban user
      .addCase(unbanUser.pending, (state) => {
        // Don't set global loading for individual user actions
        state.adminError = null;
      })
      .addCase(unbanUser.fulfilled, (state, action) => {
        const userIndex = state.allUsers.findIndex(user => user._id === action.payload._id);
        if (userIndex !== -1) {
          state.allUsers[userIndex] = action.payload;
        }
      })
      .addCase(unbanUser.rejected, (state, action) => {
        state.adminError = action.payload;
      })
  },
});

export const { clearUserError, setFilters, optimisticallyBanUser, optimisticallyUnbanUser } = userSlice.actions;

// Selectors
export const selectAllUsers = (state) => state.user.allUsers;
export const selectAdminLoading = (state) => state.user.adminLoading;
export const selectAdminError = (state) => state.user.adminError;

export default userSlice.reducer;

