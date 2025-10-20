import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  MessageCircle, 
  Shield, 
  Star,
  ArrowRight
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Heart,
      title: 'Health Education',
      description: 'Access verified health articles and educational content from medical professionals.',
    },
    {
      icon: Users,
      title: 'Expert Community',
      description: 'Connect with doctors, specialists, and health institutions worldwide.',
    },
    {
      icon: MessageCircle,
      title: 'Interactive Discussions',
      description: 'Engage in meaningful conversations about health topics that matter to you.',
    },
    {
      icon: Shield,
      title: 'Verified Content',
      description: 'All medical information is verified by qualified healthcare professionals.',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '500+', label: 'Medical Experts' },
    { number: '1K+', label: 'Health Articles' },
    { number: '50+', label: 'Institutions' },
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Cardiologist',
      avatar: '/avatars/sarah.jpg',
      content: 'Ditechted Health has revolutionized how I connect with patients and share medical knowledge.',
    },
    {
      name: 'Michael Chen',
      role: 'Health Enthusiast',
      avatar: '/avatars/michael.jpg',
      content: 'The platform has helped me learn so much about my health and connect with amazing doctors.',
    },
    {
      name: 'Dr. Maria Rodriguez',
      role: 'Pediatrician',
      avatar: '/avatars/maria.jpg',
      content: 'A fantastic platform for sharing evidence-based health information with the community.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 mb-6">
              Connect, Learn, and
              <span className="text-gradient block">Thrive Together</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join Ditechted Health Connect - the premier platform where users, doctors, 
              and institutions come together to share knowledge, discuss health topics, 
              and build a healthier community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="btn-outline text-lg px-8 py-4 inline-flex items-center justify-center"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Why Choose Ditechted Health?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide a comprehensive platform that brings together all aspects of health education and community engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card p-6 text-center hover:shadow-card transition-shadow duration-300">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in three simple steps and begin your health journey today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                Create Your Profile
              </h3>
              <p className="text-gray-600">
                Sign up and create your personalized profile. Choose your health interests and connect with relevant experts.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                Explore & Learn
              </h3>
              <p className="text-gray-600">
                Browse verified health articles, join discussions, and follow medical professionals in your areas of interest.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                Engage & Connect
              </h3>
              <p className="text-gray-600">
                Participate in conversations, ask questions, and build meaningful connections with the health community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from doctors, patients, and health enthusiasts who are making a difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Ready to Start Your Health Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who are already connecting, learning, and thriving together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary hover:bg-gray-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              Join Now - It's Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/library"
              className="border-2 border-white text-white hover:bg-white hover:text-primary font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              Explore Library
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
