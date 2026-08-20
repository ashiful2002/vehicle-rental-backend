# Vehicle Rental Management Backend

A robust, object-oriented REST API for managing vehicles, staff authentication, rentals, and monthly rental reports.

The project is built with **Node.js, Express.js, TypeScript, PostgreSQL, and Knex.js**, following a modular OOP-based architecture with separate routes, controllers, services, validation, migrations, and database seeds.

## 🚀 Live Demo

**Base URL:**  
https://vehicle-rental-backend-opal.vercel.app

---

## 🛠 Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Query Builder:** Knex.js
- **Authentication:** JWT
- **Password Hashing:** bcrypt
- **Validation:** Joi
- **File Upload:** Multer
- **Code Quality:** ESLint, Prettier
- **Package Manager:** pnpm

---

## 🏗 Architecture

The project follows a modular **Object-Oriented Programming (OOP)** architecture with clear separation of responsibilities.

```text
Request
   ↓
Route
   ↓
Controller
   ↓
Service
   ↓
Knex
   ↓
PostgreSQL
```

### Routes

Define API endpoints, authentication middleware, file uploads, and request validation.

### Controllers

Handle HTTP requests and responses. Controllers delegate business logic to services.

### Services

Contain the application's business logic, database operations, validation-related logic, rental calculations, and reporting logic.

Services receive their dependencies through constructors where applicable, following a dependency-injection approach.

### Validation

Joi schemas are used to validate incoming request data before it reaches the controller/service layer.

### Database

Knex migrations are used for database schema management, while Knex seeds are used to create the initial staff account.

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── modules/
│   │   ├── auth/
│   │   ├── vehicles/
│   │   ├── rentals/
│   │   └── reports/
│   │
│   ├── config/
│   ├── middlewares/
│   ├── errorHelpers/
│   └── shared/
│
├── db/
│   ├── migrations/
│   └── seeds/
│
└── server.ts
```

---

# ⚙️ Setup & Installation

## Prerequisites

Make sure you have the following installed:

- Node.js 18+
- PostgreSQL
- pnpm

npm can also be used if preferred.

## 1. Clone the repository

```bash
git clone https://github.com/ashiful2002/vehicle-rental-backend

cd vehicle-rental-backend
```

## 2. Install dependencies

Using pnpm:

```bash
pnpm install
```

Or using npm:

```bash
npm install
```

## 3. Configure environment variables

Create a `.env` file:

```bash
cp .env.example .env
```

Then configure the required variables:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Use the variables provided in `.env.example` as the reference for the complete configuration.

> Never commit your actual `.env` file or production secrets to the repository.

---

# 🗄️ Database Setup

## 1. Run migrations

Create the required database tables:

```bash
pnpm knex migrate:latest
```

## 2. Seed the initial staff account

Staff registration is **not exposed as a public API endpoint**.

Instead, the initial staff account is created through a Knex database seed.

Run:

```bash
pnpm knex seed:run
```

The seed creates an initial staff account for testing:

```text
Email:    staff@example.com
Password: staff
```

The password is stored in the database as a bcrypt hash.

> For production use, seeded credentials should be replaced with secure credentials managed through environment variables or an appropriate administration process.

---

# 🔑 Authentication

The API uses **JWT-based authentication**.

## Login

```http
POST /auth/login
```

Example request:

```json
{
  "email": "staff@example.com",
  "password": "staff"
}
```

A successful login returns a JWT token.

Use the token for protected endpoints:

```http
Authorization: Bearer <your_jwt_token>
```

### Authentication Flow

```text
Seeded Staff Account
        ↓
POST /auth/login
        ↓
Verify Email & Password
        ↓
Generate JWT
        ↓
Authorization: 
        ↓
