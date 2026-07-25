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

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Axios** - HTTP client for web scraping
- **Cheerio** - HTML parsing (jQuery-like syntax)
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Deployment
- **Backend**: Render (Node.js service)
- **Frontend**: Vercel (React application)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Clone the Repository
```bash
git clone <repository-url>
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

### Hosted URLs

Once deployed, the application will be accessible at:

- **Frontend**: Your Vercel deployment URL (e.g., `https://page-pulse.vercel.app`)
- **Backend**: Your Render deployment URL (e.g., `https://page-pulse-backend.onrender.com`)
- **API Health Check**: `https://page-pulse-backend.onrender.com/health`
- **API Audit Endpoint**: `https://page-pulse-backend.onrender.com/api/audit`

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
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DarkModeToggle.jsx
│   │   │   ├── ErrorAlert.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ResultCards.jsx
│   │   │   └── UrlInput.jsx
│   │   ├── services/
│   │   │   └── api.js
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
└── .gitignore
```

## 🚀 Future Improvements

- [ ] Add authentication and user accounts
- [ ] Implement audit history and saved reports
- [ ] Add more SEO metrics (meta keywords, Open Graph tags)
- [ ] Support for auditing multiple URLs in batch
- [ ] Export reports as PDF
- [ ] Add performance scoring (Lighthouse integration)
- [ ] Implement caching for repeated audits
- [ ] Add webhook notifications for audit completion
- [ ] Support for custom user-agent strings
- [ ] Add accessibility audit features
- [ ] Implement rate limiting and API quotas
- [ ] Add comprehensive analytics dashboard

## 🧪 Testing

### Test URLs

**Valid Websites**
- `https://example.com` - Basic HTML page
- `https://openai.com` - Modern website with rich content
- `https://github.com` - Complex single-page application
- `https://google.com` - Major search engine
- `https://linkedin.com` - Professional networking platform
- `https://www.linkedin.com/in/public-profile` - LinkedIn public profile example
- `https://www.linkedin.com/in/madhu-sarvani-381999302` - Specific LinkedIn profile

**Error Cases**
- Invalid URL format (e.g., `not-a-url`)
- Image file URL (e.g., `https://example.com/image.jpg`)
- PDF URL (e.g., `https://example.com/document.pdf`)
- Non-existent domain (e.g., `https://this-domain-does-not-exist-12345.com`)

### Sample API Responses

**Successful Audit**
```json
{
  "url": "https://example.com",
  "httpStatus": 200,
  "responseTime": "234 ms",
  "pageTitle": "Example Domain",
  "metaDescription": "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
  "h1Count": 1,
  "imagesMissingAlt": 0,
  "wordCount": 25,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Invalid URL Error**
```json
{
  "error": "Invalid URL"
}
```

**Non-HTML Content Error**
```json
{
  "error": "URL does not return HTML"
}
```

## 📄 License

This project is licensed under the ISC License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please open an issue in the GitHub repository.

---

Built for [Digital Heroes Training Task](https://digitalheroesco.com)
