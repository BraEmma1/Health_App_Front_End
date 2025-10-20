import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';
import type { User, HealthInterest } from '../../types';

interface UserState {
  currentUser: User | null;
  selectedUser: User | null;
  interests: HealthInterest[];
  userInterests: string[];
  followers: User[];
  following: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  selectedUser: null,
  interests: [],
  userInterests: [],
  followers: [],
  following: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ userId, data }: { userId: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateProfile(userId, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.getUserProfile(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get user profile');
    }
  }
);

export const followUser = createAsyncThunk(
  'user/followUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      await apiService.followUser(userId);
      return userId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to follow user');
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      await apiService.unfollowUser(userId);
      return userId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to unfollow user');
    }
  }
);

export const getUserInterests = createAsyncThunk(
  'user/getUserInterests',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.getUserInterests(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get user interests');
    }
  }
);

export const updateUserInterests = createAsyncThunk(
  'user/updateUserInterests',
  async ({ userId, interests }: { userId: string; interests: string[] }, { rejectWithValue }) => {
    try {
      await apiService.updateUserInterests(userId, interests);
      return interests;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update interests');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    setInterests: (state, action: PayloadAction<HealthInterest[]>) => {
      state.interests = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get User Profile
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedUser = action.payload;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Follow User
      .addCase(followUser.fulfilled, (state, action) => {
        if (state.selectedUser && state.selectedUser.id === action.payload) {
          state.selectedUser.followers += 1;
        }
        if (state.currentUser) {
          state.currentUser.following += 1;
        }
      })
      // Unfollow User
      .addCase(unfollowUser.fulfilled, (state, action) => {
        if (state.selectedUser && state.selectedUser.id === action.payload) {
          state.selectedUser.followers -= 1;
        }
        if (state.currentUser) {
          state.currentUser.following -= 1;
        }
      })
      // Get User Interests
      .addCase(getUserInterests.fulfilled, (state, action) => {
        state.userInterests = action.payload;
      })
      // Update User Interests
      .addCase(updateUserInterests.fulfilled, (state, action) => {
        state.userInterests = action.payload;
      });
  },
});

export const { setCurrentUser, clearSelectedUser, setInterests, clearError } = userSlice.actions;
export default userSlice.reducer;
