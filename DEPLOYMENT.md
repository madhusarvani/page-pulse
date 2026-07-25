# Deployment Guide

This guide provides step-by-step instructions for deploying Page Pulse to production.

## Hosted URLs

After successful deployment, your application will be accessible at:

- **Frontend**: Your Vercel deployment URL (e.g., `https://page-pulse.vercel.app`)
- **Backend**: Your Render deployment URL (e.g., `https://page-pulse-backend.onrender.com`)
- **API Health Check**: `https://page-pulse-backend.onrender.com/health`
- **API Audit Endpoint**: `https://page-pulse-backend.onrender.com/api/audit`

Replace `page-pulse` with your actual project name.

## Prerequisites

- GitHub account with repository
- Render account (for backend)
- Vercel account (for frontend)
- Node.js and npm installed locally

## Backend Deployment (Render)

### Step 1: Prepare Your Repository

1. Ensure your code is pushed to GitHub
2. Verify the backend folder contains all necessary files
3. Confirm `.env.example` exists in the backend folder

### Step 2: Create Render Account

1. Visit [render.com](https://render.com)
2. Sign up for a free account
3. Connect your GitHub account

### Step 3: Create a New Web Service

1. Click "New +" in the dashboard
2. Select "Web Service"
3. Connect your GitHub repository
4. Configure the service:

**Build & Deploy Settings**
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `node src/server.js`

**Environment Variables**
- `PORT`: `5000`
- `NODE_ENV`: `production`

**Instance Type**
- Select "Free" tier for testing or "Standard" for production

### Step 4: Deploy

1. Click "Create Web Service"
2. Render will build and deploy your backend
3. Wait for the deployment to complete (typically 2-5 minutes)
4. Copy the deployed URL (e.g., `https://page-pulse-backend.onrender.com`)

### Step 5: Verify Deployment

1. Visit your deployed URL + `/health`
2. You should see: `{"status":"OK","message":"Page Pulse API is running"}`

## Frontend Deployment (Vercel)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Run the deployment command:
```bash
vercel
```

3. Follow the prompts:
   - **Set up and deploy?**: `Y`
   - **Link to existing project?**: `N`
   - **Project name**: `page-pulse-frontend` (or your preferred name)
   - **Directory**: `./` (current directory)
   - **Override settings?**: `N`

### Step 4: Configure Environment Variables

1. After initial deployment, add environment variable:
```bash
vercel env add VITE_API_URL
```

2. When prompted, enter your deployed backend URL:
```
https://your-backend-url.onrender.com
```

3. Select "Production" environment

### Step 5: Redeploy

```bash
vercel --prod
```

### Step 6: Verify Deployment

1. Visit your Vercel deployment URL
2. Test the application with a URL like `example.com`
3. Verify all features work correctly

## Alternative: Vercel Dashboard Deployment

If you prefer using the Vercel dashboard:

1. Visit [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variable:
   - `VITE_API_URL`: Your backend URL
6. Click "Deploy"

## Environment Variables Reference

### Backend Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| PORT | Server port | 5000 | No |
| NODE_ENV | Environment mode | development | No |

### Frontend Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| VITE_API_URL | Backend API URL | http://localhost:5000 | Yes |

## Troubleshooting

### Backend Issues

**Deployment Fails**
- Check that `package.json` exists in the backend folder
- Verify all dependencies are listed in `package.json`
- Check Render logs for specific error messages

**API Returns 504 Timeout**
- The target website might be slow or blocking requests
- Consider increasing timeout in `auditService.js`

**CORS Errors**
- Verify CORS middleware is configured correctly
- Check that the frontend URL is allowed

### Frontend Issues

**Build Fails**
- Ensure all dependencies are installed
- Check that `vite.config.js` is properly configured
- Verify Tailwind CSS configuration

**API Calls Fail**
- Check that `VITE_API_URL` is set correctly
- Verify the backend is deployed and accessible
- Check browser console for specific errors

**Environment Variables Not Loading**
- Ensure variables are prefixed with `VITE_` for Vite
- Restart the development server after adding variables
- For production, redeploy after adding variables

## Post-Deployment Checklist

- [ ] Backend health check returns 200 OK
- [ ] Frontend loads without errors
- [ ] URL audit functionality works with test URLs
- [ ] Error handling displays proper messages
- [ ] Dark mode toggle functions correctly
- [ ] Copy JSON button works
- [ ] Audit Another button resets state
- [ ] Footer link points to correct URL
- [ ] Responsive design works on mobile devices
- [ ] Environment variables are properly configured

## Monitoring

### Render Monitoring

- View logs in the Render dashboard
- Monitor response times and error rates
- Set up alerts for deployment failures

### Vercel Monitoring

- View analytics in the Vercel dashboard
- Monitor build times and deployment status
- Check edge function performance

## Scaling Considerations

### Backend Scaling

- Upgrade Render instance type for higher traffic
- Implement caching for repeated audits
- Add rate limiting to prevent abuse
- Consider adding a database for audit history

### Frontend Scaling

- Vercel automatically scales with traffic
- Optimize bundle size for faster loading
- Implement lazy loading for components
- Add CDN for static assets

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use HTTPS** in production (automatic on Render and Vercel)
3. **Implement rate limiting** for the API endpoint
4. **Validate and sanitize** all user inputs
5. **Keep dependencies updated** with `npm audit fix`
6. **Monitor logs** for suspicious activity
7. **Use environment-specific** configurations

## Cost Estimates

### Render (Backend)
- **Free Tier**: $0/month (limited resources)
- **Standard**: $7/month (better performance)
- **Pro**: $25/month (dedicated resources)

### Vercel (Frontend)
- **Hobby**: $0/month (personal projects)
- **Pro**: $20/month (team features)
- **Enterprise**: Custom pricing

**Total Minimum Cost**: $0/month (using free tiers)

## Backup and Recovery

### Database Backup
If you add a database in the future:
- Enable automated backups
- Export data regularly
- Document recovery procedures

### Code Backup
- Use Git for version control
- Tag releases for easy rollback
- Maintain feature branches

## Support

For deployment issues:
- Check Render documentation: [docs.render.com](https://docs.render.com)
- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Open an issue in the GitHub repository

---

Built for [Digital Heroes Training Task](https://digitalheroesco.com)
