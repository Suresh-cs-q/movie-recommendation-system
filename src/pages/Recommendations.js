import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaPlus } from 'react-icons/fa';
import {
  PageContainer,
  GridContainer,
  MovieCard,
  SectionTitle,
  Badge,
  StyledButton
} from '../styles/PageStyles';
import styled from 'styled-components';

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin: ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ theme }) => theme.colors.warning};
`;

const GenresContainer = styled.div`
  margin: ${({ theme }) => theme.spacing.sm} 0;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ActionButton = styled(StyledButton)`
  width: 100%;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.error};
`;

const Recommendations = ({ onAddToWatchlist }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const inappropriateWords = [
    "sex", "sexual", "kiss", "blow job", "nude", "adult", "love",
    "explicit", "porn", "erotic", "Screwed", "sexy", "The Fucking Video-Wedding-Institute","Sexy Sisters", "Dirty Sexy Saint","Yoon-Yool And Russian Sexy Woman", "#DoYouThinkIAmSexy?","24 Year Old Yoon Yul's Sexy Breasts",
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get('http://localhost:5000/random_recommendations');
        const filteredMovies = response.data.filter((movie) => {
          const containsInappropriateWord = inappropriateWords.some((word) =>
            movie.title.toLowerCase().includes(word)
          );
          return (
            !movie.genres.toLowerCase().includes("romance") &&
            !containsInappropriateWord
          );
        });
        setMovies(filteredMovies);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Failed to fetch movie recommendations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>Loading recommendations...</LoadingContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorContainer>{error}</ErrorContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionTitle>Recommended Movies</SectionTitle>
      <GridContainer>
        {movies.map((movie) => (
          <MovieCard key={movie.title}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                onError={(e) => {
                  e.target.src = '/placeholder.jpg';
                }}
              />
            )}
            <h3>{movie.title}</h3>
            <RatingContainer>
              <FaStar /> {movie.vote_average?.toFixed(1) || 'N/A'}
            </RatingContainer>
            <GenresContainer>
              {movie.genres?.split(',').map((genre) => (
                <Badge key={genre}>{genre.trim()}</Badge>
              ))}
            </GenresContainer>
            <ActionButton onClick={() => onAddToWatchlist(movie)}>
              <FaPlus /> Add to Watchlist
            </ActionButton>
          </MovieCard>
        ))}
      </GridContainer>
    </PageContainer>
  );
};

export default Recommendations;
