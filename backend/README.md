# Smart Canteen Management System - Backend

Backend REST API powered by **Node.js, Express, and Neon Serverless PostgreSQL**.

---

## 📁 Folder Structure

```text
backend/
├── .env
├── package.json
├── server.js
├── db.js
├── controllers/
│   ├── menuController.js
│   ├── orderController.js
│   └── transactionController.js
├── routes/
│   ├── menuRoutes.js
│   ├── orderRoutes.js
│   └── transactionRoutes.js
└── middleware/
    └── errorMiddleware.js
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Neon PostgreSQL in `.env`
Open `.env` and paste your Neon connection string:
```env
PORT=5000
DATABASE_URL="postgresql://user:password@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

### 3. Start Development Server
```bash
npm run dev
```
The server will run on `http://localhost:5000`.

---

## 📡 API Endpoints Summary

### Dashboard (`/api/dash`)
- `GET /api/dash/stats`: Returns dashboard statistics and recent meal activity.

### Menu (`/api/menu`)
- `GET /api/menu?date=YYYY-MM-DD`: Returns breakfast, lunch, snacks, and dinner items.
- `POST /api/menu`: Adds a new food item.
- `PATCH /api/menu/:id/toggle`: Toggles availability on/off.
- `DELETE /api/menu/:id`: Deletes a food item.

### Orders (`/api/orders`)
- `GET /api/orders`: Returns orders.
- `POST /api/orders`: Creates an order.

### Transactions (`/api/transactions`)
- `GET /api/transactions`: Returns transactions.
- `POST /api/transactions`: Creates a transaction.
