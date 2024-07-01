# Art Gallery Project

## Description

This Art Gallery project is a Node.js application that allows users to manage artworks and handle user authentication. It provides a variety of features for both users and artworks.

## Features

### Authentication
- **User Signup**: Users can sign up for a new account.
- **User Login**: Users can log in to their account.
- **User Logout**: Users can log out of their account.
- **Forgot Password**: Users can request a password reset.
- **Reset Password**: Users can reset their password using a token sent via email.

### Artwork Management
- **Get All Artworks**: Retrieve a list of all artworks.
- **Create Artwork**: Create a new artwork entry.
- **Get Artwork by ID**: Retrieve details of a specific artwork by its ID.
- **Update Artwork**: Update the details of a specific artwork.
- **Delete Artwork**: Delete a specific artwork.

### User Management
- **Get All Users**: Retrieve a list of all users (protected route).

## Routes

### Base Routes
- `/api/v1/users` - User routes
- `/api/v1/artworks` Artwork routes

### Authentication Routes
- `POST /signup` - User signup
- `POST /login` - User login
- `GET /logout` - User logout
- `POST /forgotPassword` - Request password reset
- `PATCH /resetPassword/:token` - Reset password with token

### Artwork Routes
- `GET /` - Get all artworks
- `POST /` - Create a new artwork
- `GET /:id` - Get artwork by ID
- `PATCH /:id` - Update artwork by ID
- `DELETE /:id` - Delete artwork by ID

### User Routes
- `GET /` - Get all users (protected route)

## Middleware

- **authController.protect**: Protect routes to ensure only authenticated users can access them.
- **artworkValidator**: Validate artwork data before creation.

## Usage

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd art-gallery-project
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the application**:
    ```bash
    npm start
    ```
