import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const SimpleNavbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-soft border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-heading font-bold text-gradient">Ditechted Health</span>
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-primary">Login</Link>
            <Link to="/register" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavbar;

