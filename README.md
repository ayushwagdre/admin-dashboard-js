# Admin Dashboard - Role-Based Access Control (JavaScript)

A modern, mobile-friendly React admin dashboard built with **pure JavaScript** (no TypeScript), React Router, Tailwind CSS, and Axios. This dashboard provides a complete CRUD interface for managing Users, Blogs, Portfolios, and Testimonials with role-based permissions.

## Features

- ✅ **Authentication & Authorization**: JWT-based authentication with role-based access control
- ✅ **User Management**: Create, read, update, and delete users with customizable permissions
- ✅ **Blog Management**: Full CRUD operations for blog posts with tags and images
- ✅ **Portfolio Management**: Manage portfolio projects with descriptions and links
- ✅ **Testimonial Management**: Handle client testimonials with star ratings
- ✅ **Responsive Design**: Mobile-friendly UI with collapsible sidebar navigation
- ✅ **Modern UI**: Clean, professional design with Tailwind CSS
- ✅ **Pure JavaScript**: No TypeScript - easier setup and faster development

## Tech Stack

- **React 18** - UI library
- **JavaScript (ES6+)** - No TypeScript required
- **Vite** - Fast build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Running Go backend API (from the parent directory)

## Installation

1. **Navigate to the project directory**:
   ```bash
   cd admin-dashboard-js
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   The `.env` file is already created with:
   ```
   VITE_API_URL=http://localhost:8000
   ```
   Update the URL if your backend runs on a different port.

## Running the Application

1. **Make sure your Go backend is running**:
   ```bash
   cd ..
   go run main.go
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:5173` (or the URL shown in the terminal)

## Default Credentials

Use these credentials to login:
- **Email**: `admin@email.com`
- **Password**: `admin123`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
admin-dashboard-js/
├── src/
│   ├── api/              # API client and HTTP requests
│   │   └── client.js     # Axios configuration and API methods
│   ├── components/       # Reusable components
│   │   ├── DashboardLayout.jsx  # Main layout with sidebar
│   │   └── ProtectedRoute.jsx   # Route protection component
│   ├── contexts/         # React contexts
│   │   └── AuthContext.jsx      # Authentication state management
│   ├── pages/            # Page components
│   │   ├── Login.jsx     # Login page
│   │   ├── Dashboard.jsx # Dashboard home
│   │   ├── Users.jsx     # User management
│   │   ├── Blogs.jsx     # Blog management
│   │   ├── Portfolios.jsx        # Portfolio management
│   │   └── Testimonials.jsx      # Testimonial management
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles (Tailwind)
├── .env                  # Environment variables
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite configuration
└── package.json          # Project dependencies
```

## Features by Permission

### User Management (Permissions: view_users, create_user, update_user, delete_user)
- View all users with their permissions
- Create new users with custom permission sets
- Edit existing users
- Delete users

### Blog Management (Permissions: read_blog, create_blog, update_blog, delete_blog)
- View all blog posts in a card layout
- Create new blog posts with images, content, and tags
- Edit existing blog posts
- Delete blog posts

### Portfolio Management (Permissions: read_portfolio, create_portfolio, update_portfolio, delete_portfolio)
- View all portfolio projects
- Create new portfolio entries with project links
- Edit existing portfolios
- Delete portfolios

### Testimonial Management (Permissions: read_testimonial, create_testimonial, update_testimonial, delete_testimonial)
- View all testimonials with star ratings
- Create new testimonials
- Edit existing testimonials
- Delete testimonials

## Responsive Design

The application is fully responsive and works seamlessly on:
- **Desktop**: Full sidebar navigation and multi-column layouts
- **Tablet**: Adaptive layouts with collapsible sidebar
- **Mobile**: Mobile-optimized with hamburger menu and single-column layouts

## API Integration

The dashboard communicates with the Go backend API at the URL specified in `.env`. All API calls include:
- JWT token authentication in headers
- Proper error handling
- Loading states
- Success/error notifications

## Security Features

- JWT token-based authentication
- Protected routes with permission checks
- Automatic token refresh on page reload
- Secure logout with token removal
- Role-based UI visibility

## Customization

### Changing Colors
Edit `tailwind.config.js` to customize the primary color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom color palette
      }
    }
  }
}
```

### Adding New Routes
1. Create a new page component in `src/pages/`
2. Add the route in `src/App.jsx`
3. Update `DashboardLayout.jsx` to add a sidebar menu item
4. Add required API methods in `src/api/client.js`

## Production Build

To build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory. You can serve them with any static file server or deploy to services like:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Why JavaScript Instead of TypeScript?

This project uses plain JavaScript (ES6+) instead of TypeScript for:
- ✅ Simpler setup and configuration
- ✅ Easier onboarding for beginners
- ✅ Faster development without type checking overhead
- ✅ No build-time type errors to debug
- ✅ More flexible and forgiving for rapid prototyping

If you prefer TypeScript, check out the `admin-dashboard` folder in the parent directory.

## Screenshots

### Login Page
Beautiful, gradient login page with default credentials displayed

### Dashboard Home
Clean dashboard showing user permissions and quick action cards

### User Management
Grid layout of user cards with permission badges and edit/delete actions

### Blog Management
Blog posts displayed in a responsive grid with images, tags, and metadata

### Mobile View
Fully responsive design with collapsible sidebar and touch-friendly interfaces

## License

MIT

## Support

For issues or questions, please refer to the main project repository.
