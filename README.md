# Ditechted Health Connect - Frontend

A modern, responsive React frontend for Ditechted Health Connect - a health education & social engagement platform.

## 🚀 Features

- **Modern UI/UX**: Built with Tailwind CSS and custom design system
- **Authentication**: Login/Register with Google OAuth integration
- **Onboarding**: Personalized interest selection flow
- **Social Feed**: Posts, likes, comments, and bookmarks
- **Health Library**: Searchable verified health articles
- **Real-time Chat**: Socket.io integration for messaging
- **Profile Management**: User and doctor/institution profiles
- **Responsive Design**: Mobile-first approach

## 🛠 Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **React Router DOM** for navigation
- **React Hook Form** with Yup validation
- **Axios** for API calls
- **Socket.io Client** for real-time features
- **Lucide React** for icons

## 🎨 Design System

### Colors
- **Primary**: #008C95 (Teal)
- **Accent**: #F48B0C (Orange)
- **Secondary**: #0A2540 (Dark Blue)
- **Success**: #2ECC71 (Green)
- **Background**: #F9FAFB (Light Gray)

### Typography
- **Headings**: Montserrat (Bold)
- **Body**: Lato (Clean and modern)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Card, etc.)
│   ├── layout/         # Layout components (Navbar, Footer)
│   └── forms/          # Form components
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Main feed/dashboard
│   ├── profile/        # User profiles
│   ├── chat/           # Chat and messaging
│   ├── library/        # Health education library
│   └── settings/       # Settings and preferences
├── store/              # Redux store and slices
├── services/           # API services
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── contexts/           # React contexts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update environment variables in `.env`:
```env
REACT_APP_API_URL=http://localhost:3000/api
```

4. Start development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📱 Pages & Features

### 🏠 Landing Page
- Hero section with platform overview
- Feature highlights
- Call-to-action buttons
- Statistics and testimonials

### 🔐 Authentication
- **Login Page**: Email/password and Google OAuth
- **Register Page**: User registration with validation
- Form validation with React Hook Form + Yup

### 🎯 Onboarding
- Health interest selection
- Personalized recommendations
- Step-by-step guided flow

### 📰 Main Feed (Dashboard)
- Personalized post feed
- Like, comment, share, bookmark functionality
- Filter by post type (All, Doctors, Institutions, My Topics)
- Search functionality
- Infinite scroll pagination

### 👤 Profiles
- User profile pages
- Doctor/institution profiles
- Follow/unfollow functionality
- Post history and statistics

### 📚 Health Library
- Searchable health articles
- Category filtering
- Verified medical content
- Bookmark and share articles

### 💬 Chat & Q&A
- Real-time messaging
- Doctor consultations
- Community Q&A
- Online status indicators

### ⚙️ Settings
- Profile management
- Notification preferences
- Privacy settings
- Account management

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### State Management

The app uses Redux Toolkit with the following slices:
- **authSlice**: Authentication state
- **userSlice**: User profile and interests
- **postSlice**: Posts and feed data
- **chatSlice**: Chat rooms and messages
- **notificationSlice**: Notifications

### API Integration

All API calls are handled through the `apiService` in `src/services/api.ts` with:
- Axios interceptors for auth tokens
- Error handling
- Request/response transformation

## 🎨 Customization

### Adding New Components

1. Create component in appropriate folder
2. Use Tailwind CSS classes
3. Follow the design system colors and typography
4. Export from component index files

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the established color palette
- Use custom CSS classes for complex styling
- Maintain consistent spacing and typography

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Environment Variables

Make sure to set the following environment variables in production:
- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_GOOGLE_CLIENT_ID`: Google OAuth client ID
- `REACT_APP_SOCKET_URL`: Socket.io server URL

## 🤝 Contributing

1. Follow the established code style
2. Use TypeScript for type safety
3. Write meaningful commit messages
4. Test your changes thoroughly
5. Update documentation as needed

## 📄 License

This project is part of the Ditechted Health Connect platform.