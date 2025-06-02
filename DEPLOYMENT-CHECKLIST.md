# 📋 Deployment Checklist

## ✅ Pre-Deployment Setup

### 1. Database Setup
- [ ] MongoDB Atlas account created
- [ ] Database cluster created
- [ ] Database user created with read/write permissions
- [ ] IP whitelist set to 0.0.0.0/0 (all IPs)
- [ ] Connection string obtained

### 2. Cloudinary Setup
- [ ] Cloudinary account created
- [ ] Cloud name, API key, and API secret obtained

### 3. Code Repository
- [ ] Code pushed to GitHub
- [ ] All files committed and pushed

## 🚀 Backend Deployment

### Step 1: Deploy Backend
- [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Click "New Project"
- [ ] Import GitHub repository
- [ ] Select `Backend` folder as root directory
- [ ] Set environment variables:
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `CLOUDINARY_CLOUD_NAME`
  - [ ] `CLOUDINARY_API_KEY`
  - [ ] `CLOUDINARY_API_SECRET`
  - [ ] `NODE_ENV=production`
- [ ] Deploy and get backend URL

## 🎨 Frontend Deployment

### Step 2: Deploy Frontend
- [ ] Click "New Project" in Vercel
- [ ] Import same GitHub repository
- [ ] Select `Frontend` folder as root directory
- [ ] Set environment variable:
  - [ ] `VITE_API_URL=https://your-backend.vercel.app/api`
- [ ] Deploy and get frontend URL

## 🔧 Post-Deployment

### Step 3: Update CORS
- [ ] Add `FRONTEND_URL` environment variable to backend
- [ ] Set value to your frontend Vercel URL
- [ ] Redeploy backend

### Step 4: Test Everything
- [ ] Visit frontend URL
- [ ] Register new account
- [ ] Login works
- [ ] Create blog post
- [ ] Upload image
- [ ] Add comment
- [ ] Delete comment
- [ ] Edit post
- [ ] Delete post

## 🛠️ Troubleshooting

### Common Issues:
- [ ] CORS errors → Check FRONTEND_URL in backend
- [ ] Database connection → Verify MongoDB URI and IP whitelist
- [ ] Image upload fails → Check Cloudinary credentials
- [ ] API calls fail → Verify VITE_API_URL in frontend

## 📱 Optional: Custom Domain
- [ ] Add custom domain in Vercel
- [ ] Update DNS records
- [ ] Update environment variables with new domain

## 🎉 Deployment Complete!

Your blog is now live at:
- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.vercel.app`

## 📊 Monitoring
- [ ] Check Vercel function logs
- [ ] Monitor performance
- [ ] Set up error tracking (optional)

---

**Need Help?** Check the detailed `DEPLOYMENT.md` guide or Vercel documentation.
