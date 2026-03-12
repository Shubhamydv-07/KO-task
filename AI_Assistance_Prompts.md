# AI Assistance Prompts Used in Building the Task Management Portal

This document outlines the systematic prompts provided to the AI assistant to architect and develop the MERN Stack Task Management Portal. It details the reasoning behind each prompt and the specific codebase components generated as a result.

---

## 1. Project Architecture and Strategy

**Prompt:**
> "You are a senior MERN stack engineer. I want to build a Task Management Portal using the following stack: Frontend (React with Vite, Axios, TailwindCSS), Backend (Next.js API routes), Database (MongoDB with Mongoose), Authentication (JWT, bcrypt). Core Features: Add Task, View Tasks, Mark Task as Completed, Filtering. Requirements: Users see only their own tasks, clean folder structure, REST APIs, error handling, env variables. Generate the full project architecture... Explain the architecture clearly before writing code."

**Purpose:**
To establish a clear, scalable, and modular foundation before writing any code. By defining the exact technology stack, core features, and security requirements upfront, this prompt ensures that both the frontend (Vite) and backend (Next.js) are logically decoupled while maintaining strict data ownership (users only seeing their own tasks).

**Output Generated:**
*   A comprehensive monorepo-style Folder Structure separating `/frontend` and `/backend`.
*   Detailed Database Schema definitions for `User` and `Task` entities.
*   A complete REST API endpoint mapping matrix.
*   A step-by-step Authentication Flow conceptualization.
*   A lightweight Frontend State Management strategy utilizing React Context API.

---

## 2. Backend Application Development

**Prompt:**
> "Now generate the backend code for the Task Management Portal. Use: Next.js API routes, MongoDB with Mongoose, JWT authentication, bcrypt for password hashing. Implement the following: User Model, Task Model. API Endpoints: POST /api/auth/register, POST /api/auth/login, POST /api/tasks, GET /api/tasks, PUT /api/tasks/:id, DELETE /api/tasks/:id. Requirements: Middleware for JWT authentication, Only authenticated users can access tasks, Each user sees only their own tasks, Clean modular folder structure. Also generate MongoDB connection file, JWT middleware, Example .env file."

**Purpose:**
To rapidly scaffold a production-ready serverless backend infrastructure. The prompt specifically enforces security best practices by requiring JWT middleware and strict database querying to ensure data privacy (data isolation per user).

**Output Generated:**
*   **Database Connectivity:** `src/lib/mongoose.js` with connection caching optimized for Next.js hot-reloading.
*   **Mongoose Models:** Secure `User.js` (with password exclusion) and relational `Task.js` schemas.
*   **Security Middleware:** `src/middleware/auth.js` for intercepting requests and parsing Bearer tokens securely.
*   **Authentication API:** Next.js route handlers for user registration and login (`register/route.js`, `login/route.js`) with bcrypt integration.
*   **Protected Task API:** Full CRUD route handlers (`tasks/route.js`, `tasks/[id]/route.js`) tightly bound to the authenticated user's ID.
*   **Environment Configuration:** A `.env` file scaffolded with a cryptographically secure random JWT secret.

---

## 3. Frontend Integration and API Service Scaffolding

**Prompt:**
> "Now show how to integrate the React frontend with the Next.js backend. Provide: Axios API service file, Authentication token handling, Protected routes, API call examples. Also provide: Steps to run backend, Steps to run frontend, MongoDB setup instructions."

**Purpose:**
To bridge the gap between the isolated React/Vite UI and the secure Next.js backend. This prompt focuses heavily on the mechanics of authenticating a stateless frontend by systematically handling and injecting JSON Web Tokens into network requests.

**Output Generated:**
*   **Network Abstract Layer:** `frontend/src/services/api.js` utilizing Axios interceptors to automatically attach JWTs to headers and handle `401 Unauthorized` responses globally.
*   **Global State Management:** `frontend/src/context/AuthContext.jsx` leveraging React Context to persist user sessions via `localStorage` and manage login/logout side effects.
*   **Route Security Constraints:** `frontend/src/components/ProtectedRoute.jsx` — a Higher-Order Component preventing unauthenticated access to the Dashboard.
*   **Data Service Implementations:** `frontend/src/services/taskService.js` illustrating clean abstraction of backend HTTP calls for the React UI.
*   **Configuration & Build:** Tailored `.env` configuration mapping the Vite application to the local Next.js API endpoints.

---

## 4. Documentation Generation

**Prompt:**
> "Create a document titled: 'AI Assistance Prompts Used in Building the Task Management Portal'. Include: Each prompt used, Why the prompt was written, What part of the code it generated. Structure: Prompt, Purpose, Output Generated. Make it professional and submission ready."

**Purpose:**
To retroactively document the engineering process, tracking how high-level architectural requirements were systematically translated into executable engineering instructions.

**Output Generated:**
*   This professional markdown document serving as a development log and project submission artifact.
