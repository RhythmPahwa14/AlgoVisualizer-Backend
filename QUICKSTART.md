# Quick Start Guide

## Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your settings
nano .env
```

Required settings in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/algovisualizer
JWT_SECRET=your-super-secret-random-string-here
PORT=3000
```

### 3. Start MongoDB
Option A - Local MongoDB:
```bash
mongod
```

Option B - MongoDB Atlas (Cloud):
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string
- Update MONGODB_URI in .env

### 4. Start Server
```bash
npm start
```

Server will run at: http://localhost:3000

## Test Authentication (2 minutes)

### Create a User
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"test123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

Save the returned token!

### Access Protected Route
```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## What You Get

✅ User registration with validation  
✅ Secure password hashing  
✅ JWT token authentication  
✅ Protected routes example  
✅ Complete error handling  

## Project Structure

```
├── config/db.js           → MongoDB connection
├── models/User.js         → User schema
├── routes/auth.js         → Login/signup endpoints
├── middleware/auth.js     → Token verification
└── app.js                 → Main app (connects MongoDB)
```

## Common Issues

### MongoDB Connection Failed
- Check MongoDB is running: `mongod`
- Verify MONGODB_URI in .env
- Check network/firewall settings

### Invalid Token
- Token expires after 7 days
- Use fresh token from login/signup
- Check Authorization header format: `Bearer TOKEN`

### Signup Failed
- Check all fields provided (username, email, password)
- Email/username must be unique
- Password minimum 6 characters

## Next Steps

- ✅ Read full docs: [README.md](README.md)
- ✅ View API examples: [API_EXAMPLES.md](API_EXAMPLES.md)
- ✅ Check implementation details: [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)

## Need Help?

1. Check the error message in response
2. Review server logs for detailed errors
3. Verify MongoDB connection
4. Check environment variables
5. Validate request format (Content-Type, JSON structure)

Happy coding! 🚀
