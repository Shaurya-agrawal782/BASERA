# 🏠 BASERA — The Art of Escape

> **"Har Safar Ka Ek Basera"** — A fullstack luxury vacation rental & architectural stay booking platform.

---

## 📁 Monorepo Structure

```
BASERA/
├── client/                     # Frontend Application (React 19 + Vite)
│   ├── public/                 # Static assets (Favicons, SVG sprite)
│   ├── src/
│   │   ├── api/                # Axios API client
│   │   ├── assets/             # Images & static media
│   │   ├── components/         # UI sections, modals & navigation
│   │   ├── constants/          # Category metadata & constants
│   │   ├── context/            # AuthContext & global state
│   │   ├── pages/              # Route pages (Home, Show, New, Edit, Auth)
│   │   └── styles/             # Design system & responsive styling
│   ├── index.html              # HTML entry point
│   ├── vite.config.js          # Vite configuration + API proxy
│   └── package.json            # Client dependencies
│
├── server/                     # Backend API (Express + MongoDB)
│   ├── controllers/            # Controller handlers (listings, reviews, users)
│   ├── models/                 # Mongoose schemas (Listing, Review, User)
│   ├── routes/                 # Express route definitions
│   ├── middleware.js           # Auth & validation middlewares
│   ├── cloudConfig.js          # Cloudinary storage setup
│   ├── Schema.js               # Joi validation schemas
│   ├── utils/                  # ExpressError & async wrappers
│   ├── init/                   # Database seed scripts
│   ├── app.js                  # Express application entry point
│   ├── .env                    # Environment variables (gitignored)
│   └── package.json            # Server dependencies
│
├── .gitignore                  # Monorepo gitignore rules
├── package.json                # Root orchestration scripts
└── README.md                   # Project documentation
```

---

## ✨ Features

- 🌟 **Modern Architecture & UI**: Built with React 19, Custom Glassmorphism Design Tokens, Framer Motion, and GSAP.
- 🗺️ **Interactive Maps**: Powered by Leaflet & OpenStreetMap geocoding.
- 🔐 **Authentication & Sessions**: Passport.js with MongoDB session store and protected routes.
- 📸 **Cloud Image Uploads**: Cloudinary storage integration for property listings.
- ⭐ **Reviews & Rating System**: Verified guest reviews with real-time score calculation.
- ⚡ **Dynamic Filter & Search**: Search by destination, category (Trending, Iconic Cities, Castles, Mountains, Pools, Camping, Arctic, Farms), and price.

---

## 🛠️ Tech Stack

### Client (`client/`)
- **React 19** + **Vite**
- **Framer Motion** & **GSAP**
- **Lucide Icons** & **Leaflet / React-Leaflet**
- **React Hot Toast** & **Axios**

### Server (`server/`)
- **Node.js** & **Express 5**
- **MongoDB** & **Mongoose 9**
- **Passport.js** (Local Authentication)
- **Cloudinary** (Multer Storage)
- **Connect-Mongo** (Session Persistence)

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Shaurya-agrawal782/BASERA.git
cd BASERA

# Install dependencies for both client and server
npm run install:all
```

### 2. Environment Variables
Create a `.env` file in the `server/` directory (or root):
```env
PORT=8080
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
```

### 3. Run Development Mode (Concurrent)
```bash
# Run both Server & Client concurrently with one command:
npm run dev
```

Or run them individually:
```bash
npm run server     # Starts backend on http://localhost:8080
npm run client     # Starts frontend on http://localhost:5173
```

### 4. Build & Production
```bash
npm run build      # Builds frontend to client/dist
npm start          # Runs production server (serves API + client static build)
```

---

## 📜 License
This project is licensed under the ISC License.
