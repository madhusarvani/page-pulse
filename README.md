# Page Pulse

A production-quality web application that audits any website URL and provides comprehensive SEO and performance metrics.

![Page Pulse](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/License-ISC-green.svg)

## 📋 Project Overview

Page Pulse is a full-stack web application that analyzes websites in real-time, providing valuable insights including:

- **HTTP Status**: Check if the website is accessible and returning proper status codes
- **Response Time**: Measure how fast the website loads
- **Page Title**: Extract and display the page title
- **Meta Description**: Analyze SEO meta descriptions
- **H1 Tags**: Count heading tags for SEO structure
- **Image Alt Attributes**: Identify images missing accessibility attributes
- **Word Count**: Estimate content volume
- **Timestamp**: Track when the audit was performed

## 🌐 Live Demo

- **Frontend**: https://page-pulse-swart-nine.vercel.app
- **Backend**: https://page-pulse-hg74.onrender.com
- **GitHub Repository**: https://github.com/madhusarvani/page-pulse

## ✨ Features

- **Real-time Website Auditing**: Analyze any URL instantly
- **Comprehensive SEO Metrics**: Extract title, meta description, headings, and content analysis
- **Performance Monitoring**: Track HTTP status and response times
- **Accessibility Checks**: Identify images missing alt text
- **Health Score**: Calculate overall website health (0-100)
- **Recent Searches**: Quick access to previously audited URLs
- **Export Reports**: Download audit results as JSON or PDF
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Error Handling**: Graceful handling of timeouts, DNS failures, and invalid URLs

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Axios** - HTTP client for web scraping
- **Cheerio** - HTML parsing (jQuery-like syntax)
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management
- **Jest** - Testing framework
- **Supertest** - HTTP assertion library
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Framer Motion** - Animation library
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Deployment
- **Backend**: Render (Node.js service)
- **Frontend**: Vercel (React application)

## 🏗️ Architecture

Page Pulse follows a clean, modular architecture with clear separation of concerns:

### Backend Architecture
- **Express.js** server with RESTful API
- **Layered architecture**: Controllers → Services → Utils
- **Middleware**: CORS, error handling, JSON parsing
- **Service layer**: Business logic for URL validation and HTML parsing
- **Error handling**: Centralized error management with proper HTTP status codes

### Frontend Architecture
- **React** with Vite for fast development
- **Component-based architecture**: Reusable, modular components
- **State management**: React hooks for local state
- **Service layer**: API communication via Axios
- **Responsive design**: Mobile-first approach with Tailwind CSS

## 📁 Folder Structure

```
page-pulse/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── auditController.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   ├── routes/
│   │   │   └── auditRoutes.js
│   │   ├── services/
│   │   │   └── auditService.js
│   │   ├── utils/
│   │   │   └── urlValidator.js
│   │   └── server.js
│   ├── tests/
│   │   └── auditService.test.js
│   ├── .env.example
│   ├── .eslintrc.js
│   ├── .prettierrc
│   ├── .editorconfig
│   ├── .gitignore
│   ├── jest.config.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── About.jsx
│   │   │   ├── AccessibilityPanel.jsx
│   │   │   ├── AnimatedBackground.jsx
│   │   │   ├── Charts.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── DomainInfo.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorCard.jsx
│   │   │   ├── ExportButtons.jsx
│   │   │   ├── FaviconPreview.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HealthScore.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── RecentSearches.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── Timeline.jsx
│   │   │   └── UrlInput.jsx
│   │   ├── hooks/
│   │   │   ├── useKeyboardShortcuts.js
│   │   │   ├── useLocalStorage.js
│   │   │   └── useTheme.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   ├── calculateAccessibility.js
│   │   │   ├── formatDate.js
│   │   │   ├── generatePDF.js
│   │   │   ├── healthScore.js
│   │   │   └── shareReport.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── README.md
├── DEPLOYMENT.md
├── PROJECT_STRUCTURE.md
└── .gitignore
```

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Clone the Repository
```bash
git clone https://github.com/madhusarvani/page-pulse.git
cd page-pulse
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
PORT=5000
NODE_ENV=development
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
VITE_API_URL=http://localhost:5000
```

