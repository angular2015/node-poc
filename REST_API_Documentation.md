# REST API Documentation

## 1. User Authentication API

- **Method**: `POST`
- **Endpoint**: `/signup`
- **Request Body**:

```json
{
  "username": "string", // Required: Must be unique, 3-30 characters long
  "email": "user@example.com", // Required: Must be a valid email format
  "password": "string" // Required: 8-100 characters, must contain letters and numbers
}
```

**Response:**

- **Success** (200):

```json
{
  "id": 1,
  "username": "string",
  "email": "user@example.com",
  "createdAt": "2024-09-24T12:34:56.789Z",
  "updatedAt": "2024-09-24T12:34:56.789Z"
}
```

- **Error** (400):

```json
{
  "error": {
    "message": "Validation error",
    "details": {
      "username": "Username must be between 3 and 30 characters long."
    }
  }
}
```

### 1.1 Login

**Request:**

- **Method**: `POST`
- **Endpoint**: `/login`
- **Request Body**:

```json
{
  "username": "user@example.com",
  "password": "your_password"
}
```

**Response:**

- **Success** (200):

```json
{
  "message": "Login successful!",
  "token": "your_jwt_token"
}
```

- **Error** (400):

```json
{
  "message": "Invalid username or password"
}
```

### 1.2 Logout

**Request:**

- **Method**: `POST`
- **Endpoint**: `/logout`
- **Headers**:

```
Authorization: Bearer your_jwt_token
```

**Response:**

- **Success** (200):

```json
{
  "message": "Logged out successfully. Please remove the token from client."
}
```

## 2. CRUD Operations for Items

### 2.1 Create Item

**Request:**

- **Method**: `POST`
- **Endpoint**: `/items`
- **Headers**:

```
Authorization: Bearer your_jwt_token
```

- **Request Body**:

```json
{
  "name": "string", // Required: 1-100 characters long
  "description": "string", // Optional: Detailed description of the item
  "price": 19.99, // Required: Must be a valid decimal and positive
  "quantity": 10, // Required: Must be an integer and zero or greater
  "category": "string", // Required: Item category
  "userId": 1 // Required: ID of the user creating the item
}
```

**Response:**

- **Success** (201):

```json
{
  "message": "Item created successfully",
  "item": {
    "id": 1,
    "name": "string",
    "description": "string",
    "price": 19.99,
    "quantity": 10,
    "category": "string",
    "userId": 1,
    "createdAt": "2024-09-24T12:34:56.789Z",
    "updatedAt": "2024-09-24T12:34:56.789Z"
  }
}
```

- **Error** (400):

```json
{
  "message": "Error creating item"
}
```

### 2.2 Get All Items

**Request:**

- **Method**: `GET`
- **Endpoint**: `/items`
- **Headers**:

```
Authorization: Bearer your_jwt_token
```

**Response:**

- **Success** (200):

```json
[
  {
    "id": 1,
    "name": "Item Name",
    "description": "Item Description"
  },
  {
    "id": 2,
    "name": "Another Item",
    "description": "Another Description"
  }
]
```

- **Error** (401):

```json
{
  "message": "Access denied. No token provided."
}
```

### 2.3 Get Single Item

**Request:**

- **Method**: `GET`
- **Endpoint**: `/items/:id` (replace `:id` with the item ID)
- **Headers**:

```
Authorization: Bearer your_jwt_token
```

**Response:**

- **Success** (200):

```json
{
  "id": 1,
  "name": "Item Name",
  "description": "Item Description"
}
```

- **Error** (404):

```json
{
  "message": "Item not found"
}
```

### 2.4 Update Item

**Request:**

- **Method**: `PUT`
- **Endpoint**: `/items/:id` (replace `:id` with the item ID)
- **Headers**:

```
Authorization: Bearer your_jwt_token
```

- **Request Body**:

```json
{
  "name": "Updated Item Name",
  "description": "Updated Description"
}
```

**Response:**

- **Success** (200):

```json
{
  "message": "Item updated successfully",
  "item": {
    "id": 1,
    "name": "Updated Item Name",
    "description": "Updated Description"
  }
}
```

- **Error** (404):

```json
{
  "message": "Item not found"
}
```

### 2.5 Delete Item

**Request:**

- **Method**: `DELETE`
- **Endpoint**: `/items/:id` (replace `:id` with the item ID)
- **Headers**:

```
Authorization: Bearer your_jwt_token
```

**Response:**

- **Success** (200):

```json
{
  "message": "Item deleted successfully"
}
```

- **Error** (404):

```json
{
  "message": "Item not found"
}
```

## Summary of API Endpoints

| Method | Endpoint     | Description                     |
| ------ | ------------ | ------------------------------- |
| POST   | `/login`     | Authenticate user and get token |
| POST   | `/logout`    | Logout user                     |
| POST   | `/items`     | Create a new item               |
| GET    | `/items`     | Get all items                   |
| GET    | `/items/:id` | Get a single item               |
| PUT    | `/items/:id` | Update an existing item         |
| DELETE | `/items/:id` | Delete an existing item         |

"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzaWRfZGV2IiwiaWF0IjoxNzI3MTYxOTI4LCJleHAiOjE3MjcxNjU1Mjh9.JY6pOYyYGwMDtpS3l0gvWO8fLoy7uPZmOR-br-IdIVQ"
