import React from 'react';
import { Settings } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Settings className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">
          Settings & Notifications
        </h1>
        <p className="text-gray-600 mb-8">
          Manage your profile, preferences, and notification settings.
        </p>
        <div className="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-purple-800">
            🚧 Settings page is under construction. This will include profile management, notification preferences, and account settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