## 🚀 Running Locally

### Start the Backend
```bash
cd backend
npm run dev
```
The backend will start on `http://localhost:5000`

### Start the Frontend
In a new terminal:
```bash
cd frontend
npm run dev
```
The frontend will start on `http://localhost:3000`

### Access the Application
Open your browser and navigate to `http://localhost:3000`

## 🧪 Testing

### Run Tests
```bash
cd backend
npm test
```

### Run Tests with Coverage
```bash
cd backend
npm run test:coverage
```

### Run Tests in Watch Mode
```bash
cd backend
npm run test:watch
```

### Test Coverage Target
- **Branches**: 85%
- **Functions**: 85%
- **Lines**: 85%
- **Statements**: 85%

## 📚 API Documentation

### POST /api/audit

Audits a website URL and returns comprehensive metrics.

#### Request
```json
{
  "url": "https://example.com"
}
```

#### Success Response (200 OK)
```json
{
  "url": "https://example.com",
  "httpStatus": 200,
  "responseTime": "345 ms",
  "pageTitle": "Example Domain",
  "metaDescription": "This domain is for use in illustrative examples...",
  "h1Count": 1,
  "imagesMissingAlt": 0,
  "wordCount": 523,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### Error Responses

**Invalid URL (400 Bad Request)**
```json
{
  "error": "Invalid URL"
}
```

**Request Timeout (504 Gateway Timeout)**
```json
{
  "error": "Request timed out"
}
```

**DNS Failure (502 Bad Gateway)**
```json
{
  "error": "Unable to reach website"
}
```

**Non-HTML Content (415 Unsupported Media Type)**
```json
{
  "error": "URL does not return HTML"
}
```

**Server Error (500 Internal Server Error)**
```json
{
  "error": "Internal server error"
}
```

### GET /health

Health check endpoint to verify API status.

#### Response (200 OK)
```json
{
  "status": "OK",
  "message": "Page Pulse API is running"
}
```

## 🌐 Deployment

### Backend Deployment (Render)

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service**
   - Connect your GitHub repository
   - Select the `backend` folder as root directory
   - Build command: `npm install`
   - Start command: `node src/server.js`
   - Environment variables:
     - `PORT`: 5000
     - `NODE_ENV`: production

3. **Deploy** - Render will automatically deploy your backend

4. **Copy the deployed URL** for frontend configuration

### Frontend Deployment (Vercel)

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Install Vercel CLI**
```bash
npm install -g vercel
```

3. **Deploy from frontend directory**
```bash
cd frontend
vercel
```

4. **Configure environment variables**
   - `VITE_API_URL`: Your deployed backend URL from Render

5. **Complete deployment** - Vercel will provide a live URL

### Environment Variables

**Backend (.env)**
```env
PORT=5000
NODE_ENV=production
```

**Frontend (.env)**
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## 🎨 Design Decisions

### 1. MVC Architecture (Routes, Controllers, Services)

I chose to implement a layered MVC architecture with clear separation between routes, controllers, and services. This decision was driven by the need for maintainability and testability. The routes handle HTTP concerns, controllers manage request/response logic, and services contain business logic. This separation makes the codebase easier to understand, test individual components in isolation, and modify one layer without affecting others. The trade-off is slightly more boilerplate code initially, but the long-term benefits in code organization and maintainability far outweigh this cost for a project of this scope.

### 2. Axios + Cheerio Instead of Browser Automation

I selected Axios for HTTP requests and Cheerio for HTML parsing rather than using browser automation tools like Puppeteer or Playwright. This decision was based on performance and resource efficiency. Axios + Cheerio is significantly faster and uses fewer resources since it doesn't need to render a full browser environment. For this use case—extracting basic SEO metrics from static HTML—this approach is sufficient and more scalable. The trade-off is that it won't execute JavaScript or handle dynamic content, but for the core requirements of this project, that limitation is acceptable and keeps the application lightweight and fast.

### 3. Client-Side Website Health Score Calculation

I implemented the Website Health Score calculation on the client-side rather than in the backend. This decision allows for more flexibility in how the score is calculated and displayed without requiring backend changes. It also reduces the computational load on the server, as the calculation is distributed to the client. The trade-off is that different clients could theoretically calculate scores differently, but since this is a client-side feature for user feedback rather than a critical API response, this is acceptable. It also enables real-time score updates as users interact with the data without additional API calls.

### 4. Graceful Error Handling for Different Failure Scenarios

I implemented specific error handling for different failure scenarios (invalid URLs, timeouts, DNS failures, non-HTML responses) rather than using generic error messages. This decision improves user experience by providing actionable feedback about what went wrong. Each error type has a specific HTTP status code and error message, making debugging easier and API behavior more predictable. The trade-off is additional complexity in error handling logic, but this investment pays off in better user experience and easier troubleshooting. This approach also makes the API more professional and production-ready.

### 5. LocalStorage for Recent Searches

I chose to use LocalStorage for storing recent searches rather than implementing a backend database. This decision keeps the application stateless and reduces infrastructure complexity. For a tool like this, where recent searches are a convenience feature rather than critical data, client-side storage is sufficient. The trade-off is that recent searches are device-specific and not synchronized across devices, but this is acceptable for the current scope. If this were to become a core feature, I could migrate to a backend database without changing the frontend interface significantly.

## 🤖 AI Usage

AI tools such as ChatGPT and Devin were used to brainstorm architecture, review code quality, and improve documentation. The final implementation, testing, UI customization, and design decisions were reviewed, modified, and validated manually. I used AI to explore different architectural patterns, get feedback on code organization, and refine documentation language. However, all actual code implementation, testing, deployment, and final engineering decisions were made by me. The AI served as a sounding board and reviewer, not as a replacement for manual implementation and decision-making.

## 🚀 What I Would Improve With Another Day

If I had another day to work on this project, I would focus on these improvements:

1. **Caching Repeated Audits**: Implement Redis or in-memory caching to store audit results for frequently accessed URLs. This would reduce load on the target servers and improve response times for repeated audits.

2. **Rate Limiting**: Add rate limiting using something like express-rate-limit to prevent abuse and ensure fair usage of the API. This is important for production deployment to protect against DoS attacks.

3. **Playwright/Puppeteer Support**: Add support for JavaScript-heavy websites by integrating Playwright or Puppeteer as a fallback when Cheerio doesn't capture dynamic content. This would improve accuracy for modern SPAs.

4. **Enhanced SEO Checks**: Add more comprehensive SEO analysis including Open Graph tags, canonical tags, robots.txt parsing, and sitemap analysis. This would provide more value to users.

5. **Lighthouse Integration**: Add Google Lighthouse integration for performance, accessibility, and best practices scoring. This would provide industry-standard metrics.

6. **Better PDF Reports**: Enhance the PDF export with better formatting, charts, and professional styling to make reports more presentable for sharing.

7. **Audit History Database**: Implement a database (PostgreSQL or MongoDB) to store audit history, allowing users to track changes over time and compare audits.

8. **Background Job Queue**: Use a job queue like Bull or RabbitMQ to handle audit requests asynchronously, improving scalability and allowing for longer-running audits without blocking.

9. **Improved Accessibility Analysis**: Add more comprehensive accessibility checks using axe-core or similar libraries to provide detailed WCAG compliance reports.

## 📸 Screenshots

### Hero Section
![Hero](screenshots/hero.png)

### Input Form
![Input](screenshots/input.png)

### Loading State
![Loading](screenshots/loading.png)

### Results Display
![Results](screenshots/results.png)

### Dark Mode
![Dark Mode](screenshots/dark-mode.png)

## 📄 License

This project is licensed under the ISC License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please open an issue in the GitHub repository.

---

Built for [Digital Heroes Training Task](https://digitalheroesco.com)
