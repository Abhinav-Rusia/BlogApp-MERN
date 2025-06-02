# Beyond Ink Blog - Full Stack Application

A modern, full-stack blog application built with React and Node.js.

## 🚀 Project Structure

```
├── Backend/          # Node.js/Express API server
├── Frontend/         # React application
├── README.md         # This file
└── .gitignore       # Git ignore rules
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Quill** - Rich text editor

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling

## 🚀 Deployment

### Backend (Vercel)
- **Live URL**: https://beyondbackend.vercel.app
- **Status**: ✅ Deployed

### Frontend (Netlify)
- **Status**: Ready for deployment
- **Build Command**: `npm run build`
- **Publish Directory**: `Frontend/dist`

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Git

### Backend Setup
```bash
cd Backend
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```

### Frontend Setup
```bash
cd Frontend
npm install
cp .env.example .env
# Configure your API URL
npm run dev
```

## 🔧 Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001/api
```

## 📱 Features

- ✅ User authentication (register/login)
- ✅ Create, edit, delete blog posts
- ✅ Rich text editor with image support
- ✅ Comment system
- ✅ Category filtering
- ✅ Search functionality
- ✅ Responsive design
- ✅ User dashboard
- ✅ Post view tracking

## 🚀 Deployment Instructions

### Backend (Already Deployed)
The backend is deployed on Vercel at: `https://beyondbackend.vercel.app`

### Frontend (Deploy to Netlify)
1. Push this repository to GitHub
2. Connect Netlify to your GitHub repository
3. Set build settings:
   - Base directory: `Frontend`
   - Build command: `npm run build`
   - Publish directory: `Frontend/dist`
4. Set environment variable:
   - `VITE_API_URL=https://beyondbackend.vercel.app/api`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with ❤️ by [Your Name]
