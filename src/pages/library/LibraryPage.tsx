import React from 'react';
import { BookOpen } from 'lucide-react';

const LibraryPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">
          Health Education Library
        </h1>
        <p className="text-gray-600 mb-8">
          Access verified health articles and educational content from medical professionals.
        </p>
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">
            🚧 Health Library is under construction. This will include searchable articles, categories, and verified medical content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