Protected API Routes
```

---

# 🚗 API Endpoints

## Authentication

| Method | Endpoint      | Description                          |
| ------ | ------------- | ------------------------------------ |
| POST   | `/auth/login` | Authenticate staff and receive a JWT |

---

## Vehicles

| Method | Endpoint        | Description                                |
| ------ | --------------- | ------------------------------------------ |
| GET    | `/vehicles`     | Get all vehicles with pagination/filtering |
| GET    | `/vehicles/:id` | Get a vehicle by ID                        |
| POST   | `/vehicles`     | Create a new vehicle                       |
| PUT    | `/vehicles/:id` | Update a vehicle                           |
| DELETE | `/vehicles/:id` | Soft-delete a vehicle                      |

### Vehicle List Filtering

The vehicle listing endpoint supports pagination and filtering.

Example:

```http
GET /vehicles?page=1&limit=10&name=Toyota&category=suv
```

---

## Rentals

| Method | Endpoint       | Description                                      |
| ------ | -------------- | ------------------------------------------------ |
| GET    | `/rentals`     | Get rental records with filtering and pagination |
| POST   | `/rentals`     | Create a new rental                              |
| PUT    | `/rentals/:id` | Update an existing rental                        |
| DELETE | `/rentals/:id` | Cancel/delete a rental                           |

Rental listing supports filtering such as:

- `vehicle_id`
- `status`
- Date range
- Pagination

---

## Reports

| Method | Endpoint           | Description                      |
| ------ | ------------------ | -------------------------------- |
| GET    | `/reports/rentals` | Generate a monthly rental report |

Example:

```http
GET /reports/rentals?month=2026-08
```

Optional vehicle filtering:

```http
GET /reports/rentals?month=2026-08&vehicle_id=1
```

The report includes:

- Total bookings
- Total rental days
- Revenue
- Top-performing vehicle

The reporting logic correctly handles rentals that start before or end after the selected month by calculating the rental period's intersection with the requested month.

---

## 📮 Postman API Collection

A Postman collection containing the API endpoints is included in the repository.

### Import the collection

1. Open Postman.
2. Click **Import**.
3. Select:

````text
postman/vehicle-rental-api.postman_collection.json


# 🧠 Key Features

### Vehicle Management

- Create vehicles
- Update vehicle information
- Retrieve individual vehicles
- Paginated vehicle listing
- Filter vehicles by category
- Search vehicles by name
- Soft delete vehicles
- Image upload support

### Rental Management

- Create vehicle rentals
- Update rentals
- Cancel rentals
- Prevent overlapping bookings
- Calculate rental duration
- Calculate rental cost
- Filter rental history
- Paginate rental records

### Monthly Reporting

The reporting system calculates:

- Number of bookings
- Total days rented
- Total revenue
- Top-performing vehicle

Rental periods that span multiple months are handled by calculating only the portion of the rental that falls within the requested month.

### Authentication & Security

- JWT authentication
- Password hashing with bcrypt
- Protected administrative routes
- Joi request validation
- Centralized error handling

---

# ▶️ Running the Project

### Development

```bash
pnpm dev
````

### Production

Build the project:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

---

# 🧪 Database Commands

Run the latest migrations:

```bash
pnpm knex migrate:latest
```

Rollback the latest migration:

```bash
pnpm knex migrate:rollback
```

Run database seeds:

```bash
pnpm knex seed:run
```

---

# 📝 Design Decisions

### Why Knex?

Knex was selected as the query builder to work directly with PostgreSQL while maintaining structured and readable database queries.

### Why OOP?

The application uses classes for controllers and services to provide clear separation of concerns and dependency management.

For example:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Database
```

This structure keeps HTTP handling separate from business logic and database operations.

### Why Seed Instead of Public Staff Registration?

The task provides a `staff` database table and requires staff authentication, but does not specify a public staff-registration endpoint.

Therefore, the initial staff account is created through a database seed rather than exposing a public `/register` endpoint.

This prevents arbitrary users from creating staff accounts through the API.

---

# 📌 Notes

- Protected endpoints require a valid JWT.
- The initial staff account is created using the Knex seed.
- Vehicle deletion is implemented as a soft delete.
- Uploaded vehicle images are handled using Multer.
- Request payloads are validated using Joi.
- Database schema changes are managed through Knex migrations.

---

## 👨‍💻 Author

**Ashiful Islam Mukto**

Built as a Backend Developer technical assessment.
