# VOID API Documentation

## Introduction
Welcome to the VOID API documentation. VOID API is an Offline First API designed to handle user registration and perform CRUD operations. Users can create posts within the application, and the system is built to prevent duplicate posts for the same user.

# Tech Stack
`In this API, we utilize the following technologies:`
- Node js
- Mysql db
- Typescript
- Prisma Orm
- Express Server

We are using uuid v4 to fill the IDs

# Database Connection
`NOTE` To connect to the MySQL provider, use the following environment variable:: 
```ts
DATABASE_URL="mysql://username:password@localhost:3306/dbname"
```

# Simple routing
`/users`
- `GET /users:` Returns all users.
- `GET /users/:`userId: Returns a user that matches the specified ID.
- `POST /users:` Creates a new user.
- `PUT /users/:userId:` Creates or updates a user with the matching ID.
- `DELETE /users/:userId:` Deletes a user with the matching ID.

# Composed routing

`/posts`
- `GET /users/posts/:userId:` Returns all posts belonging to the specified user using a semantic algorithm with a matching ID.
- `GET /posts:` Returns all posts in the system.
- `GET /posts/:userId?:` Returns posts for a user that matches the specified ID. If no ID is provided, returns all posts.

# Overview
The VOID API is built with offline-first principles in mind, ensuring robustness and reliability even in challenging network conditions. Dive into this documentation to gain a comprehensive understanding of how the API functions and explore its capabilities.
