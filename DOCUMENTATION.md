# API Documentation

This documentation outlines the usage of the REST API for managing persons. The API provides CRUD (Create, Read, Update, Delete) operations on the "user" resource.

## Table of Contents

1. [Standard Request and Response Formats](#standard-request-and-response-formats)
2. [Sample Usage](#sample-usage)
3. [Known Limitations and Assumptions](#known-limitations-and-assumptions)
4. [Setting Up and Deploying the API](#setting-up-and-deploying-the-api)

## Standard Request and Response Formats

### Create a New User

**Request Format:**

- **Method:** POST
- **Endpoint:** `/api`
- **Request Body:**

  ```json
  {
    "name": "John Doe"
  }
  ```

**Response Format:**

- **Status Code:** 201 (Created)
- **Response Body (Example):**

  ```json
  {
    "id": 1,
    "name": "John Doe"
  }
  ```

### Fetch Details of a user by ID

**Request Format:**

- **Method:** GET
- **Endpoint:** `/api/:id`

**Response Format:**

- **Status Code:** 200 (OK)
- **Response Body (Example):**

  ```json
  {
    "id": 1,
    "name": "John Doe"
  }
  ```

### Update Details of an Existing User by ID

**Request Format:**

- **Method:** PUT
- **Endpoint:** `/api/:id`
- **Request Body:**

  ```json
  {
    "name": "Jane Doe"
  }
  ```

**Response Format:**

- **Status Code:** 200 (OK)
- **Response Body (Example):**

  ```json
  {
    "message": "User updated successfully"
  }
  ```

### Remove a user by ID

**Request Format:**

- **Method:** DELETE
- **Endpoint:** `/api/:id`

**Response Format:**

- **Status Code:** 200 (OK)
- **Response Body (Example):**

  ```json
  {
    "message": "User removed successfully"
  }
  ```

## Sample Usage

Here are some sample usage scenarios of the API:

### Create a New User

**Request:**

- Method: POST
- Endpoint: `/api`
- Request Body:

  ```json
  {
    "name": "Alice Smith"
  }
  ```

**Response:**

- Status Code: 201 (Created)
- Response Body:

  ```json
  {
    "id": 2,
    "name": "Alice Smith"
  }
  ```

### Fetch Details of a user by ID

**Request:**

- Method: GET
- Endpoint: `/api/2`

**Response:**

- Status Code: 200 (OK)
- Response Body:

  ```json
  {
    "id": 2,
    "name": "Alice Smith"
  }
  ```

### Update Details of an Existing user by ID

**Request:**

- Method: PUT
- Endpoint: `/api/2`
- Request Body:

  ```json
  {
    "name": "Alice Johnson"
  }
  ```

**Response:**

- Status Code: 200 (OK)
- Response Body:

  ```json
  {
    "message": "User updated successfully"
  }
  ```

### Remove a Person by ID

**Request:**

- Method: DELETE
- Endpoint: `/api/2`

**Response:**

- Status Code: 200 (OK)
- Response Body:

  ```json
  {
    "message": "User removed successfully"
  }
  ```

## Known Limitations and Assumptions

- The API assumes that "name" is the only field required for a person's record.
- It currently uses an in-memory SQLite database for simplicity. In a production environment, you should use a persistent database like PostgreSQL or MySQL.
- Error handling is basic and should be improved for production use.
- Authentication and authorization mechanisms are not implemented in this version of the API.
- The API does not handle concurrent requests well in its current state and would need further optimization for production usage.

## Setting Up and Deploying the API

To set up and deploy the API, follow these steps:

1. **Installation:**
   - Clone the repository.
   - Navigate to the project directory.
   - Install dependencies with `npm install`.

2. **Local Development:**
   - Start the server locally with `npm start`.
   - The API will be available at `http://localhost:3000`.

3. **Deployment:**
   - Deploy the API to a hosting service like Heroku following their deployment instructions.
   - Configure environment variables for production, including database connection details and security settings.