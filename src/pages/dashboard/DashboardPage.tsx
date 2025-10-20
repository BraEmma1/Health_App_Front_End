import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { getPosts, setFilters, likePost, unlikePost, bookmarkPost, unbookmarkPost } from '../../store/slices/postSlice';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal,
  Filter,
  Search,
  Plus,
  TrendingUp,
  Users,
  Building2,
  UserCheck
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  const { posts, filters, pagination, isLoading } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPosts({ page: 1, limit: 10, filters }));
  }, [dispatch, filters]);

  const handleFilterChange = (type: 'all' | 'doctors' | 'institutions' | 'my-topics') => {
    dispatch(setFilters({ ...filters, type }));
  };

  const handleLike = async (postId: string, isLiked: boolean) => {
    try {
      if (isLiked) {
        await dispatch(unlikePost(postId)).unwrap();
      } else {
        await dispatch(likePost(postId)).unwrap();
      }
    } catch (error) {
      toast.error('Failed to update like');
    }
  };

  const handleBookmark = async (postId: string, isBookmarked: boolean) => {
    try {
      if (isBookmarked) {
        await dispatch(unbookmarkPost(postId)).unwrap();
      } else {
        await dispatch(bookmarkPost(postId)).unwrap();
      }
    } catch (error) {
      toast.error('Failed to update bookmark');
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const filterOptions = [
    { id: 'all', label: 'All Posts', icon: TrendingUp },
    { id: 'doctors', label: 'Doctors', icon: UserCheck },
    { id: 'institutions', label: 'Institutions', icon: Building2 },
    { id: 'my-topics', label: 'My Topics', icon: Users },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening in your health community today.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search posts, doctors, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {filterOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => handleFilterChange(option.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filters.type === option.id
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{option.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">More Filters</span>
          </button>
        </div>

        {/* Additional Filters */}
        {showFilters && (
          <div className="card p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Filter by Interest</h3>
            <div className="flex flex-wrap gap-2">
              {['Mental Health', 'Fitness', 'Nutrition', 'Cardiology', 'Pediatrics'].map((interest) => (
                <button
                  key={interest}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.interests.includes(interest.toLowerCase())
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => {
                    const newInterests = filters.interests.includes(interest.toLowerCase())
                      ? filters.interests.filter(i => i !== interest.toLowerCase())
                      : [...filters.interests, interest.toLowerCase()];
                    dispatch(setFilters({ ...filters, interests: newInterests }));
                  }}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create Post Button */}
      <div className="mb-6">
        <button className="w-full btn-primary py-3 inline-flex items-center justify-center">
          <Plus className="w-5 h-5 mr-2" />
          Share something with the community
        </button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {isLoading && posts.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-4">
              Be the first to share something with the community!
            </p>
            <button className="btn-primary">
              Create your first post
            </button>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="card p-6">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.author.profilePicture || '/default-avatar.png'}
                    alt={post.author.firstName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">
                        {post.author.firstName} {post.author.lastName}
                      </h3>
                      {post.author.isVerified && (
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <UserCheck className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{post.author.role}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(post.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
                {post.images && post.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {post.images.slice(0, 4).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Post image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Post Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(post.id, post.isLiked)}
                    className={`flex items-center space-x-2 transition-colors ${
                      post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm">{post.shares}</span>
                  </button>
                </div>
                
                <button
                  onClick={() => handleBookmark(post.id, post.isBookmarked)}
                  className={`transition-colors ${
                    post.isBookmarked ? 'text-accent' : 'text-gray-500 hover:text-accent'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More */}
      {posts.length > 0 && pagination.page < pagination.totalPages && (
        <div className="text-center mt-8">
          <button
            onClick={() => dispatch(getPosts({ 
              page: pagination.page + 1, 
              limit: 10, 
              filters 
            }))}
            disabled={isLoading}
            className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Load More Posts'}
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
