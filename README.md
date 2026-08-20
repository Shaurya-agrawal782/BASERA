# 🏠 BASERA — The Art of Escape

> **"Har Safar Ka Ek Basera"** — A fullstack luxury vacation rental & architectural stay booking platform.

---

## ✨ Features

- 🌟 **Modern Architecture & UI**: Built with React 19, Tailwind/Custom Design Tokens, Framer Motion, and GSAP.
- 🗺️ **Interactive Maps**: Powered by Leaflet & OpenStreetMap geocoding.
- 🔐 **Authentication & Sessions**: Passport.js with MongoDB session store and protected routes.
- 📸 **Cloud Image Uploads**: Seamless Cloudinary storage integration for property listings.
- ⭐ **Reviews & Rating System**: Verified guest reviews with real-time score calculation.
- ⚡ **Dynamic Filter & Search**: Search by destination, category (Trending, Iconic Cities, Castles, Mountains, Pools, Camping, Arctic, Farms), and price.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** + **Vite**
- **Framer Motion** & **GSAP**
- **Lucide Icons** & **Leaflet / React-Leaflet**
- **React Hot Toast** & **Axios**

### Backend
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

# Install Backend Dependencies
npm install

# Install Frontend Dependencies
cd frontend
npm install
cd ..
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
PORT=8080
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
```

### 3. Run Development Mode
```bash
# Start backend server
npm run server

# Start frontend (in another terminal)
npm run client
```

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📜 License
This project is licensed under the ISC License.
