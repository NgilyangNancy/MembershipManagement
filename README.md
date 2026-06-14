# Membership Management System — MERN Stack

Built per the MERN syllabus: **MongoDB + Express + React + Node.js** with JWT auth, Mongoose, Multer, Axios, React Router DOM, and Bootstrap.

## Folder structure

```
membership-mern/
├── server/                Express + MongoDB API
│   ├── config/db.js
│   ├── models/            Mongoose schemas
│   ├── middleware/        auth + role middleware
│   ├── controllers/       route logic
│   ├── routes/            REST endpoints
│   ├── uploads/           Multer file storage
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── client/                React + Bootstrap frontend
    ├── public/index.html
    ├── src/
    │   ├── components/    Navbar, ProtectedRoute
    │   ├── context/       AuthContext
    │   ├── pages/         Login, Register, Dashboard, Plans, Members, Events, Announcements, Profile, Admin*
    │   ├── services/      axios instance
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    ├── package.json
    └── vite.config.js
```

## Setup

### 1) Backend
```bash
cd server
cp .env.example .env       # fill MONGO_URI + JWT_SECRET
npm install
npm run dev                # http://localhost:5000
```

### 2) Frontend
```bash
cd client
cp .env.example .env       # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                # http://localhost:5173
```

### 3) MongoDB Atlas
Create a free cluster on https://cloud.mongodb.com, whitelist your IP, copy the connection string into `server/.env` as `MONGO_URI`.

### 4) Promote an admin
After registering, in MongoDB:
```js
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "admin" } })
```

## Concepts covered
- React 18 + React Router DOM v6 (client-side routing)
- Express.js REST API with controllers + routers
- MongoDB Atlas + Mongoose schemas / refs / population
- JWT authentication (bcrypt password hashing)
- Multer file uploads (profile pictures, payment receipts)
- Axios HTTP client with interceptors
- Role-Based Access Control (admin / member)
- Bootstrap 5 UI
- Full CRUD: Plans, Memberships, Payments, Events, Announcements

## Modules (10)
1. Register  2. Login  3. Profile (with photo upload)  4. Plans (admin CRUD)
5. Memberships (subscribe / approve)  6. Payments (Multer receipt upload)
7. Events (admin CRUD + RSVP)  8. Announcements  9. Members list  10. Admin dashboard with reports
