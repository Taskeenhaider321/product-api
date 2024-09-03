# Product Management API

## Overview

This API provides a simple and scalable solution for managing a list of products and also provide the facility to create account and logged into system to test the protected routes. The API is built using NestJS and includes the following features:

### Features

- **CRUD Operations**: Create, Read, Update, Delete products.
- **Search Functionality**: Search products by name, description, or category.
- **Pagination**: Efficiently handle large datasets with pagination.
- **Validation**: Input data validation using DTOs and Pipes.
- **Error Handling**: Graceful handling of errors with appropriate HTTP status codes.
- **Authentication and Authorization**: Secure endpoints with JWT-based authentication.
- **Swagger Documentation**: Auto-generated API documentation.
- **Database**: MongoDB is used as database.
- **Unit and Integration Tests**: Comprehensive test coverage for API reliability.

## Prerequisites

- **Node.js** (version 14.x or later)
- **npm** (version 6.x or later)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Taskeenhaider321/product-api.git
cd product-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```bash
PORT=3000
DB_URL=mongodb+srv://taskeen5099:Xwu3LT6WKLqauq88@cluster0.dnawuou.mongodb.net/nest
JWT_SECRET=BirthdayBoy2001
JWT_EXPIRE=3d
```

### 4. Start the Server

```bash
npm run start:dev
```

The server will start on `http://localhost:3000`.

### 5. Access Swagger Documentation

Visit `http://localhost:3000/api` to access the Swagger documentation.

### 6. Run the Test Cases
```bash
npm run test:watch
```

## Routes and API Endpoints

### 1. **Create a Product**

- **Method**: `POST`
- **Path**: `http://localhost:3000/product`
- **Description**: Adds a new product to the database.
- **Request Body**:
    ```json
    {
      "name": "Product Name",
      "description": "Product Description",
      "price": 100.0,
      "category": "Category Name"
    }
    ```
- **Response**:
    - **Success (201)**:
      ```json
      {
        "id": "unique-object-id",
        "name": "Product Name",
        "description": "Product Description",
        "price": 100.0,
        "category": "Category Name"
      }
      ```
    - **Validation Error (400)**: Returns validation error details.



### 2. **Get All Products**

- **Method**: `GET`
- **Path**: `http://localhost:3000/product/all-products`
- **Description**: Retrieves all products with optional search, filtering, and pagination.
- **Query Parameters**:
  - `keyword`: Search keyword for product title or description (optional).
  - `category`: Filter by product category (optional).
  - `page`: Page number (default: 1).
  - `limit`: Number of items per page (default: 10).
- **Response**:
    - **Success (200)**:
      ```json
      {
        "data": [
          {
            "id": "unique-object-id",
            "title": "Product Title",
            "description": "Product Description",
            "price": 100.0,
            "category": "Category Name"
          }
        ],
        "page": 1,
        "limit": 10,
        "totalCount": 50
      }
      ```
    - **Error (500)**:
      ```json
      {
        "message": "Error fetching products"
      }
      ```

### 3. **Get a Product by ID**

- **Method**: `GET`
- **Path**: `http://localhost:3000/product/{id}`
- **Description**: Retrieves a single product by its unique ID.
- **Response**:
    - **Success (200)**:
      ```json
      {
        "id": "unique-product-id",
        "name": "Product Name",
        "description": "Product Description",
        "price": 100.0,
        "category": "Category Name"
      }
      ```
    - **Not Found (404)**: Returns an error if the product does not exist.

### 4. **Update a Product**

- **Method**: `PUT`
- **Path**: `http://localhost:3000/product/{id}`
- **Description**: Updates an existing product by its unique ID.
- **Request Body** (Any of the following fields can be updated):
    ```json
    {
      "name": "Updated Product Name",
      "description": "Updated Product Description",
      "price": 120.0,
      "category": "Updated Category"
    }
    ```
- **Response**:
    - **Success (200)**:
      ```json
      {
        "id": "unique-product-id",
        "name": "Updated Product Name",
        "description": "Updated Product Description",
        "price": 120.0,
        "category": "Updated Category"
      }
      ```
    - **Not Found (404)**: Returns an error if the product does not exist.

### 5. **Delete a Product**

