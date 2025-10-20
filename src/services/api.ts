import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import type { ApiResponse, PaginatedResponse } from '../types';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API service class
class ApiService {
  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<{ user: any; token: string }>> {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  }

  async register(userData: any): Promise<ApiResponse<{ user: any; token: string }>> {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }

  async googleAuth(googleToken: string): Promise<ApiResponse<{ user: any; token: string }>> {
    const response = await api.post('/auth/google', { token: googleToken });
    return response.data;
  }

  async logout(): Promise<ApiResponse<null>> {
    const response = await api.post('/auth/logout');
    return response.data;
  }

  // User endpoints
  async getCurrentUser(): Promise<ApiResponse<any>> {
    const response = await api.get('/users/me');
    return response.data;
  }

  async updateProfile(userId: string, data: any): Promise<ApiResponse<any>> {
    const response = await api.put(`/users/${userId}`, data);
    return response.data;
  }

  async getUserProfile(userId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  }

  async followUser(userId: string): Promise<ApiResponse<null>> {
    const response = await api.post(`/users/${userId}/follow`);
    return response.data;
  }

  async unfollowUser(userId: string): Promise<ApiResponse<null>> {
    const response = await api.delete(`/users/${userId}/follow`);
    return response.data;
  }

  // Interest endpoints
  async getUserInterests(userId: string): Promise<ApiResponse<string[]>> {
    const response = await api.get(`/users/${userId}/interests`);
    return response.data;
  }

  async updateUserInterests(userId: string, interests: string[]): Promise<ApiResponse<null>> {
    const response = await api.put(`/users/${userId}/interests`, { interests });
    return response.data;
  }

  // Post endpoints
  async getPosts(page: number = 1, limit: number = 10, filters?: any): Promise<PaginatedResponse<any>> {
    const response = await api.get('/posts', {
      params: { page, limit, ...filters }
    });
    return response.data;
  }

  async createPost(data: any): Promise<ApiResponse<any>> {
    const response = await api.post('/posts', data);
    return response.data;
  }

  async likePost(postId: string): Promise<ApiResponse<null>> {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  }

  async unlikePost(postId: string): Promise<ApiResponse<null>> {
    const response = await api.delete(`/posts/${postId}/like`);
    return response.data;
  }

  async bookmarkPost(postId: string): Promise<ApiResponse<null>> {
    const response = await api.post(`/posts/${postId}/bookmark`);
    return response.data;
  }

  async unbookmarkPost(postId: string): Promise<ApiResponse<null>> {
    const response = await api.delete(`/posts/${postId}/bookmark`);
    return response.data;
  }

  // Comment endpoints
  async getComments(postId: string): Promise<ApiResponse<any[]>> {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  }

  async createComment(postId: string, content: string): Promise<ApiResponse<any>> {
    const response = await api.post(`/posts/${postId}/comments`, { content });
    return response.data;
  }

  // Article endpoints
  async getArticles(page: number = 1, limit: number = 10, filters?: any): Promise<PaginatedResponse<any>> {
    const response = await api.get('/articles', {
      params: { page, limit, ...filters }
    });
    return response.data;
  }

  async getArticle(articleId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/articles/${articleId}`);
    return response.data;
  }

  // Chat endpoints
  async getChatRooms(): Promise<ApiResponse<any[]>> {
    const response = await api.get('/chat/rooms');
    return response.data;
  }

  async getMessages(chatRoomId: string): Promise<ApiResponse<any[]>> {
    const response = await api.get(`/chat/rooms/${chatRoomId}/messages`);
    return response.data;
  }

  async sendMessage(chatRoomId: string, content: string): Promise<ApiResponse<any>> {
    const response = await api.post(`/chat/rooms/${chatRoomId}/messages`, { content });
    return response.data;
  }

  // Notification endpoints
  async getNotifications(): Promise<ApiResponse<any[]>> {
    const response = await api.get('/notifications');
    return response.data;
  }

  async markNotificationAsRead(notificationId: string): Promise<ApiResponse<null>> {
    const response = await api.put(`/notifications/${notificationId}/read`);
    return response.data;
  }

  // Upload endpoints
  async uploadImage(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export const apiService = new ApiService();
export default api;
