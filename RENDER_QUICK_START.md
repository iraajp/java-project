# Productivity Social - Deploy to Render (Quick Start)

## 🚀 Quick Deployment Steps

### 1. Get MongoDB Atlas Connection String (5 minutes)

1. Visit [MongoDB Atlas](https://cloud.mongodb.com) and sign up/login
2. Create a FREE cluster
3. Create a database user (Database Access → Add New Database User)
4. Allow all IP addresses (Network Access → Add IP → 0.0.0.0/0)
5. Get connection string (Connect → Connect Your Application)
   - Copy the string
   - Replace `<password>` with your password
   - Replace `<database>` with `productivity_social`

**Example**: `mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/productivity_social?retryWrites=true&w=majority`

### 2. Push to GitHub (2 minutes)

```bash
cd "/Users/raajpatkar/java project"
git init
git add .
git commit -m "Initial commit for Render deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 3. Deploy Backend on Render (5 minutes)

1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. **Configure**:
   - **Name**: `productivity-social-backend`
   - **Environment**: `Java 17`
   - **Build Command**: `cd backend && mvn clean package -DskipTests`
   - **Start Command**: `cd backend && java -jar target/*.jar`
5. **Add Environment Variables** (click "Advanced" or go to Environment tab):
   ```
   MONGODB_URI = your_mongodb_atlas_connection_string
   JWT_SECRET = generate-random-64-char-string-here
   CORS_ALLOWED_ORIGINS = https://productivity-social-frontend.onrender.com
   ```
6. Click **"Create Web Service"**
7. Wait 5-10 minutes for deployment
8. **Copy your backend URL** (e.g., `https://productivity-social-backend.onrender.com`)

### 4. Deploy Frontend on Render (5 minutes)

1. Click **"New +"** → **"Web Service"**
2. Connect the same GitHub repository
3. **Configure**:
   - **Name**: `productivity-social-frontend`
   - **Environment**: `Node`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Start Command**: `cd frontend && npx serve -s build -l $PORT`
4. **Add Environment Variable**:
   ```
   REACT_APP_API_URL = https://YOUR-BACKEND-URL.onrender.com/api
   ```
   (Use the URL you copied in step 3)
5. Click **"Create Web Service"**
6. Wait 5-10 minutes for deployment

### 5. Update CORS (1 minute)

1. Go back to your **backend service** settings
2. Update `CORS_ALLOWED_ORIGINS` environment variable
3. Set it to: `https://YOUR-FRONTEND-URL.onrender.com`
4. Save and the service will auto-redeploy

### 6. Test! 🎉

Visit your frontend URL and test the application!

---

## 🔑 Generate JWT Secret

Run this in your terminal:

```bash
openssl rand -base64 64
```

---

## 📝 Environment Variables Cheat Sheet

### Backend

| Variable               | Example Value                                                     | Required         |
| ---------------------- | ----------------------------------------------------------------- | ---------------- |
| `MONGODB_URI`          | `mongodb+srv://user:pass@cluster.mongodb.net/productivity_social` | ✅ Yes           |
| `JWT_SECRET`           | 64 character random string                                        | ✅ Yes           |
| `CORS_ALLOWED_ORIGINS` | `https://your-frontend.onrender.com`                              | ✅ Yes           |
| `JWT_EXPIRATION`       | `86400000` (24 hours)                                             | No (has default) |
| `LOG_LEVEL`            | `INFO`                                                            | No (has default) |

### Frontend

| Variable            | Example Value                           | Required |
| ------------------- | --------------------------------------- | -------- |
| `REACT_APP_API_URL` | `https://your-backend.onrender.com/api` | ✅ Yes   |

---

## ⚠️ Important Notes

- **Free tier services spin down after 15 minutes of inactivity**
  - First request will take 30-50 seconds (cold start)
  - This is normal for free tier
- **Keep both URLs handy**:
  - You need the backend URL for frontend env var
  - You need the frontend URL for backend CORS setting

---

## 🐛 Troubleshooting

### Backend won't start

- Check logs: Click on service → "Logs" tab
- Verify MONGODB_URI is correct (test it locally first)
- Ensure all environment variables are set

### Frontend can't connect

- Check REACT_APP_API_URL includes `/api` at the end
- Verify backend CORS_ALLOWED_ORIGINS includes your frontend URL
- Check browser console for errors

### "Origin not allowed" error

- Update backend CORS_ALLOWED_ORIGINS to match your frontend URL exactly
- Don't include trailing slash in CORS setting

---

For detailed documentation, see [DEPLOYMENT.md](./DEPLOYMENT.md)
