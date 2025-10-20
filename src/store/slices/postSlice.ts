import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';
import type { Post, Comment, PostFilters } from '../../types';

interface PostState {
  posts: Post[];
  currentPost: Post | null;
  comments: Comment[];
  filters: PostFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  currentPost: null,
  comments: [],
  filters: {
    type: 'all',
    interests: [],
    sortBy: 'recent',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  isLoading: false,
  error: null,
};

// Async thunks
export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async ({ page = 1, limit = 10, filters }: { page?: number; limit?: number; filters?: PostFilters }, { rejectWithValue }) => {
    try {
      const response = await apiService.getPosts(page, limit, filters);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get posts');
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: any, { rejectWithValue }) => {
    try {
      const response = await apiService.createPost(postData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create post');
    }
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (postId: string, { rejectWithValue }) => {
    try {
      await apiService.likePost(postId);
      return postId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to like post');
    }
  }
);

export const unlikePost = createAsyncThunk(
  'posts/unlikePost',
  async (postId: string, { rejectWithValue }) => {
    try {
      await apiService.unlikePost(postId);
      return postId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to unlike post');
    }
  }
);

export const bookmarkPost = createAsyncThunk(
  'posts/bookmarkPost',
  async (postId: string, { rejectWithValue }) => {
    try {
      await apiService.bookmarkPost(postId);
      return postId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to bookmark post');
    }
  }
);

export const unbookmarkPost = createAsyncThunk(
  'posts/unbookmarkPost',
  async (postId: string, { rejectWithValue }) => {
    try {
      await apiService.unbookmarkPost(postId);
      return postId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to unbookmark post');
    }
  }
);

export const getComments = createAsyncThunk(
  'posts/getComments',
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.getComments(postId);
      return { postId, comments: response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get comments');
    }
  }
);

export const createComment = createAsyncThunk(
  'posts/createComment',
  async ({ postId, content }: { postId: string; content: string }, { rejectWithValue }) => {
    try {
      const response = await apiService.createComment(postId, content);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create comment');
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<PostFilters>) => {
      state.filters = action.payload;
    },
    clearPosts: (state) => {
      state.posts = [];
      state.pagination = initialState.pagination;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPost: (state, action: PayloadAction<Post>) => {
      state.currentPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Posts
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.pagination.page === 1) {
          state.posts = action.payload.data;
        } else {
          state.posts = [...state.posts, ...action.payload.data];
        }
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Post
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.unshift(action.payload);
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Like Post
      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.posts.find(p => p.id === action.payload);
        if (post) {
          post.isLiked = true;
          post.likes += 1;
        }
        if (state.currentPost && state.currentPost.id === action.payload) {
          state.currentPost.isLiked = true;
          state.currentPost.likes += 1;
        }
      })
      // Unlike Post
      .addCase(unlikePost.fulfilled, (state, action) => {
        const post = state.posts.find(p => p.id === action.payload);
        if (post) {
          post.isLiked = false;
          post.likes -= 1;
        }
        if (state.currentPost && state.currentPost.id === action.payload) {
          state.currentPost.isLiked = false;
          state.currentPost.likes -= 1;
        }
      })
      // Bookmark Post
      .addCase(bookmarkPost.fulfilled, (state, action) => {
        const post = state.posts.find(p => p.id === action.payload);
        if (post) {
          post.isBookmarked = true;
        }
        if (state.currentPost && state.currentPost.id === action.payload) {
          state.currentPost.isBookmarked = true;
        }
      })
      // Unbookmark Post
      .addCase(unbookmarkPost.fulfilled, (state, action) => {
        const post = state.posts.find(p => p.id === action.payload);
        if (post) {
          post.isBookmarked = false;
        }
        if (state.currentPost && state.currentPost.id === action.payload) {
          state.currentPost.isBookmarked = false;
        }
      })
      // Get Comments
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload.comments;
      })
      // Create Comment
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        const post = state.posts.find(p => p.id === action.payload.postId);
        if (post) {
          post.comments += 1;
        }
        if (state.currentPost && state.currentPost.id === action.payload.postId) {
          state.currentPost.comments += 1;
        }
      });
  },
});

export const { setFilters, clearPosts, clearError, setCurrentPost } = postSlice.actions;
export default postSlice.reducer;
