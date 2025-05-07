Sales API

A RESTful API built with Express.js and MySQL for managing sales data. This backend provides endpoints for creating, reading, updating, and deleting sales records.

## Table of Contents

-   Features
-   Technologies
-   Setup
-   API Endpoints
-   Database Schema
-   Usage

## Features

-   CRUD operations for sales records.
-   Calculates total cost (price + delivery) for each sale.
-   Input validation for creating and updating sales.
-   CORS support for cross-origin requests.
-   Error handling with appropriate HTTP status codes and messages.

## Technologies

-   **Node.js**: JavaScript runtime.
-   **Express.js**: Web framework for building the API.
-   **MySQL**: Relational database for storing sales data.
-   **dotenv**: For managing environment variables.
-   **CORS**: Middleware for enabling cross-origin requests.

## Setup

### Prerequisites

-   Node.js (v16 or higher)
-   MySQL (v8 or higher)
-   Git

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/sales-api.git
    cd sales-api
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Set up the database**:
    -   Create a MySQL database (e.g., sales\_db).
    -   Run the following SQL to create the sales table:

        ```sql
        CREATE TABLE sales (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          delivery DECIMAL(10, 2) NOT NULL
        );
        ```

4.  **Configure environment variables**:
    -   Create a .env file in the root directory.
    -   Add the following variables (replace with your MySQL credentials):

        ```plaintext
        PORT=3000
        DB_HOST=localhost
        DB_USER=your_mysql_user
        DB_PASSWORD=your_mysql_password
        DB_NAME=music_db
        ```

5.  **Start the server**:

    ```bash
    npm start
    ```

    The API will be running at http://localhost:3000.

## API Endpoints

All endpoints are prefixed with /api/sales.

<table style="min-width: 125px"><colgroup><col style="min-width: 25px"><col style="min-width: 25px"><col style="min-width: 25px"><col style="min-width: 25px"><col style="min-width: 25px"></colgroup><tbody><tr class="border-border"><th colspan="1" rowspan="1"><p dir="ltr">Method</p></th><th colspan="1" rowspan="1"><p dir="ltr">Endpoint</p></th><th colspan="1" rowspan="1"><p dir="ltr">Description</p></th><th colspan="1" rowspan="1"><p dir="ltr">Request Body</p></th><th colspan="1" rowspan="1"><p dir="ltr">Response</p></th></tr><tr class="border-border"><td colspan="1" rowspan="1"><p dir="ltr">GET</p></td><td colspan="1" rowspan="1"><p><span class="text-sm px-1 rounded-sm !font-mono bg-sunset/10 text-rust dark:bg-dawn/10 dark:text-dawn">/</span></p></td><td colspan="1" rowspan="1"><p dir="ltr">Retrieve all sales records</p></td><td colspan="1" rowspan="1"><p dir="ltr">None</p></td><td colspan="1" rowspan="1"><p dir="ltr">Array of sales objects <span class="text-sm px-1 rounded-sm !font-mono bg-sunset/10 text-rust dark:bg-dawn/10 dark:text-dawn">{ id, name, price, delivery, TOTAL }</span></p></td></tr><tr class="border-border"><td colspan="1" rowspan="1"><p dir="ltr">GET</p></td><td colspan="1" rowspan="1"><p dir="ltr"><span class="text-sm px-1 rounded-sm !font-mono bg-sunset/10 text-rust dark:bg-dawn/10 dark:text-dawn">/:id</span></p></td><td colspan="1" rowspan="1"><p dir="ltr">Retrieve a sale by ID</p></td><td colspan="1" rowspan="1"><p dir="ltr">None</p></td><td colspan="1" rowspan="1"><p dir="ltr">Sale object or <span class="text-sm px-1 rounded-sm !font-mono bg-sunset/10 text-rust dark:bg-dawn/10 dark:text-dawn">{ error: "Sale not found" }</span> (404)</p></td></tr><tr class="border-border"><td colspan="1" rowspan="1"><p dir="ltr">POST</p></td><td colspan="1" rowspan="1"><p><span class="text-sm px-1 rounded-sm !font-mono bg-sunset/10 text-rust dark:bg-dawn/10 dark:text-dawn">/</span></p></td><td colspan="1" rowspan="1"><p dir="ltr">Create a new sale</p></td><td colspan="1" rowspan="1"><p dir="ltr"><span class="text-sm px-1 rounded-sm !font-mono bg-sunset/10 text-rust dark:bg-dawn/10 dark:text-dawn">{ name: string, price: number, delivery: number }</span></p></td><td colspan="1" rowspan="1"><p dir="ltr">Created sale object (201) or <span class="text-sm px-1 rounded-sm !font-mono bg-sunset/10 text-rust dark:bg-dawn/10 dark:text-dawn">{ error: "..." }</span> (400)</p></td></tr><tr class="border-border"><td colspan="1" rowspan="1"><p dir="ltr">PUT</p></td><td colspan="1" rowspan="1"><p dir="ltr"><span class="text-sm px-1 rounded-sm !font-mono bg-sunset/10 text-rust dark:bg-dawn/10 dark:text-dawn">/:id</span></p></td><td colspan="1" rowspan="1"><p dir="ltr">Update a sale by ID</p></td><td colspan="1" rowspan="1"><p dir="ltr"><span class="text-sm px-1 rounded-sm !font-mono bg-sunset/10 text-rust dark:bg-dawn/10 dark:text-dawn">{ name: string, price: number, delivery: number }</span></p></td><td colspan="1" rowspan="1"><p dir="ltr">Updated sale object or <span class="text-sm px-1 rounded-sm !font-mono bg-sunset/10 text-rust dark:bg-dawn/10 dark:text-dawn">{ error: "..." }</span> (400, 404)</p></td></tr><tr class="border-border"><td colspan="1" rowspan="1"><p dir="ltr">DELETE</p></td><td colspan="1" rowspan="1"><p dir="ltr"><span class="text-sm px-1 rounded-sm !font-mono bg-sunset/10 text-rust dark:bg-dawn/10 dark:text-dawn">/:id</span></p></td><td colspan="1" rowspan="1"><p dir="ltr">Delete a sale by ID</p></td><td colspan="1" rowspan="1"><p dir="ltr">None</p></td><td colspan="1" rowspan="1"><p dir="ltr">No content (204) or <span class="text-sm px-1 rounded-sm !font-mono bg-sunset/10 text-rust dark:bg-dawn/10 dark:text-dawn">{ error: "Sale not found" }</span> (404)</p></td></tr></tbody></table>

### Example Requests

-   **Get all sales**:

    ```bash
    curl http://localhost:3000/api/sales
    ```

    Response:

    ```json
    [
      { "id": 1, "name": "Product A", "price": 100, "delivery": 10, "TOTAL": 110 },
      { "id": 2, "name": "Product B", "price": 200, "delivery": 20, "TOTAL": 220 }
    ]
    ```

-   **Create a sale**:

    ```bash
    curl -X POST http://localhost:3000/api/sales -H "Content-Type: application/json" -d '{"name":"Product C","price":150,"delivery":15}'
    ```

    Response:

    ```json
    { "id": 3, "name": "Product C", "price": 150, "delivery": 15, "TOTAL": 165 }
    ```

## Database Schema

The sales table has the following structure:

```sql
CREATE TABLE sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  delivery DECIMAL(10, 2) NOT NULL
);
```

## Usage

-   Use tools like Postman or cURL to test the API endpoints.
-   Integrate with a frontend application (e.g., React, Vue) to manage sales via a UI.
-   Ensure CORS is configured if the frontend is hosted on a different domain.

