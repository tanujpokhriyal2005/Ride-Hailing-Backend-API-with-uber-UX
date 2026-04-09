# Uber Backend API Documentation

## User Registration Endpoint

### POST /user/register

Registers a new user in the system.

#### Request Body
The request must include the following JSON fields:

```json
{
  "fullname": "string",  // Full name as a string (e.g., "John Doe"). Will be split into firstname and lastname.
  "email": "string",     // Valid email address
  "password": "string"   // Password (minimum 6 characters)
}
```

#### Validation Rules
- **email**: Must be a valid email format
- **fullname.firstname**: Must be at least 3 characters long (derived from fullname)
- **password**: Must be at least 6 characters long

#### Response

##### Success (201 Created)
```json
{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string",
    "socketId": "string"
  },
  "token": "string"  // JWT authentication token
}
```

##### Validation Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

##### Internal Server Error (500)
```json
{
  "error": "Internal server error message"
}
```

#### Example Request
```bash
curl -X POST http://localhost:4000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

#### Notes
- Passwords are hashed before storage using bcrypt
- Email addresses must be unique
- JWT token expires in 1 hour
- User data is validated before creation

## User Profile Endpoint

### GET /users/profile

Retrieves the authenticated user's profile information.

#### Authentication
Requires a valid JWT token in the Authorization header.

#### Request Headers
```
Authorization: Bearer <jwt_token>
```

#### Response

##### Success (200 OK)
```json
{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string",
    "socketId": "string"
  }
}
```

##### Unauthorized (401)
```json
{
  "error": "Unauthorized"
}
```

#### Example Request
```bash
curl -X GET http://localhost:4000/users/profile \
  -H "Authorization: Bearer <your_jwt_token>"
```

#### Notes
- Requires authentication
- Returns the current user's profile data

## User Logout Endpoint

### GET /users/logout

Logs out the authenticated user by clearing the session cookie and blacklisting the JWT token.

#### Authentication
Requires a valid JWT token in the Authorization header.

#### Request Headers
```
Authorization: Bearer <jwt_token>
```

#### Response

##### Success (200 OK)
```json
{
  "message": "Logged out successfully"
}
```

##### Unauthorized (401)
```json
{
  "error": "Unauthorized"
}
```

#### Example Request
```bash
curl -X GET http://localhost:4000/users/logout \
  -H "Authorization: Bearer <your_jwt_token>"
```

#### Notes
- Requires authentication
- Clears the session cookie
- Blacklists the JWT token to prevent reuse
- User will need to login again to access protected routes