# Netlify Deployment Guide

## Prerequisites
- Your backend is already deployed on Vercel
- You have the Vercel backend URL (e.g., `https://your-app.vercel.app`)

## Step-by-Step Deployment

### 1. Prepare Your Repository
Make sure your frontend code is pushed to GitHub, GitLab, or Bitbucket.

### 2. Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with your GitHub account
3. Click "New site from Git"
4. Choose your repository
5. Select the `Frontend` folder as the base directory

### 3. Configure Build Settings
Netlify should auto-detect these settings, but verify:
- **Base directory**: `Frontend` (if your frontend is in a subfolder)
- **Build command**: `npm run build`
- **Publish directory**: `Frontend/dist`

### 4. Set Environment Variables
In Netlify dashboard:
1. Go to Site settings → Environment variables
2. Add this variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-app.vercel.app/api`
   
   Replace `your-backend-app.vercel.app` with your actual Vercel URL

### 5. Deploy
1. Click "Deploy site"
2. Wait for build to complete
3. Your site will be available at a Netlify URL

### 6. Custom Domain (Optional)
1. In Site settings → Domain management
2. Add your custom domain
3. Configure DNS settings

## Important Notes

### CORS Configuration
Make sure your Vercel backend allows requests from your Netlify domain:
```javascript
// In your backend CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-netlify-app.netlify.app',
  'https://your-custom-domain.com'
];
```

### Environment Variables
- Never commit `.env` files to Git
- Use Netlify's environment variables for production
- Keep `.env.example` updated for other developers

### Build Optimization
The `netlify.toml` file includes:
- SPA redirect rules (for React Router)
- Security headers
- Cache optimization for assets

## Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### API Connection Issues
- Verify `VITE_API_URL` is set correctly
- Check CORS settings on backend
- Test API endpoints manually

### 404 Errors on Refresh
- The `netlify.toml` redirect rules should fix this
- If not working, check the file is in the root of your repository

## Testing
After deployment:
1. Test user registration/login
2. Test creating/editing posts
3. Test all navigation
4. Test on mobile devices
