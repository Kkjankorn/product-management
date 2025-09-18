# Backend - Product Management (Express + MongoDB)

## Setup
1. Copy `.env.example` to `.env` and set `MONGODB_URI`.
2. Install:
   ```
   npm install
   ```
3. Run:
   ```
   npm run dev
   ```

API base: `http://localhost:5000/api`

Endpoints:
- GET /api/products?page=1&limit=10&search=term
- GET /api/product/:id
- POST /api/product
- PUT /api/product/:id
- DELETE /api/product/:id?soft=true

- GET /api/categories?page=1&limit=10&search=term
- GET /api/category/:id
- POST /api/category
- PUT /api/category/:id
- DELETE /api/category/:id?soft=true