- **Method**: `DELETE`
- **Path**: `http://localhost:3000/product/{id}`
- **Description**: Deletes a product by its unique ID.
- **Response**:
    - **Success (200)**: Returns a message confirming deletion.
      ```json
      {
        "message": "Product successfully deleted."
      }
      ```
    - **Not Found (404)**: Returns an error if the product does not exist.

### 6. **User Login**

- **Method**: `POST`
- **Path**: `http://localhost:3000/auth/login`
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```
- **Response**:
  - **Success (200)**:
    ```json
    {
      "token": "jwt-token",
      "user": {
        "name": "User Name",
        "email": "user@example.com"
      },
      "message": "User logged in successfully"
    }
    ```
  - **Error (401)**:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```
  - **Error (500)**:
    ```json
    {
      "message": "Error during login process"
    }
    ```

### 7. **User Sign-Up**

- **Method**: `POST`
- **Path**: `http://localhost:3000/auth/sign-up`
- **Description**: Creates a new user account and returns a JWT token.
- **Request Body**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```
- **Response**:
  - **Success (201)**:
    ```json
    {
      "token": "jwt-token",
      "user": {
        "name": "User Name",
        "email": "user@example.com"
      },
      "message": "User created successfully"
    }
    ```
  - **Error (409)**:
    ```json
    {
      "message": "Email already exists"
    }
    ```
  - **Error (500)**:
    ```json
    {
      "message": "Error during signup process"
    }
    ```

### 8. **Get All Users**

- **Method**: `GET`
- **Path**: `http://localhost:3000/auth/all-users`
- **Description**: Retrieves a list of all registered users.
- **Response**:
  - **Success (200)**:
    ```json
    {
      "users": [
        {
          "name": "User Name 1",
          "email": "user1@example.com"
        },
        {
          "name": "User Name 2",
          "email": "user2@example.com"
        }
      ],
      "message": "Users retrieved successfully"
    }
    ```
  - **Error (500)**:
    ```json
    {
      "message": "Error while retrieving users"
    }
    ```

### 9. **Delete User**

- **Method**: `DELETE`
- **Path**: `http://localhost:3000/auth/{id}`
- **Description**: Deletes a user by their ID.
- **Path Parameters**:
  - `id`: The ID of the user to delete.
- **Response**:
  - **Success (200)**:
    ```json
    {
      "message": "User deleted successfully"
    }
    ```
  - **Error (404)**:
    ```json
    {
      "message": "User not found"
    }
    ```
  - **Error (500)**:
    ```json
    {
      "message": "Error while deleting user"
    }
    ```

## External Libraries Used

- **NestJS**: A progressive Node.js framework for building efficient, scalable server-side applications.
- **TypeORM** (Optional): An ORM for TypeScript and JavaScript (ES7, ES6, ES5). Supports multiple database systems like MySQL, PostgreSQL, etc.
- **class-validator**: A library used for validation using TypeScript decorators.
- **class-transformer**: A library used for transforming TypeScript objects into different formats.
- **Passport**: Middleware for authentication.
- **JWT**: JSON Web Token implementation.
- **Swagger**: API documentation generator for RESTful APIs.
- **Jest**: Testing framework for JavaScript and TypeScript.
- **Postman**: HTTP assertions for integration tests.

## Best Practices Followed

- **Separation of Concerns**: Business logic is handled in services, and HTTP routing is managed by controllers.
- **DTOs and Validation**: DTOs (Data Transfer Objects) are used to ensure that only valid data is processed.
- **Error Handling**: Exception filters are implemented to catch and handle errors gracefully.
- **Security**: JWT-based authentication ensures secure access to the API.
- **Pagination**: Efficient handling of large datasets using pagination to improve performance.
- **Documentation**: API is documented with Swagger for easy exploration and testing.
- **Testing**: Unit, integration, and end-to-end tests ensure the reliability of the API.

## Scalability Considerations

- **Modular Design**: The application is organized into modules, making it easy to extend and scale.
- **Database Integration**: The application used MongoDB as database.

## Security Considerations

- **Authentication and Authorization**: JWT-based authentication is used to protect routes.
- **Input Validation**: Input data is validated to prevent common vulnerabilities.

## Testing

### Unit Tests
- **Description**: Unit tests are written for each service and controller method to ensure they work as expected.
- **Framework**: Jest is used for unit testing.

### Integration Tests
- **Description**: Integration tests verify that different parts of the system work together correctly.
- **Framework**: Postman is used for HTTP assertions.