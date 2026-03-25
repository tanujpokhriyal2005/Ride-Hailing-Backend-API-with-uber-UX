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