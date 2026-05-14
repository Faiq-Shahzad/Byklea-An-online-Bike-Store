# Byklea Backend

Byklea Backend is an Express and MongoDB API for a motorcycle marketplace. It supports user accounts, email verification, password reset, ads, spare parts, mechanic listings, and an AI fallback endpoint for unknown chatbot queries.

## Tech Stack

- Node.js
- Express
- MongoDB and Mongoose
- JSON Web Tokens for authentication
- Nodemailer for email delivery
- OpenAI API for conversational fallback responses

## Features

- User signup, login, email verification, and password reset
- JWT-protected routes for authenticated actions
- Ads management with like, rate, filter, update, and delete flows
- Spare parts management with like, rate, filter, update, and delete flows
- Mechanic signup and approval workflow
- Email delivery for verification and password reset links
- Dialogflow webhook route with OpenAI fallback handling

## Project Structure

- `app.js` - Express app configuration, middleware, routes, database connection, and webhook handler
- `bin/www` - HTTP server bootstrap
- `auth/` - JWT authentication helpers
- `models/` - Mongoose schemas
- `routes/` - API route handlers
- `util/` - Shared utilities such as email sending
- `views/` - Jade templates for error handling
- `public/` - Static assets

## Prerequisites

- Node.js 18 or newer
- MongoDB running locally or a MongoDB connection string
- A working email account for SMTP delivery
- An OpenAI API key if you want the chatbot fallback endpoint to respond

## Environment Variables

Create a local `.env` file from `.env.example` and provide these values:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret used to sign and verify access tokens
- `APP_URL` - Base URL for verification and password reset links
- `FRONTEND_URL` - Allowed frontend origin for CORS
- `USER` - Email account used by Nodemailer
- `PASS` - Email account password or app password
- `OPENAI_API_KEY` - OpenAI API key

Example:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/byklea
JWT_SECRET=change_me
APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001
USER=your_email@example.com
PASS=your_email_password
OPENAI_API_KEY=your_openai_key
```

## Setup

1. Copy `.env.example` to `.env`.
2. Fill in the required environment variables.
3. Install dependencies.
4. Start the server.

```bash
npm install
npm start
```

## Scripts

- `npm start` - Starts the server with `node ./bin/www`

## API Overview

### Authentication and Users

- `POST /user/signup` - Create a new user and send a verification email
- `POST /user/signin` - Sign in and receive a JWT
- `GET /user/getid` - Get the current authenticated user ID
- `GET /verify/:verifycode` - Verify a user account
- `POST /resetpassword` - Send a password reset email
- `GET /resetpassword/:id/:token` - Validate a password reset link
- `POST /resetpassword/:id/:token` - Set a new password

### Ads

- `POST /ads/add` - Create an ad
- `GET /ads/get` - List all ads
- `GET /ads/get/:id` - List ads for a user
- `DELETE /ads/delete/:id` - Delete an ad
- `PUT /ads/update/:id` - Update an ad
- `POST /ads/like/:id` - Like or unlike an ad
- `POST /ads/rate/:id` - Rate an ad
- `POST /ads/ratings` - Filter ads by rating range
- `GET /ads/likes` - Sort ads by likes
- `POST /ads/prices` - Filter ads by price range

### Parts

- `POST /parts/add` - Create a part listing
- `GET /parts/get` - List all parts
- `GET /parts/get/:id` - List parts for a user
- `DELETE /parts/delete/:id` - Delete a part
- `PUT /parts/update/:id` - Update a part
- `POST /parts/like/:id` - Like or unlike a part
- `POST /parts/rate/:id` - Rate a part
- `POST /parts/ratings` - Filter parts by rating range
- `GET /parts/likes` - Sort parts by likes
- `POST /parts/prices` - Filter parts by price range

### Mechanics

- `POST /mechanics/signup` - Register a mechanic
- `PUT /mechanics/approve/:id` - Approve a mechanic
- `GET /mechanics/approved` - List approved mechanics
- `GET /mechanics/unapproved` - List unapproved mechanics

### Chatbot

- `POST /dialogflow` - Dialogflow webhook endpoint with OpenAI fallback

## Notes

- The repository keeps `.env.example` in version control and ignores the local `.env` file.
- Several routes expect an `Authorization: Bearer <token>` header.
- Some routes are designed for authenticated users only and should be protected on the client side as well.

## License

No license file is currently included.