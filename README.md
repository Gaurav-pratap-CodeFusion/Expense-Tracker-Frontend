# Expense Tracker Frontend

A full-stack Expense Tracker application frontend built using Next.js, TypeScript, Tailwind CSS, Axios, and JWT Authentication.

---

# Features

## Authentication

- User Register
- User Login
- JWT Token Authentication
- Logout Functionality

---

# User Features

- Add Expense
- View My Expenses
- View Expense Details
- Update Expense
- Delete Expense
- Comment on Expenses
- View Admin Comments

---

# Admin Features

- View Pending Expenses
- Approve Expense
- Reject Expense with Reason
- View All Expenses
- Comment on User Expenses

---

# Tech Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Axios
- React Hot Toast

## Backend

- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- SQL Server

---

# Project Structure

```bash
src
│
├── app
├── components
├── services
├── types
└── middleware.ts
```

---

# API Integration

The frontend is connected with Spring Boot REST APIs using Axios.

JWT token is automatically attached in every protected API request using Axios Interceptors.

---

# Authentication Flow

1. User logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Axios interceptor attaches token in Authorization header
5. Backend validates JWT token using JwtFilter

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

# Install Dependencies

```bash
npm install
```

---

# Run Project

```bash
npm run dev
```

---

# Frontend URL

```bash
http://localhost:3000
```

---

# Backend URL

```bash
http://localhost:8080
```

---

# Environment

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

---

# Author

Gaurav Pratap