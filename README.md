# Fans CRM Test Project

This is a NestJS project that demonstrates the implementation of JWT authentication along with basic user management routes. The project uses MySQL as the database and Sequelize as the ORM.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js**: v20.10.0 or later
- **npm**: v7.0.0 or later
- **Docker**: Installed and running for the MySQL database

## Installation

Follow these steps to set up the project:

1. **Clone the Repository**:

    ```bash
    git clone <repository_url>
    cd fans-crm-test
    ```

2. **Install Dependencies**:

    Run the following command to install all necessary Node.js dependencies:

    ```bash
    npm install
    ```

3. **Set Up the Environment Variables**:

    Create a `.env` file in the root of the project and add the following environment variables:

    ```plaintext
    JWT_SECRET=your_jwt_secret_key
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=nestjs_user
    DB_PASSWORD=nestjs_password
    DB_NAME=nestjs_db
    ```

4. **Set Up the Database**:

    The project uses MySQL as the database. You can start a MySQL instance using Docker.

    ```bash
    docker run --name nestjs-db -e MYSQL_ROOT_PASSWORD=yourpassword -e MYSQL_DATABASE=nestjs_db -e MYSQL_USER=nestjs_user -e MYSQL_PASSWORD=nestjs_password -p 3306:3306 -d mysql:8.0
    ```

5. **Run Database Migrations**:

    Run the following command to create the necessary tables:

    ```bash
    npm run build
    ```

## Running the Project

After completing the setup, you can run the project using the following command:

```bash
npm run start:dev
```

## Running Tests

This project uses Jest for unit testing. To run the tests, use the following command:

```bash
npm run test
```

## Testing the Routes

### 1. **Login to Get JWT Token**

- **URL:** `POST http://localhost:3000/auth/login`
- **Body:**

    ```json
    {
      "username": "testuser",
      "userId": "123"
    }
    ```

- **Response:**

    ```json
    {
      "access_token": "your_jwt_token"
    }
    ```

### 2. **Add a User**

- **URL:** `POST http://localhost:3000/api/v1/add-user`
- **Headers:**

    ```plaintext
    Authorization: Bearer your_jwt_token
    ```

- **Body:**

    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "phone": "1234567890"
    }
    ```

- **Response:** Returns the created user object.

### 3. **Get a User by ID**

- **URL:** `GET http://localhost:3000/api/v1/get-user/1`
- **Headers:**

    ```plaintext
    Authorization: Bearer your_jwt_token
    ```

- **Response:** Returns the user object with the specified ID.
