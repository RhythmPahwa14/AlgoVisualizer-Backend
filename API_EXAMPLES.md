# API Usage Examples

## Quick Start Guide

### 1. Signup (Create New User)

**Request:**
```bash
curl -X POST http://localhost:3001/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "mySecurePassword123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRhYmMxMjNkZWY0NTY3ODkiLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE2OTk0MjM2MDB9.xyz",
  "user": {
    "id": "654abc123def456789",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### 2. Login (Authenticate User)

**Request:**
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "mySecurePassword123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRhYmMxMjNkZWY0NTY3ODkiLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE2OTk0MjM2MDB9.xyz",
  "user": {
    "id": "654abc123def456789",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### 3. Access Protected Route

**Request:**
```bash
# Save the token from login/signup response
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRhYmMxMjNkZWY0NTY3ODkiLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE2OTk0MjM2MDB9.xyz"

curl -X GET http://localhost:3001/users/profile \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Profile accessed successfully",
  "user": {
    "userId": "654abc123def456789",
    "username": "johndoe",
    "iat": 1699423600
  }
}
```

## Error Scenarios

### Missing Fields

**Request:**
```bash
curl -X POST http://localhost:3001/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

**Response:**
```json
{
  "success": false,
  "message": "Please provide username, email, and password"
}
```

### Duplicate User

**Request:**
```bash
# Try to signup with an existing email
curl -X POST http://localhost:3001/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "anothername",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": false,
  "message": "User with this email or username already exists"
}
```

### Invalid Credentials

**Request:**
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "wrongpassword"
  }'
```

**Response:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### No Token Provided

**Request:**
```bash
curl -X GET http://localhost:3001/users/profile
```

**Response:**
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

### Invalid Token

**Request:**
```bash
curl -X GET http://localhost:3001/users/profile \
  -H "Authorization: Bearer invalid.token.here"
```

**Response:**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

## Testing Workflow

1. **Create a new user** using `/auth/signup`
2. **Save the returned JWT token**
3. **Test login** using `/auth/login` with the same credentials
4. **Access protected routes** by including the token in the Authorization header
5. **Test error cases** to ensure validation works properly

## Using with Frontend/Mobile App

When integrating with a frontend or mobile application:

1. Store the JWT token securely (localStorage, sessionStorage, or secure storage)
2. Include the token in the Authorization header for all protected API calls
3. Handle token expiration (tokens expire after 7 days)
4. Implement logout by removing the stored token
5. Redirect to login page when receiving 401/403 responses

## Integration Example (JavaScript/Fetch)

```javascript
// Signup
const signup = async (username, email, password) => {
  const response = await fetch('http://localhost:3001/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });
  const data = await response.json();
  
  if (data.success) {
    // Store token
    localStorage.setItem('token', data.token);
    return data.user;
  }
  throw new Error(data.message);
};

// Login
const login = async (email, password) => {
  const response = await fetch('http://localhost:3001/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  
  if (data.success) {
    // Store token
    localStorage.setItem('token', data.token);
    return data.user;
  }
  throw new Error(data.message);
};

// Access protected route
const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3001/users/profile', {
    method: 'GET',
    headers: { 
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  
  if (data.success) {
    return data.user;
  }
  throw new Error(data.message);
};
```
