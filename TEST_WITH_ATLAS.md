# Testing with MongoDB Atlas Connection String (Local)

This guide helps you test your application locally using MongoDB Atlas before deploying to Render.

## Why Test Locally with MongoDB Atlas?

1. Verify your MongoDB Atlas connection string works
2. Test the application as it will run in production
3. Catch any connection issues before deployment
4. Ensure your database user credentials are correct

## Step 1: Get MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace placeholders:
   - `<password>` → Your database user password
   - `<database>` → `productivity_social`

**Example:**

```
mongodb+srv://myuser:MyP@ssw0rd123@cluster0.abcd.mongodb.net/productivity_social?retryWrites=true&w=majority
```

## Step 2: Test Connection String

### Quick Test (Optional but Recommended)

Use MongoDB Compass or mongosh to test connection:

**Using mongosh:**

```bash
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/productivity_social"
```

If it connects successfully, your string is correct!

## Step 3: Configure Backend

### Option A: Using application.properties (Quick Test)

1. Open `backend/src/main/resources/application.properties`
2. **Temporarily** replace the MongoDB URI:

```properties
spring.data.mongodb.uri=mongodb+srv://your-connection-string-here
```

3. Run backend:

```bash
cd backend
mvn spring-boot:run
```

4. **IMPORTANT:** Don't commit this change! Revert after testing.

### Option B: Using Environment Variable (Recommended)

**macOS/Linux:**

```bash
export MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/productivity_social?retryWrites=true&w=majority"
cd backend
mvn spring-boot:run
```

**Windows (Command Prompt):**

```cmd
set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/productivity_social?retryWrites=true&w=majority
cd backend
mvn spring-boot:run
```

**Windows (PowerShell):**

```powershell
$env:MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/productivity_social?retryWrites=true&w=majority"
cd backend
mvn spring-boot:run
```

### Option C: Using IDE (IntelliJ IDEA / VS Code)

**IntelliJ IDEA:**

1. Edit Run Configuration
2. Add Environment Variables
3. Add: `MONGODB_URI=your-connection-string`
4. Run application

**VS Code:**

1. Create `.vscode/launch.json`
2. Add environment variable:

```json
{
  "configurations": [
    {
      "type": "java",
      "name": "Spring Boot",
      "request": "launch",
      "mainClass": "com.productivity.ProductivitySocialApplication",
      "env": {
        "MONGODB_URI": "your-connection-string-here"
      }
    }
  ]
}
```

## Step 4: Verify Connection

### Check Backend Logs

Look for successful connection message:

```
INFO  [main] o.s.d.m.core.MongoTemplate : Connected to MongoDB
```

### Test Health Endpoint

```bash
curl http://localhost:8080/api/auth/health
```

Expected response:

```json
{
  "status": "UP",
  "message": "Productivity Social API is running",
  "timestamp": "1234567890"
}
```

### Test Registration

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","username":"testuser","email":"test@example.com","password":"password123"}'
```

## Step 5: Run Frontend

```bash
cd frontend
npm start
```

Visit `http://localhost:3000` and test:

1. Register a new user
2. Login
3. Create a task
4. Complete a task to earn XP
5. Check leaderboard

## Step 6: Verify Data in MongoDB Atlas

1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. You should see:
   - `users` collection with your test user
   - `tasks` collection with your test tasks
   - `friendRequests` collection (if you tested friend requests)

## Troubleshooting

### Connection Timeout

**Error:** `MongoTimeoutException` or `Connection timeout`

**Solutions:**

1. Check IP whitelist in MongoDB Atlas (Network Access)
2. Add your current IP or use 0.0.0.0/0 for testing
3. Verify internet connection
4. Check if firewall is blocking MongoDB ports

### Authentication Failed

**Error:** `MongoSecurityException` or `Authentication failed`

**Solutions:**

1. Verify database user password is correct
2. Check username in connection string
3. Ensure user has read/write permissions
4. Try creating a new database user

### Invalid Connection String

**Error:** `IllegalArgumentException` or `Invalid connection string`

**Solutions:**

1. Ensure no spaces in connection string
2. Verify URL encoding of password (special characters)
3. Check format: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`
4. Don't forget `?retryWrites=true&w=majority` at the end

### Database Not Created

**Problem:** Collections not appearing in MongoDB Atlas

**Solution:**

- MongoDB creates database on first write operation
- Register a user or create a task
- Refresh "Browse Collections" in Atlas
- Database will appear automatically

### Special Characters in Password

If your password has special characters, URL encode them:

| Character | Encoded |
| --------- | ------- |
| @         | %40     |
| :         | %3A     |
| /         | %2F     |
| ?         | %3F     |
| #         | %23     |
| [         | %5B     |
| ]         | %5D     |
| %         | %25     |

**Example:**

- Password: `P@ss:word#123`
- Encoded: `P%40ss%3Aword%23123`
- Connection: `mongodb+srv://user:P%40ss%3Aword%23123@cluster.mongodb.net/...`

## Testing Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] IP address whitelisted (0.0.0.0/0 for testing)
- [ ] Connection string copied and password/database replaced
- [ ] Backend starts without errors
- [ ] Health endpoint returns "UP"
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Can create tasks
- [ ] Can complete tasks and earn XP
- [ ] Data appears in MongoDB Atlas
- [ ] Frontend connects to backend successfully

## Switch Back to Local MongoDB

After testing, to switch back to local MongoDB:

**Remove environment variable:**

```bash
unset MONGODB_URI  # macOS/Linux
set MONGODB_URI=    # Windows
```

Or simply restart your terminal and don't set the variable.

The application will use the default: `mongodb://localhost:27017/productivity_social`

## Next Step: Deploy to Render

Once everything works locally with MongoDB Atlas:

1. Commit your code (without the connection string!)
2. Push to GitHub
3. Follow [RENDER_QUICK_START.md](./RENDER_QUICK_START.md) to deploy

---

**Remember:** Never commit your MongoDB connection string to Git! Always use environment variables in production.
