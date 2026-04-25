# Music Player Application

A professional backend service for a music player application, built with Node.js, Express, and MongoDB.

## 📁 Project Structure

The project is organized into a clean directory structure:

- **`backend/`**: The core backend application.
  - **`src/`**: Source code files.
    - **`controllers/`**: Logical handlers for API routes.
    - **`models/`**: Mongoose schemas for data modeling (Users, Music, Albums).
    - **`routes/`**: API endpoint definitions.
    - **`middlewares/`**: Security and utility middlewares (Authentication, etc.).
    - **`services/`**: External service integrations (e.g., ImageKit).
    - **`db/`**: Database connection configuration.
  - **`server.js`**: Application entry point.
  - **`.env`**: Environment configuration (ignored by Git).
  - **`package.json`**: Project dependencies and scripts.

## 🚀 Features

- **User Authentication**: Secure registration and login using JWT.
- **Music Management**: Streamlined API for managing music tracks and albums.
- **Artist Roles**: Specific permissions for artists to upload music.
- **Media Hosting**: Integrated with ImageKit for high-performance media storage.
- **Scalable Architecture**: Modular design for easy maintenance and scaling.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- [ImageKit](https://imagekit.io/) account

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd "music player"
   ```

2. **Navigate to the backend**:
   ```bash
   cd backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Environment Setup**:
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   IMAGEKIT_PUBLIC_KEY=your_public_key
   IMAGEKIT_PRIVATE_KEY=your_private_key
   IMAGEKIT_URL_ENDPOINT=your_url_endpoint
   ```

5. **Run the application**:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 🛣️ API Reference

### Auth
- `POST /api/auth/register` - Create a new account
- `POST /api/auth/login` - Authenticate user

### Music
- `GET /api/music` - Get all available music
- `POST /api/music/upload` - Upload music (Artist only)
- `GET /api/music/album` - Get all albums
- `GET /api/music/album/:id` - Get album details

---
Developed with ❤️ by saipraneeth
