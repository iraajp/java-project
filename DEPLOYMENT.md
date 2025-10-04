# Deployment Guide - Render

This guide will help you deploy the Productivity Social application to Render.

## Prerequisites

1. **GitHub Account** - Your code should be pushed to GitHub
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **MongoDB Atlas Account** - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster (Free tier is sufficient for testing)
3. Create a database user:
   - Database Access → Add New Database User
   - Choose password authentication
   - Save username and password securely
4. Whitelist all IP addresses:
   - Network Access → Add IP Address
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - This is required for Render to connect
5. Get your connection string:
   - Clusters → Connect → Connect Your Application
   - Choose "Driver: Node.js" (the format works for Java too)
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<database>` with `productivity_social`

Example connection string:

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/productivity_social?retryWrites=true&w=majority
```

## Step 2: Push Your Code to GitHub

```bash
cd "/Users/raajpatkar/java project"

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for Render deployment"

# Add your GitHub repository
git remote add origin https://github.com/yourusername/your-repo.git

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy Backend to Render

### Option A: Using Blueprint (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will detect `render.yaml` and set up services automatically
5. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `CORS_ALLOWED_ORIGINS`: Your frontend URL (will get this after deploying frontend)
   - `JWT_SECRET`: Generate a secure random string (64+ characters)

### Option B: Manual Setup

#### Deploy Backend:

1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `productivity-social-backend`
   - **Environment**: `Java`
   - **Build Command**: `cd backend && mvn clean package -DskipTests`
   - **Start Command**: `cd backend && java -jar target/*.jar`
   - **Instance Type**: Free
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a secure random string
   - `JWT_EXPIRATION`: `86400000`
   - `CORS_ALLOWED_ORIGINS`: `https://your-frontend-url.onrender.com`
   - `LOG_LEVEL`: `INFO`
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (e.g., `https://productivity-social-backend.onrender.com`)

## Step 4: Update Frontend API URL

1. Update `frontend/src/services/api.js`:

```javascript
const API_URL =
  process.env.REACT_APP_API_URL || "https://your-backend-url.onrender.com/api";
```

2. Commit and push the change:

```bash
git add frontend/src/services/api.js
git commit -m "Update API URL for production"
git push
```

## Step 5: Deploy Frontend to Render

1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `productivity-social-frontend`
   - **Environment**: `Node`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Start Command**: `cd frontend && npx serve -s build -l $PORT`
   - **Instance Type**: Free
5. Add Environment Variable:
   - `REACT_APP_API_URL`: Your backend URL (e.g., `https://productivity-social-backend.onrender.com/api`)
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)

## Step 6: Update CORS Settings

1. Go to your backend service on Render
2. Update the `CORS_ALLOWED_ORIGINS` environment variable
3. Set it to your frontend URL (e.g., `https://productivity-social-frontend.onrender.com`)
4. Manually redeploy the backend service

## Step 7: Test Your Application

1. Visit your frontend URL
2. Register a new user
3. Create tasks, add friends, check the leaderboard
4. Test theme switching

## Important Notes

### Free Tier Limitations

- **Services spin down after 15 minutes of inactivity**
- First request after inactivity will take 30-50 seconds (cold start)
- 750 hours/month of free usage per service

### Security Best Practices

1. **Never commit sensitive data** to Git:

   - Add `.env` to `.gitignore`
   - Use environment variables for secrets

2. **Use strong JWT secret**:

   - Generate with: `openssl rand -base64 64`
   - Different secret for each environment

3. **Restrict MongoDB access**:
   - Use specific IP whitelist when possible
   - Create database user with minimal permissions

### Monitoring

1. View logs in Render Dashboard:

   - Select your service → Logs tab
   - Monitor for errors and performance issues

2. MongoDB Atlas monitoring:
   - Check database connections
   - Monitor query performance
   - Review security recommendations

### Custom Domain (Optional)

1. Go to your service settings
2. Click "Add Custom Domain"
3. Follow instructions to configure DNS

## Troubleshooting

### Backend won't start

- Check environment variables are set correctly
- Verify MongoDB URI is correct
- Check logs for specific error messages

### Frontend can't connect to backend

- Verify REACT_APP_API_URL is correct
- Check CORS_ALLOWED_ORIGINS includes frontend URL
- Ensure backend service is running

### Database connection issues

- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check database user credentials
- Test connection string locally first

### Cold start issues

- First request after inactivity takes longer
- Consider upgrading to paid tier for always-on services
- Or use a service like UptimeRobot to ping every 14 minutes

## Alternative: Deploy Everything on Render

You can also use Render's PostgreSQL or MongoDB hosting:

1. **Render MongoDB** (if available in your region)
   - Create a new MongoDB instance on Render
   - Use the provided connection string

## Environment Variables Summary

### Backend Service

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/productivity_social?retryWrites=true&w=majority
JWT_SECRET=<generate-64-char-random-string>
JWT_EXPIRATION=86400000
CORS_ALLOWED_ORIGINS=https://your-frontend.onrender.com
LOG_LEVEL=INFO
PORT=8080
```

### Frontend Service

```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

## Support

If you encounter issues:

1. Check Render documentation: [render.com/docs](https://render.com/docs)
2. MongoDB Atlas documentation: [docs.mongodb.com](https://docs.mongodb.com)
3. Review application logs in Render dashboard

---

**Note**: This deployment setup uses free tiers. For production applications with higher traffic, consider upgrading to paid tiers for better performance and reliability.
