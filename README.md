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

- `app.js` - Express app configuration, security middleware, rate limits, routes, and error handling
- `bin/www` - HTTP server bootstrap: connects to MongoDB, then listens; graceful shutdown
- `auth/` - JWT authentication helpers
- `models/` - Mongoose schemas
- `routes/` - API route handlers
- `util/` - Config loading and validation, request validation helpers, email sending
- `public/` - Static assets

## Prerequisites

- Node.js 20 or newer
- MongoDB running locally or a MongoDB connection string
- A working email account for SMTP delivery
- An OpenAI API key if you want the chatbot fallback endpoint to respond

## Environment Variables

Create a local `.env` file from `.env.example` and provide these values. The server refuses to start if `JWT_SECRET` is missing, still a placeholder, or shorter than 32 characters.

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Random secret (32+ chars) used to sign access tokens
- `APP_URL` - Base URL for verification and password reset links
- `FRONTEND_URL` - Allowed frontend origin for CORS
- `TRUST_PROXY` - Number of reverse proxies in front of the app (e.g. `1`), so rate limits see real client IPs
- `SMTP_HOST`, `SMTP_PORT` - SMTP server (defaults: `smtp.gmail.com`, `465`; use `587` for STARTTLS)
- `SMTP_USER`, `SMTP_PASS` - SMTP credentials (for Gmail, an app password)
- `MAIL_FROM` - Optional sender address, defaults to `SMTP_USER`
- `OPENAI_API_KEY` - OpenAI API key for the chatbot fallback (optional)
- `DIALOGFLOW_WEBHOOK_SECRET` - Shared secret Dialogflow must send in the `X-Webhook-Secret` header

Generate secrets with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
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
- `GET /user/getid` - Get the current authenticated user
- `GET /user/get` - List users (admin)
- `DELETE /user/:id` - Delete a user and their ads, parts, and reset tokens (admin)
- `GET /verify/:verifycode` - Verify a user account
- `POST /resetpassword` - Send a password reset email (always returns 200)
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
- `PUT /mechanics/approve/:id` - Approve a mechanic (admin)
- `GET /mechanics/approved` - List approved mechanics
- `GET /mechanics/unapproved` - List unapproved mechanics (admin)

### Chatbot

- `POST /dialogflow` - Dialogflow webhook endpoint with OpenAI fallback. In the Dialogflow console, add a webhook header `X-Webhook-Secret` with the value of `DIALOGFLOW_WEBHOOK_SECRET`; requests without it are rejected.

### Operations

- `GET /healthz` - Returns 200 when the database is connected, 503 otherwise

## Notes

- The repository keeps `.env.example` in version control and ignores the local `.env` file.
- Several routes expect an `Authorization: Bearer <token>` header; missing or invalid tokens get a 401.
- Admin routes need a user whose `role` is `admin`. There is no endpoint to grant it; set it in the database.
- Request bodies are validated, and fields the server owns (likes, ratings, approval, role) are ignored if sent.
- Signup, sign-in, password reset, verification, and the Dialogflow webhook are rate limited per IP. Limits are in memory, so use a shared store such as Redis before running more than one instance.

## License

No license file is currently included.