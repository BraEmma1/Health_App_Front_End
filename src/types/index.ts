// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  bio?: string;
  role: 'user' | 'doctor' | 'institution';
  isVerified: boolean;
  specialization?: string;
  followers: number;
  following: number;
  createdAt: string;
  updatedAt: string;
}

// Post Types
export interface Post {
  id: string;
  author: User;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

// Comment Types
export interface Comment {
  id: string;
  postId: string;
  author: User;
  content: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
  replies?: Comment[];
}

// Health Interest Types
export interface HealthInterest {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

// Article Types
export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: User;
  category: string;
  tags: string[];
  readTime: number;
  isBookmarked: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  featuredImage?: string;
}

// Chat Types
export interface ChatRoom {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatRoomId: string;
  sender: User;
  content: string;
  type: 'text' | 'image' | 'file';
  isRead: boolean;
  createdAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'message' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  relatedUserId?: string;
  relatedPostId?: string;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileForm {
  firstName: string;
  lastName: string;
  bio?: string;
  specialization?: string;
}

// Filter Types
export interface PostFilters {
  type: 'all' | 'doctors' | 'institutions' | 'my-topics';
  interests: string[];
  sortBy: 'recent' | 'popular' | 'trending';
}

export interface ArticleFilters {
  category: string;
  tags: string[];
  sortBy: 'recent' | 'popular' | 'trending';
  search: string;
}
