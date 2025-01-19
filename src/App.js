import React, { useState, useCallback, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Recommendations from "./pages/Recommendations";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
`;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [theme, setTheme] = useState('dark');

  // Load watchlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWatchlist = localStorage.getItem('watchlist');
      if (savedWatchlist) {
        const parsedWatchlist = JSON.parse(savedWatchlist);
        if (Array.isArray(parsedWatchlist)) {
          setWatchlist(parsedWatchlist);
        }
      }
    } catch (error) {
      console.error('Error loading watchlist:', error);
      localStorage.removeItem('watchlist');
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    } catch (error) {
      console.error('Error saving watchlist:', error);
    }
  }, [watchlist]);

  const handleLogin = (userData) => {
    // Here you would typically validate the user data with your backend
    // For now, we'll just set isAuthenticated to true
    setIsAuthenticated(true);
    // You might also want to store some user data in localStorage
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  // Check authentication status on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const addToWatchlist = useCallback((movie) => {
    setWatchlist(prevWatchlist => {
      // Check if movie already exists in watchlist
      const movieExists = prevWatchlist.some(m => m.id === movie.id);
      if (!movieExists) {
        // Add the new movie to the watchlist
        const updatedWatchlist = [...prevWatchlist, { ...movie, rating: 0 }];
        return updatedWatchlist;
      }
      // Return unchanged if movie already exists
      return prevWatchlist;
    });
  }, []);

  const removeFromWatchlist = useCallback((movieId) => {
    setWatchlist(prevWatchlist => 
      prevWatchlist.filter(movie => movie.id !== movieId)
    );
  }, []);

  const updateRating = useCallback((movieId, rating) => {
    setWatchlist(prevWatchlist =>
      prevWatchlist.map(movie =>
        movie.id === movieId ? { ...movie, rating } : movie
      )
    );
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Memoize the Routes to avoid unnecessary re-renders
  const routes = useMemo(
    () => (
      <Routes>
        {/* Authentication Routes */}
        <Route
          path="/signin"
          element={
            !isAuthenticated ? (
              <SignIn onLogin={handleLogin} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route 
          path="/signup" 
          element={
            !isAuthenticated ? (
              <SignUp />
            ) : (
              <Navigate to="/" />
            )
          } 
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Main App Routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Recommendations
                onAddToWatchlist={addToWatchlist}
                onRemoveFromWatchlist={removeFromWatchlist}
              />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/search"
          element={
            isAuthenticated ? (
              <Search onAddToWatchlist={addToWatchlist} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/watchlist"
          element={
            isAuthenticated ? (
              <Watchlist
                watchlist={watchlist}
                onRemoveFromWatchlist={removeFromWatchlist}
                onUpdateRating={updateRating}
              />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    ),
    [addToWatchlist, removeFromWatchlist, updateRating, watchlist, isAuthenticated, handleLogin]
  );

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Router>
        <AppContainer>
          <Navbar
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            theme={theme}
            onThemeToggle={toggleTheme}
          />
          <MainContent>{routes}</MainContent>
          <Footer />
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App;
