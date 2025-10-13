# Testing the Authentication System

## Manual Testing

Since there's no automated test suite in the project, here's how to manually test the authentication endpoints:

### Prerequisites
1. Install and run MongoDB locally or use MongoDB Atlas
2. Set up your `.env` file with the correct MONGODB_URI

### Testing Steps

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Test Signup Endpoint:**
   ```bash
   curl -X POST http://localhost:3000/auth/signup \
     -H "Content-Type: application/json" \
     -d '{
       "username": "testuser",
       "email": "test@example.com",
       "password": "password123"
     }'
   ```
   
   Expected: 201 status with user data and JWT token

3. **Test Login Endpoint:**
   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "password123"
     }'
   ```
   
   Expected: 200 status with user data and JWT token

4. **Test Validation:**
   - Try signup with missing fields
   - Try signup with existing email
   - Try login with wrong password
   - Try login with non-existent email

### Testing with Postman or Insomnia

You can also use API testing tools like Postman or Insomnia:

1. Import the endpoints
2. Set Content-Type header to `application/json`
3. Test various scenarios

### Expected Behaviors

#### Signup Success:
- Status: 201
- Returns: token, user object (without password)

#### Signup Failures:
- Missing fields: 400 with error message
- Duplicate email/username: 400 with error message

#### Login Success:
- Status: 200
- Returns: token, user object (without password)

#### Login Failures:
- Missing fields: 400 with error message
- Invalid credentials: 401 with error message
