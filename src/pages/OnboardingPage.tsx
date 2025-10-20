import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { updateUserInterests } from '../store/slices/userSlice';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { 
  Heart, 
  Brain, 
  Dumbbell, 
  Apple, 
  Baby, 
  Shield, 
  Stethoscope,
  Users,
  ArrowRight,
  Check
} from 'lucide-react';

interface HealthInterest {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const healthInterests: HealthInterest[] = [
  {
    id: 'mental-health',
    name: 'Mental Health',
    description: 'Psychology, therapy, mindfulness, and emotional wellbeing',
    icon: Brain,
    color: 'bg-purple-500',
  },
  {
    id: 'fitness',
    name: 'Fitness & Exercise',
    description: 'Workout routines, sports, and physical activity',
    icon: Dumbbell,
    color: 'bg-blue-500',
  },
  {
    id: 'nutrition',
    name: 'Nutrition',
    description: 'Healthy eating, diet plans, and food science',
    icon: Apple,
    color: 'bg-green-500',
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    description: 'Child health, development, and parenting',
    icon: Baby,
    color: 'bg-pink-500',
  },
  {
    id: 'preventive-care',
    name: 'Preventive Care',
    description: 'Health screenings, vaccinations, and wellness',
    icon: Shield,
    color: 'bg-yellow-500',
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    description: 'Heart health, cardiovascular disease, and treatment',
    icon: Heart,
    color: 'bg-red-500',
  },
  {
    id: 'general-medicine',
    name: 'General Medicine',
    description: 'Primary care, common illnesses, and treatments',
    icon: Stethoscope,
    color: 'bg-indigo-500',
  },
  {
    id: 'community-health',
    name: 'Community Health',
    description: 'Public health, epidemiology, and health policy',
    icon: Users,
    color: 'bg-teal-500',
  },
];

const OnboardingPage: React.FC = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useAuth();
  const { isLoading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (selectedInterests.length === 0) {
        toast.error('Please select at least one health interest');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    if (!user) return;

    try {
      await dispatch(updateUserInterests({ 
        userId: user.id, 
        interests: selectedInterests 
      })).unwrap();
      
      toast.success('Welcome to Ditechted Health!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error('Failed to save your interests. Please try again.');
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > 1 ? <Check className="w-5 h-5" /> : '1'}
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > 2 ? <Check className="w-5 h-5" /> : '2'}
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Step {currentStep} of 2
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Welcome, {user.firstName}! 👋
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {currentStep === 1 
              ? 'Let\'s personalize your experience by selecting your health interests.'
              : 'Great! You\'re all set. Let\'s get you started with your personalized feed.'
            }
          </p>
        </div>

        {/* Step 1: Interest Selection */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthInterests.map((interest) => {
                const Icon = interest.icon;
                const isSelected = selectedInterests.includes(interest.id);
                
                return (
                  <button
                    key={interest.id}
                    onClick={() => handleInterestToggle(interest.id)}
                    className={`card p-6 text-left transition-all duration-200 hover:shadow-card ${
                      isSelected 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${interest.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">
                          {interest.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {interest.description}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-6">
                Select at least one interest to continue. You can always change these later in your settings.
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Completion */}
        {currentStep === 2 && (
          <div className="text-center space-y-8">
            <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-12 h-12 text-success" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-gray-900">
                You're all set!
              </h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                We've personalized your feed based on your interests. You'll now see relevant content from doctors and experts in your selected areas.
              </p>
            </div>

            <div className="bg-primary/5 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-heading font-semibold text-gray-900 mb-3">
                What's next?
              </h3>
              <ul className="text-left text-sm text-gray-600 space-y-2">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-success flex-shrink-0" />
                  <span>Explore your personalized feed</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-success flex-shrink-0" />
                  <span>Follow doctors and experts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-success flex-shrink-0" />
                  <span>Join health discussions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-success flex-shrink-0" />
                  <span>Access verified health articles</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          {currentStep === 1 && (
            <>
              <button
                onClick={handleSkip}
                className="px-8 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Skip for now
              </button>
              <button
                onClick={handleNext}
                disabled={selectedInterests.length === 0}
                className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
              >
                Continue
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </>
          )}
          
          {currentStep === 2 && (
            <button
              onClick={handleComplete}
              disabled={isLoading}
              className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
            >
              {isLoading ? 'Setting up...' : 'Get Started'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
