

# Blog Project

## Overview

The goal of this assignment is to develop a backend for a blogging platform where users can write, update, and delete their blogs. The system will have two roles: **Admin** and **User**. The Admin has special permissions to manage users and their blogs, while users can perform CRUD operations on their own blogs. The backend will include secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

* * *
## important source:

1. Live Deployment Link ([live link](https://blog-application-wine-omega.vercel.app/))
   
2. GitHub Repository Links ([github](https://github.com/kazifahim7/Blog-application))

  

## Technologies

*   **TypeScript**
*   **Node.js**
*   **Express.js**
*   **MongoDB with Mongoose**

* * *

  

## Features and Requirements

### 1\. User Roles

#### Admin:

*   Will be created manually in the database with predefined credentials.
*   Can delete any blog.
*   Can block any user by updating a property `isBlocked`.
*   **Cannot update any blog.**

#### User:

*   Can register and log in.
*   Can create blogs (only when logged in).
*   Can update and delete their own blogs.
*   **Cannot perform admin actions.**

### 2\. Authentication & Authorization

#### Authentication:

*   Users must log in to perform write, update, and delete operations.

#### Authorization:

*   Admin and User roles must be differentiated and secured.

### 3\. Blog API

*   A public API for reading blogs:
    *   Includes blog title, content, author details & other necessary information.
    *   Supports **search**, **sorting**, and **filtering** functionalities.

* * *

## Models

  

**User Model:**

*   `name`: string – The full name of the user.
*   `email`: string – The email address of the user, used for authentication and communication.
*   `password`: string – The password for the user, securely stored.
*   `role`: "admin" | "user" – The role of the user, determining their access level. Default is "user".
*   `isBlocked`: boolean – A flag indicating whether the user is blocked or not. Default is false.
*   `createdAt`: Date – The timestamp when the user was created.
*   `updatedAt`: Date – The timestamp of the last update to the user.

  

**Blog Model:**

*   `title`: string – The title of the blog post.
*   `content`: string – The main body or content of the blog post.
*   `author`: ObjectId – A reference to the `User` model, indicating the author of the blog post.
*   `isPublished`: boolean – A flag indicating whether the blog post is published. Default is true (published).
*   `createdAt`: Date – The timestamp when the blog post was created.
*   `updatedAt`: Date – The timestamp of the last update to the blog post.

##   

## API Endpoints

### 1\. Authentication

#### 1.1 Register User

**POST** `https://blog-application-wine-omega.vercel.app/api/auth/register`

**Description:** Registers a new user with the platform. It validates user data and saves it to the database.

**Request Body:**

```json
{
  "name": "fahim",
  "email": "fahim@example.com",
  "password": "123456"
}
```

**Response:**

*   **Success (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "name": "string",
    "email": "string"
  }
}
```

*   **Failure (400):**

```json
{
  "success": false,
  "message": "Validation error",
  "statusCode": 400,
  "error": { "details" },
  "stack": "error stack"
}
```

####   

#### 1.2 Login User

**POST** `https://blog-application-wine-omega.vercel.app/api/auth/login`

**Description:** Authenticates a user with their email and password and generates a JWT token.

**Request Body:**

```json
{
  "email": "fahim@example.com",
  "password": "123456"
}
```

**Response:**

*   **Success (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
  }
}
```

*   **Failure (401):**

```json
{
  "success": false,
  "message": "Invalid credentials",
  "statusCode": 401,
  "error": { "details" },
  "stack": "error stack"
}
```

###   

### 2\. Blog Management

#### 2.1 Create Blog

**POST** `https://blog-application-wine-omega.vercel.app/api/blogs`

**Description:** Allows a logged-in user to create a blog by providing a title and content.

**Request Header:**`Authorization: Bearer <token>`

**Request Body:**

```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

**Response:**

*   **Success (201):**

```json
{
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

####   

#### 2.2 Update Blog

**PATCH** `https://blog-application-wine-omega.vercel.app/api/blogs/:id`

**Description:** Allows a logged-in user to update their own blog by its ID.

**Request Header:**`Authorization: Bearer <token>`

**Request Body:**

```json
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

**Response:**

*   **Success (200):**

```json
{
  "success": true,
  "message": "Blog updated successfully",
  "statusCode": 200,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

####   

#### 2.3 Delete Blog

**DELETE** `https://blog-application-wine-omega.vercel.app/api/blogs/:id`

**Description:** Allows a logged-in user to delete their own blog by its ID.

**Request Header:**`Authorization: Bearer <token>`

**Response:**

*   **Success (200):**

```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

####   

#### 2.4 Get All Blogs (Public)

**GET** `https://blog-application-wine-omega.vercel.app/api/blogs`

**Description:** Provides a public API to fetch all blogs with options for searching, sorting, and filtering.

**Query Parameters**:

*   `search`: Search blogs by title or content.
*   `sortBy`: Sort blogs by specific fields such as `createdAt` or `title` (e.g., `sortBy=title`).
*   `sortOrder`: Defines the sorting order. Accepts values `asc` (ascending) or `desc` (descending). (e.g., `sortOrder=desc`).
*   `filter`: Filter blogs by author ID (e.g., `author=authorId`).

  

**Example Request URL**:

```sql
https://blog-application-wine-omega.vercel.app/api/blogs?search=JavaScript&sortBy=createdAt&sortOrder=desc&filter=6765219e716005213effc0c8
```  

**Response:**

*   **Success (200):**

```json
{
  "success": true,
  "message": "Blogs fetched successfully",
  "statusCode": 200,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": { "details" }
    }
  ]
}
```

###   

### 3\. Admin Actions

#### 3.1 Block User

**PATCH** `https://blog-application-wine-omega.vercel.app/api/admin/users/:userId/block`

**Description:** Allows an admin to block a user by updating the `isBlocked` property to `true`.

**Request Header:**`Authorization: Bearer <admin_token>`

**Response:**

*   **Success (200):**

```json
{
  "success": true,
  "message": "User blocked successfully",
  "statusCode": 200
}
```

####   

#### 3.2 Delete Blog

**DELETE** `https://blog-application-wine-omega.vercel.app/api/admin/blogs/:id`

**Description:** Allows an admin to delete any blog by its ID.

**Request Header:**`Authorization: Bearer <admin_token>`

**Response:**

*   **Success (200):**

```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

* * *

  



### 1\. Error Handling

Error handling is crucial in ensuring that an application responds gracefully to unexpected situations, providing users with meaningful feedback while maintaining system stability. A well-structured error response format helps in identifying and diagnosing issues effectively.

```json
{
  "success": false,
  "message": "Error message describing the issue",
  "statusCode": 400, 
  "error": {"details": "Additional error details, if applicable"},
  "stack": "error stack trace, if available"
}
```

#### Types of Errors Handled

The following common errors will be managed with appropriate responses:

*   **Zod Validation Error** (`ZOD_ERROR`): Errors arising from invalid data inputs based on Zod schema validation.
*   **Not Found Error** (`NOT_FOUND_ERROR`): When requested resources (e.g., a user, item, or page) are not found.
*   **Validation Error** (`VALIDATION_ERROR`): General validation errors (e.g., incorrect data format, missing required fields).
*   **Authentication Error** (`AUTH_ERROR`): Issues related to failed authentication (e.g., invalid token or expired session).
*   **Authorization Error** (`AUTHORIZATION_ERROR`): When the user lacks the necessary permissions to access a resource.
*   **Internal Server Error** (`INTERNAL_SERVER_ERROR`): Unhandled errors or unexpected server issues.



  

#












---