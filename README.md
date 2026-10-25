# 🛒 Shopping-site — E-Commerce Web Application

<div align="center">

**A full-stack MERN e-commerce web application with user authentication, product browsing, cart, wishlist, and user profiles.**

<br />

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![React Icons](https://img.shields.io/badge/React_Icons-E91E63?logoColor=white)](https://react-icons.github.io/react-icons/)
[![Lucide](https://img.shields.io/badge/Lucide-F56565?logo=lucide&logoColor=white)](https://lucide.dev/)
[![React Hot Toast](https://img.shields.io/badge/React_Hot_Toast-FF6B6B?logoColor=white)](https://react-hot-toast.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![bcrypt](https://img.shields.io/badge/bcrypt-004880?logoColor=white)](https://github.com/kelektiv/node.bcrypt.js)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-22B573?logo=nodemailer&logoColor=white)](https://nodemailer.com/)
[![Multer](https://img.shields.io/badge/Multer-FF6C37?logoColor=white)](https://github.com/expressjs/multer)
[![express-validator](https://img.shields.io/badge/express--validator-000000?logoColor=white)](https://express-validator.github.io/)

Also used: body-parser, cookie-parser, cors, dotenv, randomstring, mongoose-unique-validator.

</div>

---

## Overview

![Shopping-site overview](assets/overview.png)

A React single-page app on a Node/Express API with MongoDB Atlas. The frontend talks to the API over REST routes. Authentication uses JWT sessions stored in httpOnly cookies, passwords are bcrypt-hashed, password reset works through an OTP sent by email, and profile photos are uploaded via multer to Cloudinary.

```text
React SPA (views · components · react-router)
        ↓
Axios → Express REST API
        ↓
Auth (JWT · bcrypt · OTP email reset) · Data (MongoDB Atlas · Cloudinary)
        ↓
Users, profiles, feedback
```

---

## ✨ Features

### User authentication

Registration and login issue a JWT into an httpOnly cookie. Passwords are stored bcrypt-hashed, and protected routes verify the token on each request.

```text
POST /signup { name, email, password }
  → bcrypt.hash(password, 10) → user saved
  → jwt.sign({ email, name }, secret, { expiresIn: '1h' })
  → httpOnly cookie set

POST /login { email, password }
  → bcrypt.compare(...) → cookie refreshed
```

The cookie is httpOnly, so it is not accessible from client-side JavaScript.

### OTP password reset

```text
POST /sendOTP { email }      → 6-digit OTP emailed via Nodemailer
POST /verifyOTP { vOTP }      → verified
PUT  /changePassword { ... } → new password bcrypt-hashed and saved
```

### Product catalog

Category pages listing products by category, with product detail views. Product images are hosted on Cloudinary.

### Dynamic product sorting

Any category page sorts by price or customer rating — toggleable, descending — with 6-per-page pagination.

### Cart and wishlist

Product, cart, and wishlist views for browsing and saving items.

### Profiles and feedback

Authenticated users have a profile with a photo upload, and can submit feedback. Users, profiles, and feedback are stored as Mongoose models on MongoDB Atlas.

---

## 🖼️ Screenshots

### 1. Home — product catalog

![Home](public/home.jpeg)

### 2. Category — sort by price and rating

![Category sorting](public/category.jpeg)

### 3. Product page

![Product page](public/product.jpeg)

---

## 🧠 Architecture

![Architecture](assets/architecture.png)

```text
                 ┌──────────────────┐
                 │ Client — React   │
                 │ SPA              │
                 │ views · compo-   │
                 │ nents · router   │
                 └────────┬─────────┘
                          │ axios, JWT cookie
                          ▼
                 ┌──────────────────┐
                 │   Express API    │
                 │ /signup · /login │
                 │ /sendOTP ·       │
                 │ /verifyOTP ·     │
                 │ /changePassword  │
                 └────────┬─────────┘
                          │
            ┌─────────────┼─────────────┐
            ▼             ▼             ▼
     ┌────────────┐ ┌──────────┐ ┌────────────┐
     │ Auth       │ │  Uploads │ │   Data     │
     │ JWT verify │ │ multer + │ │ Mongoose   │
     │ bcrypt     │ │ Cloudin- │ │ Atlas:     │
     │ OTP email  │ │ ary      │ │ user ·     │
     │ validation │ │ (profile │ │ profile ·  │
     │            │ │ photos)  │ │ feedback   │
     └────────────┘ └──────────┘ └────────────┘
```

**Request flow:** every protected route passes through `IsAuthorized` (JWT verify) before reaching a controller. Auth inputs are validated with express-validator. The OTP reset runs in three steps (`/sendOTP` → `/verifyOTP` → `/changePassword`). Profile photos go through multer (type and size filtered) to Cloudinary, and the URL is saved on the profile.

---

## 📁 Project Structure

```text
Shopping-site/
├── server/
│   ├── app.js                 # Express app, routes, MongoDB connect
│   ├── controllers/           # user-controller, changePassword (OTP), profilePage
│   ├── middlewares/           # isAuthorized (JWT), multer+Cloudinary, nodemailer
│   ├── models/                # user, profile, feedback
│   └── package.json
├── src/
│   ├── views/                 # home, category, product, cart, wishlist
│   ├── components/            # Auth (login/register/password), navbar, footer
│   ├── data.jsx               # static catalog (Cloudinary image URLs)
│   ├── App.js                 # routing
│   └── Base_url.js            # API base URL
├── public/
├── package.json
└── tailwind.config.js
```

---

## 🛠️ Run it

```bash
# frontend
npm install
npm start

# backend (new terminal)
cd server
npm install
# create server/.env with your own values (never commit it):
# MONGODB_URI, JWT secrets, email credentials, Cloudinary keys
node app.js
```

---

## 👤 Author

**Yash Raj Gupta**
B.Tech Mechanical Engineering (2024–2028), IIT (BHU) Varanasi

- GitHub: [@YashRajGupta-1](https://github.com/YashRajGupta-1)
