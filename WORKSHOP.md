


Build a full-stack web application 

## Tech Stack & Project Structure
- Monorepo setup with two root directories: `/frontend` and `/backend`.
- Frontend: Next.js (App Router) + Tailwind CSS.
- Backend: FastAPI.
- Database: Supabase.

## Architecture
- Backend must follow a Flatted Clean Architecture (3 Layers: Router/Controller, Service, Repository).

```
my-project/
├── backend/
|    ├── main.py          # Entry point
|    ├── database.py      # Supabase setup
|    ├── schemas.py       # รวม Pydantic models ไว้ด้วยกัน
|    ├── routers.py       # รวม API endpoints ทั้งหมด
|    ├── services.py      # รวม Business logic
|    ├── repositories.py  # รวมการต่อ Supabase CRUD
|    ├── .env.example     # ตัวอย่างการตั้งค่า Environment variables
|    ├── requirements.txt # รวมการต่อ Supabase CRUD
|    └── test/            # รวม test_case_x.py

├── frontend/
|    ├── app/             # Next.js App Router pages
|    |   ├── layout.tsx   # Root layout (Providers, Navbar)
|    |   ├── page.tsx     # Home page
|    |   └── globals.css
|    ├── components/      # Shared UI components
|    ├── lib/
|    |   ├── api.ts       # fetch wrapper, token helpers, ApiError
|    |   ├── auth/        # AuthContext, useAuth hook, types
|    ├── types/           # TypeScript Interfaces (matching backend)
|    ├── next.config.mjs  # /api/* proxy → FastAPI backend
|    └── tailwind.config.ts       # Tailwind config containing the Summer Theme colors 
```


## Implementation Plan for Agent (Step-by-Step Execution)
**Agent Instruction:** Please execute this plan strictly phase-by-phase. Do NOT proceed to the next phase until the current phase is fully implemented, tested, and confirmed by the user.

### CHECKPOINT 1: Frontend Only (Static Mockup)
- Initialize the Next.js frontend project structure and apply the Tailwind CSS configuration.
- Run `npm install` and verify the project can start with `npm run dev`. Report the status to the user.
- Create frontend mockup data (e.g., hardcoded arrays) directly inside the Next.js components based on the data and feature requirements.
- Build the UI components and render the hardcoded mockup data.
- **Checkpoint:** Pause and prompt the user to open `http://localhost:3000` to verify the static UI.

### CHECKPOINT 2: Frontend + Backend API (Mockup Data via API)
- Initialize the FastAPI backend project structure.
- Create a Python virtual environment (`.venv`), install dependencies, and verify it starts with `uvicorn main:app --reload`.
- Move the mockup data from the frontend to the backend (store it as JSON/Dictionaries in memory).
- Create Pydantic schemas corresponding to the data structure.
- Create API endpoints (Routers) to serve this mockup data.
- **Frontend Update (CRITICAL - FOR WORKSHOP DEBUGGING):** - Refactor the frontend to fetch data from the FastAPI backend.
  - You MUST use **Client-Side Data Fetching**. Add `"use client"` directive at the top of the relevant Next.js components.
  - Use React's `useEffect` and `fetch()` to call the API.
  - *Reasoning:* This allows workshop participants to open the browser's Developer Tools -> **Network Tab** to easily inspect the HTTP requests, debug the JSON responses, and understand the Client-Server interaction. Do NOT use Server Components for these specific data fetches.
- **Checkpoint:** Pause and instruct the user to start both servers, open the browser's Network tab, and verify that the API call is visible and returning status 200.

### CHECKPOINT 3: Backend + Database (Supabase)
- Create .env file from .env.example
- Prepare the Supabase connection string. Use: `SUPABASE_URL=https://cfituupmvfjszwpvljja.supabase.co` and `SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmaXR1dXBtdmZqc3p3cHZsamphIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjczMzU5MCwiZXhwIjoyMDkyMzA5NTkwfQ.PKGQgr6wBuQ3bipFXQBcABPYoeq7s6hfwUQ4JG0pwRw`.
- Write a simple script or a `/health` endpoint to verify the database connection.
- Initialize the Supabase tables matching the defined Pydantic schemas (Write raw SQL or use the Supabase client for `CREATE TABLE`, `INSERT INTO` to seed initial data).
- Migrate the backend repositories to perform actual CRUD operations against Supabase instead of using the in-memory mockup data.
- **Checkpoint:** Pause and ask the user to test the database connection and verify the seeded data.

### CHECKPOINT 4: Full Stack Integration (Frontend + API + Database)
- Ensure full end-to-end connectivity. The Next.js frontend should now seamlessly fetch dynamic data from the FastAPI backend, which interacts directly with Supabase.
- Implement basic error handling on the frontend (e.g., show a loading state or error message if the API fails).
- **Checkpoint:** Prompt the user to test the entire application flow.
    
### CHECKPOINT 5: Push Code to Github
- Use gitignore to ignore .env* and other directory that contain credential files.
- Push the code to Github.
- **Checkpoint:** Report the success to user

### CHECKPOINT 6: Deploy on Google Cloud Run or Vercel
- Deploy the code to Google Cloud Run.
- **Checkpoint:** Report the success to user
    


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Deployment (Google Cloud Run - Monolith)

To deploy both the Next.js frontend and FastAPI backend as a single service (Monolith) on Google Cloud Run, we will package them into a single Docker container. Next.js will serve as the primary entry point on port `8080` and proxy `/api/*` requests to the internal FastAPI server running on port `8000`.

### 1. Preparation
Ensure your `frontend/next.config.js` is set up to rewrite API calls to the local FastAPI port inside the container:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "[http://127.0.0.1:8000/api/:path](http://127.0.0.1:8000/api/:path)*", // Proxy to internal FastAPI
      },
    ];
  },
};
export default nextConfig;


## Starting the Backend

We have configured the backend so you can start it directly from inside its folder using the Python virtual environment.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Activate the virtual environment:
   - **Windows:**
     ```powershell
     .\.venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```bash
     source .venv/bin/activate
     ```

3. Start the FastAPI server using Uvicorn:
   ```bash
   uvicorn main:app --reload
   ```
   *The API will be available at http://127.0.0.1:8000.*

## Starting the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   *The Web application will be available at http://localhost:3000.*

