# Ticket-Tooling-application

# 🎫 Ticket Tooling Application

A full-stack Ticket Management System built using **Node.js**, **Express**, **MongoDB**, and **React.js**. This application allows users to register, log in, and manage tickets effectively with admin employee and user roles.

---

## 🚀 Features

- User Registration & Login (JWT Auth)
- Role-based Access: Admin & User & employee
- Ticket Creation, Updating, and Deletion
- Admin can assign tickets
- Modern frontend with React and Material UI

---

## 🛠️ Tech Stack

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- GridFS for file handling
- JWT for authentication
- Multer, dotenv

### Frontend:
- React.js
- Material UI
- Axios
- React Router DOM

---



## ⚙️ Setup Instructions

### 📦 Prerequisites

- Node.js (v18 or higher)
- MongoDB (Local or Atlas)
- npm or yarn

---

### 🔧 Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd Server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   ```

4. Start the backend server:

   ```bash
   npm run dev
   ```

---

### 🌐 Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd Client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React frontend:

   ```bash
   npm start
   ```

---

