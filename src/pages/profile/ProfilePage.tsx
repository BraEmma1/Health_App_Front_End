import React from 'react';
import { useParams } from 'react-router-dom';
import { User } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">
          Profile Page
        </h1>
        <p className="text-gray-600">
          User ID: {userId}
        </p>
        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">
            🚧 Profile page is under construction. This will include user information, posts, followers, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
