# Ride-hailing API with Uber-like Frontend

This repository is a minimal ride-hailing application (Uber clone) containing:

- A backend REST API built with Node.js, Express and MongoDB that manages users, captains (drivers), rides, and real-time notifications.
- A React + Vite frontend that mimics Uber's UX for requesting rides and captain workflows.

This README summarizes the tech stack, architecture, why choices were made, how to run the project, and important implementation details.

**Project Structure**
- Backend: `Backend/` — Express app, Mongoose models, controllers, services, socket integration.
- Frontend: `frontend/` — React app (Vite), pages, components, context providers and Socket client.

**High-level Features**
- User registration, login, profile and logout (JWT + cookies).
- Captain (driver) registration/login and location updates.
- Create ride requests, calculate fare, notify nearby captains in real-time using Socket.IO.
- Ride lifecycle: confirm, start (OTP check), end — with socket notifications to users.

Tech Stack and Why
- Node.js + Express — lightweight, widely used for building REST APIs; flexible routing and middleware.
- MongoDB + Mongoose — document database well suited to flexible ride/user/captain schemas and geospatial queries.
- Socket.IO — real-time bidirectional events between frontend and backend to notify captains/users about rides and location updates.
- JWT (jsonwebtoken) + cookies — stateless authentication for API endpoints and quick auth flows for frontend.
- bcrypt — secure password hashing.
- React + Vite — fast development and modern frontend stack for building a responsive SPA.
- Tailwind (observed in styles) — utility-first CSS for rapid UI development.

Backend Implementation Notes
- Entry points: `Backend/app.js` and `Backend/server.js`.
- Database: `Backend/db/db.js` connects to MongoDB using `process.env.DB_CONNECT`.
- Authentication: users and captains use JWT generated in model methods; tokens are set into cookies on login.
- Socket integration: `Backend/socket.js` initializes Socket.IO, stores socket IDs on user/captain records, and exposes `sendMessageToSocketId` to emit events.
- Controllers and services: business logic separated into `controllers/` and `services/`.

Key backend routes (overview)
- `POST /users/register` — register user
- `POST /users/login` — login user
- `GET /users/profile` — protected: get user profile
- `POST /users/logout` — blacklist token + clear cookie
- `POST /rides` — create a ride request (notifies nearby captains)
- `GET /rides/fare` — get estimated fare
- `POST /rides/confirm` — captain confirms ride
- `POST /rides/start` — start ride (OTP)
- `POST /rides/end` — end ride
- `GET /maps/...` and `GET /captains/...` — map and captain related endpoints (see `Backend/routes/` for exact endpoints)

Frontend Implementation Notes
- App entry: `frontend/src/main.jsx` and `frontend/src/App.jsx`.
- Routing: `react-router-dom` organizes user and captain flows (login, signup, home, riding pages).
- Context providers: `frontend/src/context/` contains `UserContext`, `CaptainContext`, and `SocketContext` to manage global auth state and socket connection.
- Socket client: frontend uses `socket.io-client` via `SocketContext` to emit `join`, `update-location-captain` and to listen for `new-ride`, `ride-confirmed`, `ride-started`, etc.

Environment Variables
Create a `.env` file in `Backend/` with at least:

- `DB_CONNECT` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs
- `PORT` — optional server port (defaults to 3000)

Running Locally
1. Backend

   cd Backend
   npm install
   # create .env with DB_CONNECT and JWT_SECRET
   node server.js

   The server listens on `PORT` (default 3000). `server.js` also initializes Socket.IO.

2. Frontend

   cd frontend
   npm install
   npm run dev

   Open the app at the Vite dev URL (usually `http://localhost:5173`). The frontend connects to Socket.IO and the backend API — configure the backend URL in the frontend API client if needed (see `frontend/src` for axios usage).

Notes on Security and Production
- JWTs are signed with `process.env.JWT_SECRET`. Use a strong secret and set `NODE_ENV=production` when deploying.
- Cookie settings: cookies are set as `httpOnly` and `secure` when `NODE_ENV` is `production`.
- Token blacklist: the backend records blacklisted tokens (`blacklistToken.model`) to support logout.
- Ensure CORS is configured appropriately for production domains (currently `app.use(cors())` enables all origins).

Testing and Extending
- The project does not include automated tests — consider adding tests for services and controllers (Jest or Mocha).
- To enable geospatial captain queries, ensure captain locations are saved and indexed correctly. `maps.service` contains logic for geocoding and radius searches.

Deployment Suggestions
- Host backend on Node-friendly platform (Heroku, Railway, Render, DigitalOcean App Platform) and use managed MongoDB (MongoDB Atlas).
- Serve frontend as a static site (Vercel, Netlify) or from the same server behind a reverse proxy.
- Use HTTPS and environment-specific CORS settings in production.

Where to read code (important files)
- Backend entry: [Backend/app.js](Backend/app.js)
- Backend server/socket: [Backend/server.js](Backend/server.js), [Backend/socket.js](Backend/socket.js)
- Models: [Backend/models/user.model.js](Backend/models/user.model.js), [Backend/models/captain.model.js](Backend/models/captain.model.js)
- Core controllers: [Backend/controllers/user.contoller.js](Backend/controllers/user.contoller.js), [Backend/controllers/ride.controller.js](Backend/controllers/ride.controller.js)
- Frontend entry: [frontend/src/main.jsx](frontend/src/main.jsx)
- Frontend routes: [frontend/src/App.jsx](frontend/src/App.jsx)
- Socket client/provider: [frontend/src/context/SocketContext.jsx](frontend/src/context/SocketContext.jsx)

Final notes
- This repository is a strong starting point for a ride-hailing project: it has clear separation between controllers and services, uses Socket.IO for real-time updates, and a modern React frontend.
- If you'd like, I can:
  - Add example environment files and sample data.
  - Create Postman collection / curl examples for main endpoints.
  - Harden production settings (CORS, rate-limiting, helmet).

---
Made with love - Tanuj
