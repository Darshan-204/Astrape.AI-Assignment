# EcommStore Backend

Node.js + Express API for EcommStore

## Features
- Modular folder structure
- User authentication (JWT)
- Cart persistence per user
- Product and search APIs (using mock data)
- MongoDB for user/cart data

## Folder Structure
```
Backend/
  controllers/      # API logic (login, register, cart, search, etc.)
  model/            # Mongoose models (User, Cart)
  router/           # API route definitions
  middleware/       # Auth middleware
  data/             # mockProducts.json (product data)
  index.js          # Main Express app
  .env              # Environment variables
  ...
```

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Set up `.env` with MongoDB URI and secret key.
3. Start the server:
   ```sh
   npm start
   ```

## API Endpoints
- `/api/register` - Register user
- `/api/login` - Login user
- `/api/logout` - Logout user
- `/api/products` - Get products (from mock data)
- `/api/search?q=...` - Search products
- `/api/cart` - Get user cart
- `/api/cart/add` - Add product to cart
- `/api/cart/remove` - Remove product from cart
- `/api/cart/update` - Update cart item quantity

## Customization
- Edit `data/mockProducts.json` to change product data
- Update controllers for custom logic

---

See frontend README for usage and integration details.
