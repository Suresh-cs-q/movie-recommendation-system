# Movie Recommendation System

A modern web application that provides personalized movie recommendations using machine learning algorithms. Built with React for the frontend and Flask for the backend.

## Features

- 🎬 Movie recommendations based on user preferences
- 🔍 Advanced search functionality with filters
- 📱 Responsive modern dark theme UI
- 👤 User authentication system
- 📋 Personal watchlist management
- ⭐ Movie rating system

## Tech Stack

### Frontend
- React.js
- Styled Components
- React Icons
- Modern Dark Theme UI

### Backend
- Python 3.11
- Flask
- Flask-CORS
- Pandas
- Scikit-learn
- NumPy

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- Python 3.11
- pip (Python package manager)
- Git

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   python3.11 -m pip install -r requirements.txt
   ```

3. Download the dataset:
   - Create a `dataset` directory in the backend folder
   - Place the `Cleaned_TMDB_movie_dataset_v11.csv` file in the `backend/dataset` directory

4. Start the Flask server:
   ```bash
   python3.11 train_and_api.py
   ```

   Note: On macOS, if port 5000 is in use by AirPlay Receiver:
   - Go to System Settings → General → AirDrop & Handoff
   - Disable AirPlay Receiver
   - Or modify the port in `train_and_api.py` to use a different port (e.g., 5001)

### Frontend Setup

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

The application should now be running at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

- `GET /random_recommendations` - Get random movie recommendations
- `GET /search` - Search movies with filters
  - Parameters: title, genre, release_year, rating
- `POST /recommendations` - Get personalized recommendations based on user preferences

## Project Structure

```
movie-recommendation-system/
├── backend/
│   ├── dataset/
│   ├── requirements.txt
│   └── train_and_api.py
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   └── styles/
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- TMDB for providing the movie dataset
- Suresh Kumar 
