import React from 'react';
import { MessageCircle } from 'lucide-react';

const ChatPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">
          Chat & Q&A
        </h1>
        <p className="text-gray-600 mb-8">
          Connect with doctors and community members through real-time messaging.
        </p>
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">
            🚧 Chat functionality is under construction. This will include real-time messaging, doctor consultations, and community Q&A.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
