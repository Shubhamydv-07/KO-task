# TaskFlow - Task Management Portal

TaskFlow is a robust, full-stack Task Management application built with the MERN stack (MongoDB, Express/Next.js, React, Node.js). It features secure JWT authentication, real-time task tracking, and a premium, responsive UI.

## 🔗 Repository Link
[https://github.com/Shubhamydv-07/KO-task](https://github.com/Shubhamydv-07/KO-task)

---

## 🚀 How to Run Locally

### 1. Prerequisites
- **Node.js**: v18 or higher
- **MongoDB**: Local Community Server or MongoDB Atlas cluster
- **npm** or **pnpm**

### 2. Backend Setup (Next.js API)
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_generated_secret_here
```
Run the development server:
```bash
npm run dev
```
The API will be available at `http://localhost:3000/api`.

### 3. Frontend Setup (React + Vite)
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:3000/api
```
Run the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 🤖 AI Assistance and Development Process

### AI Prompts Used
The development was guided by a series of precise, senior-level engineering prompts. You can find the full list of prompts and their rationale in:
👉 [**AI_Assistance_Prompts.md**](./AI_Assistance_Prompts.md)

### What AI Generated vs. What was Modified
1.  **AI Generated**:
    - Full project architecture and folder scaffolding.
    - Mongoose models and database connection logic with caching.
    - JWT authentication flow and bcrypt password hashing implementation.
    - Next.js API route handlers for Auth and Tasks.
    - React Context-based state management and Axios interceptors.
    - Responsive TailwindCSS UI components and Pages.
2.  **Modifications & Manual Hooks**:
    - **CORS Configuration**: Manually adjusted `next.config.mjs` to resolve cross-origin issues between the Vite frontend and Next.js backend.
    - **Environment Mapping**: Manually verified and mapped `VITE_API_URL` to ensure seamless communication.
    - **PowerShell Compatibility**: Adjusted terminal commands to ensure compatibility with Windows PowerShell environments for local testing.

---

## 🏗️ API Design

The API is designed following **RESTful principles**, ensuring statelessness, predictability, and security.

### Authentication Endpoints
- `POST /api/auth/register`: Creates a new user. Performs password hashing on the server-side before storage. Returns a JWT.
- `POST /api/auth/login`: Authenticates user credentials. Uses bcrypt comparison against hashed passwords.

### Task Management Endpoints (JWT Protected)
- `GET /api/tasks`: Retrieves tasks belonging **only** to the authenticated user. Supports optional status filtering.
- `POST /api/tasks`: Creates a task. Automatically binds the user ID from the JWT payload to the task document.
- `PUT /api/tasks/:id`: Updates task status or content. Includes ownership verification logic (prevents unauthorized cross-user modifications).
- `DELETE /api/tasks/:id`: Permanently removes a task. Includes ownership verification.

---

## 🧠 State Management Strategy

The application employs a **Stateless-First** architecture on the frontend, using React's **Context API** for global session management and **Axios Interceptors** for networking.

### 1. Unified Authentication Context
The `AuthContext` acts as the single source of truth for the user's session. It handles:
- Persisting the JWT to `localStorage`.
- Automatically restoring the session on browser refresh.
- Providing `login`, `register`, and `logout` actions to the entire component tree.

### 2. Networking and Interceptors
Instead of passing tokens manually to every function, an **Axios Interceptor** is implemented:
- **Request Interceptor**: Automatically injects `Authorization: Bearer <token>` into every outgoing request.
- **Response Interceptor**: Monitors for `401 Unauthorized` errors. If a session expires locally, it triggers an automatic logout to maintain security.

### 3. Local UI State
Component-level state (like task lists and form inputs) is managed using React `useState` and `useEffect` hooks, ensuring high performance and minimal re-renders.