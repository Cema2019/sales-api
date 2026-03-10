# Sales API — Express + MySQL Backend

A RESTful API built with **Node.js, Express, and MySQL** for managing Store inventory records.  
The project follows a **layered architecture** separating routes, controllers, services, and repositories for better scalability and maintainability.

---

# Features

- Full CRUD API for inventory records
- Layered architecture (Routes → Controllers → Services → Repositories)
- MySQL connection pool using `mysql2`
- Automatic total calculation (`price + delivery`)
- Centralized error handling middleware
- CORS enabled for frontend applications
- Separation of HTTP logic and database logic

---

# Technologies

### Backend

- Node.js
- Express.js
- MySQL
- mysql2
- dotenv
- cors

---

# Project Structure

```
src
│
├── controllers
│ └── sales.controller.js
│
├── services
│ └── sales.service.js
│
├── repositories
│ └── sales.repository.js
│
├── routes
│ └── sales.js
│
├── db
│ └── pool.js
│
└── index.js
```

### Layer Responsibilities

**Routes**
- Define HTTP endpoints
- Forward requests to controllers

**Controllers**
- Handle Express request/response
- Call services

**Services**
- Contain business logic
- Coordinate repositories

**Repositories**
- Execute SQL queries
- Communicate with MySQL

**Database Pool**
- Centralized MySQL connection management

---

# Setup

## Prerequisites

- Node.js v18+
- MySQL v8+
- Git

---

# Installation

Clone the repository


git clone https://github.com/Cema2019/sales-api.git

cd sales-api


Install dependencies


npm install


---

# Database Setup

Create the database


CREATE DATABASE sales_db;


Create the table

```
CREATE TABLE sales (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
price DECIMAL(10,2) NOT NULL,
delivery DECIMAL(10,2) NOT NULL
);
```

---

# Environment Variables

Create a `.env` file in the root folder

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=sales_db
```

---

# Run the Server


npm start


Server runs at


http://localhost:3000


---

# API Base URL


http://localhost:3000/api/sales


---

# API Endpoints

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/sales | Get all sales |
| GET | /api/sales/:id | Get sale by ID |
| POST | /api/sales | Create sale |
| PUT | /api/sales/:id | Update sale |
| DELETE | /api/sales/:id | Delete sale |

---

# Example Response


GET /api/sales
```
[{
"id": 1,
"name": "Laptop",
"price": 1000,
"delivery": 20,
"total": 1020
}]
```

---

# Create Sale Example


POST /api/sales


Request

```
{
"name": "Keyboard",
"price": 50,
"delivery": 5
}
```

Response

```
{
"id": 2,
"name": "Keyboard",
"price": 50,
"delivery": 5,
"total": 55
}
```

---

# Error Handling

Example error response

```
{
"error": "Sale not found"
}
```

HTTP status codes used

| Code | Meaning |
|-----|-----|
| 200 | Success |
| 201 | Resource created |
| 204 | Resource deleted |
| 400 | Bad request |
| 404 | Resource not found |
| 500 | Internal server error |

---

# Example cURL Requests

Get all sales


curl http://localhost:3000/api/sales


Create sale

```
curl -X POST http://localhost:3000/api/sales

-H "Content-Type: application/json"
-d '{"name":"Mouse","price":25,"delivery":5}'
```