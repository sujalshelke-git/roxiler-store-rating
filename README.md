# Roxiler Store Rating system

A full-stack Store Rating Platform built as part of the Roxiler Systems Full Stack Developer Assessment.

The application provides role-based access for **System Administrator**, **Normal User**, and **Store Owner** with secure authentication, store management, rating functionality, search, pagination, sorting, and dashboard analytics.

---

# 🚀 Tech Stack

## Frontend

- React.js
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt

---

# 📁 Project Structure

```
roxiler-store-rating/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── types/
│
├── server/
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validators/
│
└── README.md
```

---

# ✨ Features

## Authentication

- User Registration
- Secure Login
- JWT Authentication
- HTTP Only Cookies
- Role Based Authorization
- Logout
- Change Password

---

## 👨‍💼 Administrator

### Dashboard

- Total Users
- Total Stores
- Total Ratings

### User Management

- Create User
- View Users
- Search Users
- Pagination
- Sorting
- View User Details

### Store Management

- Create Store
- View Stores
- Search Stores
- Pagination
- Sorting
- View Store Details

---

## 👤 Normal User

- Register
- Login
- Browse Stores
- Search Stores
- Pagination
- Sorting
- View Average Rating
- Submit Rating
- Update Rating
- Change Password

---

## 🏬 Store Owner

- Login
- Dashboard
- View Store Details
- Average Store Rating
- View Customer Ratings
- Change Password

---

# 🔒 Authentication

JWT based authentication is implemented.

Features include

- Protected Routes
- Role Based Access Control
- Password Hashing using bcrypt
- Secure Middleware
- Authorization Guards

---

# 📊 Database

Main Entities

- User
- Store
- Rating

Relationships

```
Owner
   │
   └────── Store

User
   │
   └────── Rating

Store
   │
   └────── Ratings
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/roxiler-store-rating.git
```

---

## Backend

```bash
cd server

npm install
```

Create `.env`

```env
DATABASE_URL=your_postgresql_url

JWT_SECRET=your_secret_key

PORT=5000
```

Run Prisma

```bash
npx prisma generate

npx prisma migrate dev
```

Start Server

```bash
npm run dev
```

---

## Frontend

```bash
cd client

npm install

npm run dev
```

---

# 🔑 Demo Credentials

## Administrator

```
Email:
admin@gmail.com

Password:
Admin@123
```

---

## Store Owner

```
Email:
owner@gmail.com

Password:
Owner@123
```

---

## Normal User

```
Email:
sujal@gmail.com

Password:
User@123
```

---

# 📌 API Endpoints

## Authentication

```
POST /api/auth/signup

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/me
```

---

## Admin

```
GET /api/admin/dashboard

GET /api/admin/users

POST /api/admin/users

GET /api/admin/users/:id

GET /api/admin/stores

POST /api/admin/stores

GET /api/admin/stores/:id
```

---

## User

```
GET /api/stores

POST /api/stores/:storeId/rating

PUT /api/stores/:storeId/rating

PUT /api/stores/change-password
```

---

## Store Owner

```
GET /api/owner/dashboard

PUT /api/owner/change-password
```

---

# ✅ Validation

Implemented using Zod

Validation includes

- Name
- Email
- Password
- Address
- Ratings

---

# 📈 Implemented Functionalities

- Role Based Authentication
- Dashboard Analytics
- CRUD Operations
- Search
- Pagination
- Sorting
- Store Ratings
- Average Rating Calculation
- Password Change
- Error Handling
- Protected Routes
- Responsive UI

---

# 🏗️ Architecture

Backend follows a layered architecture

```
Routes
      ↓
Controllers
      ↓
Services
      ↓
Prisma ORM
      ↓
PostgreSQL
```

Frontend Architecture

```
Pages
     ↓
Components
     ↓
API Layer
     ↓
Axios
     ↓
Backend
```

---

# 🛠️ Best Practices

- TypeScript
- Modular Architecture
- Reusable Components
- Clean Folder Structure
- Service Layer
- Error Handling Middleware
- Async Handler
- JWT Authentication
- Environment Variables
- Prisma ORM
- React Context API

---

# 📸 Screenshots

Add screenshots of

- Login
- Admin Dashboard
- Users
- Stores
- User Dashboard
- Owner Dashboard

---

#  Author

**Sujal Shelke**

GitHub:
https://github.com/sujalshelke-git



---

# 📄 License

This project was developed as part of the **Roxiler Systems Full Stack Developer Assessment**.
