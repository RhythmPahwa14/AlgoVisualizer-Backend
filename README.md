# AlgoVisualizer Backend

Backend server for AlgoVisualizer application with user authentication.

## Features

- User Registration (Signup)
- User Login
- JWT-based Authentication
- MongoDB Integration
- Password Hashing with bcrypt

## Prerequisites

- Node.js (v12 or higher)
- MongoDB (local or cloud instance)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/SandeepVashishtha/AlgoVisualizer-Backend.git
cd AlgoVisualizer-Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/algovisualizer
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
```

## Running the Application

Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### Authentication

#### Signup
Create a new user account.

**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User with this email or username already exists"
}
```

#### Login
Authenticate an existing user.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### Protected Endpoints

#### Get User Profile
Access user profile information (requires authentication).

**Endpoint:** `GET /users/profile`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile accessed successfully",
  "user": {
    "userId": "507f1f77bcf86cd799439011",
    "username": "johndoe"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

### Other Endpoints

#### GET /
Homepage endpoint showing server status.

#### GET /status
Backend status check endpoint.

## Testing with cURL

### Signup Example:
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login Example:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Protected Route Example:
```bash
# First, get the token from login/signup, then use it:
TOKEN="your-jwt-token-here"

curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer $TOKEN"
```

## Security Notes

- Passwords are hashed using bcrypt before storing in the database
- JWT tokens expire after 7 days
- Always use HTTPS in production
- Change the JWT_SECRET to a strong random string in production
- Never commit the `.env` file to version control

## Project Structure

```
AlgoVisualizer-Backend/
├── bin/
│   └── www              # Server startup script
├── config/
│   └── db.js            # MongoDB connection configuration
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── models/
│   └── User.js          # User model schema
├── routes/
│   ├── auth.js          # Authentication routes (login/signup)
│   ├── index.js         # Home routes
│   └── users.js         # User routes (includes protected example)
├── public/              # Static files
├── views/               # Pug templates
├── app.js               # Main application file
├── package.json         # Dependencies and scripts
├── .env.example         # Environment variables template
└── README.md            # Project documentation
```

## License

This project is open source and available under the MIT License.
