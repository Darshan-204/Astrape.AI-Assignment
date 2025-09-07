#
## Live Demo
Deployed at: [https://astrape-ai-assignment-1qwx.vercel.app/](https://astrape-ai-assignment-1qwx.vercel.app/)
# Astrape.AI E-commerce Assignment

## Overview
This is a full-stack e-commerce application built for the Astrape.AI assignment. It features a modular Express backend with MongoDB for user/cart data, and a scalable React + Vite frontend using TypeScript. Product data is served from mock files for simplicity.

## Features
- User authentication (JWT)
- Protected routes for cart and products
- Cart persistence per user (MongoDB)
- Product and search APIs using mock data
- Modern UI with React, TypeScript, and Tailwind CSS
- SPA routing and deployment-ready (Vercel config)

## Folder Structure

```
Backend/
  controllers/      # API logic (login, register, cart, search, etc.)
  model/            # Mongoose models (User, Cart)
  router/           # API route definitions
  middleware/       # Auth middleware
  .env              # Secrets and config
  index.js          # App entry point
  README.md         # Backend documentation

scale-craft-front/
  src/
    components/     # UI and layout components
    data/           # Mock product data
    hooks/          # Custom React hooks (cart, auth)
    lib/            # Utility functions
    pages/          # Route pages (Home, Products, Cart, etc.)
    types/          # TypeScript types
    assets/         # Images and static assets
    index.css       # Global styles
    App.tsx         # Main app component
    main.tsx        # Entry point
  public/           # Static files (favicon, robots.txt)
  package.json      # Frontend dependencies
  README.md         # Frontend documentation
  vercel.json       # SPA routing config
```

## Getting Started

### Backend
1. Install dependencies:
   ```bash
   cd Backend
   npm install
   ```
2. Set up `.env` with your secrets (see `Backend/README.md`).
3. Start the server:
   ```bash
   npm start
   ```

### Frontend
1. Install dependencies:
   ```bash
   cd scale-craft-front
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints
- `/api/register` - Register new user
- `/api/login` - Login and get JWT
- `/api/logout` - Logout user
- `/api/products` - Get product list
- `/api/search` - Search products
- `/api/cart` - Get user cart
- `/api/cart/add` - Add product to cart
- `/api/cart/remove` - Remove product from cart
- `/api/cart/update` - Update cart item quantity
- `/api/cart/clear` - Clear all items from cart

## Deployment
- SPA routing is configured for Vercel via `vercel.json`.
- Environment variables are required for secrets and CORS.

## License
MIT
