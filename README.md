# 🏕️ Wanderlust — Airbnb-Inspired Full-Stack Web App

A production-grade Airbnb-inspired listing platform where users can discover, create, and review unique stays around the world.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=flat&logo=ejs&logoColor=black)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white)

---

## 📸 Preview

![Homepage Preview](./public/images/preview.png)

---

## ✨ Features

- 🔐 **User Authentication** — Secure signup, login & logout with Passport.js and session management
- 🛡️ **Role-Based Authorization** — Only listing owners can edit/delete their listings; only review authors can delete their reviews
- 🏠 **Listing CRUD** — Create, read, update, and delete property listings with full ownership enforcement
- ⭐ **Reviews System** — Nested reviews under listings with author-only deletion and cascade removal on listing delete
- 🖼️ **Image Uploads** — Upload and update listing images via Multer + Cloudinary
- 🗂️ **Category Filters** — Browse listings by categories like Trending, Mountains, Castles, Farms, and more
- 💰 **Tax Toggle** — Display prices with or without GST
- 🔍 **Destination Search** — Search listings by destination
- ⚠️ **Validation & Error Handling** — Joi-based request validation with centralized error handling and flash messaging
- 🔄 **Smart Redirects** — Preserves the intended route and redirects users after login

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Templating | EJS + ejs-mate |
| Authentication | Passport.js + passport-local-mongoose |
| Sessions | express-session |
| File Uploads | Multer + Cloudinary |
| Validation | Joi |
| Flash Messages | connect-flash |

---

## 🔒 Authorization Rules

| Action | Restriction |
|---|---|
| Create listing | Must be logged in |
| Edit / Delete listing | Listing owner only |
| Add review | Must be logged in |
| Delete review | Review author only |

---

## 📚 What I Learned

- Designing scalable Express apps using the **MVC pattern**
- Modeling relational data in MongoDB using **Mongoose references and populate()**
- Building secure auth flows with **Passport.js and session middleware**
- Enforcing **resource ownership** via custom middleware
- Integrating **external file storage** with Multer and Cloudinary
- Validating and sanitizing user input safely with **Joi**
- Delivering polished UX with **flash alerts, smart redirects, and EJS layouts**


---

> Built with ❤️ as a step toward production-ready full-stack development.
