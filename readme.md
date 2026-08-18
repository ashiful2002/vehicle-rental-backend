# Vehicle Rental Management Backend

A robust, object-oriented REST API built for vehicle fleet management. It features authentication, fleet management, booking logic with collision detection, and automated monthly reporting.

## 🚀 Live Demo

**Base URL:** `https://vehicle-rental-backend-opal.vercel.app/api/v1`

---

## 🛠 Tech Stack

- **Language:** TypeScript
- **Runtime/Framework:** Node.js, Express.js
- **Database:** PostgreSQL
- **Query Builder:** Knex.js
- **Authentication:** JSON Web Tokens (JWT)
- **Validation:** Joi
- **File Handling:** Multer (Local Storage)
- **Code Quality:** ESLint, Prettier

---

## 🏗 Architecture & Design

This project follows an **OOP-based service structure** to ensure clean separation of concerns:

- **Routes:** Define endpoint paths and input validation.
- **Controllers:** Handle request/response lifecycle.
- **Services:** Contain business logic (e.g., collision detection, revenue calculation).
- **Migrations:** Handle database schema versioning.

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js (v18+)
- PostgreSQL
- `pnpm` or `npm`

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   Install dependencies:
   ```

Bash
npm install
Setup environment variables:

Bash
cp .env.example .env

# Edit .env and add your DATABASE_URL, JWT_SECRET, etc.

Run migrations:

Bash
npx knex migrate:latest
Start the development server:

Bash
npm run dev
🔑 Authentication
All administrative endpoints are protected. Include the generated JWT in the Authorization header:
Authorization: Bearer <your_jwt_token>

POST /auth/login: Authenticate staff and receive a token.

🛣 API Endpoints
Vehicles
GET /vehicles: List vehicles (Supports pagination, category filtering, and search).

GET /vehicles/:id: Get detailed information for a specific vehicle.

POST /vehicles: Add a new vehicle (supports image upload).

PUT /vehicles/:id: Update vehicle details.

DELETE /vehicles/:id: Soft delete a vehicle.

Rentals
GET /rentals: View rental history (Filterable by vehicle_id, status, and date range).

POST /rentals: Create a new booking (Includes automatic overlap validation and cost calculation).

PUT /rentals/:id: Update booking (Re-triggers overlap check).

DELETE /rentals/:id: Cancel/Delete a booking.

Reports
GET /reports/rentals?month=YYYY-MM: Retrieve a monthly summary of vehicle rental activity (Days rented and revenue). Includes identification of the top-performing vehicle.

🧠 Key Logic Highlights
Collision Detection: The system prevents double-booking by calculating overlapping intervals in the service layer, wrapped in database transactions to prevent race conditions.

Time-Bound Reporting: Revenue and days-rented are computed dynamically based on the intersection of the rental period and the target month, accurately handling rentals that span across multiple months.
