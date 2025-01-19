import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Watchlist.css"; // Import the CSS file
import { FaStar, FaTrash } from 'react-icons/fa';
import {
  PageContainer,
  GridContainer,
  MovieCard,
  SectionTitle,
  Badge,
  StyledButton
} from '../styles/PageStyles';
import styled from 'styled-components';

const EmptyWatchlist = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.large};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: ${({ theme }) => theme.spacing.xl};

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin: ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ theme }) => theme.colors.warning};
`;

const RatingStars = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin: ${({ theme }) => theme.spacing.md} 0;

  svg {
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 1.2rem;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const ActionButton = styled(StyledButton)`
  width: 100%;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${props => props.$isDelete ? 
    `linear-gradient(45deg, ${props.theme.colors.error}, #FF8B8B)` : 
    props.$isRate ? 
    `linear-gradient(45deg, ${props.theme.colors.warning}, #FFD93D)` :
    `linear-gradient(45deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})`
  };

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.$isDelete ? 
      '0 5px 15px rgba(255, 107, 107, 0.2)' : 
      props.$isRate ?
      '0 5px 15px rgba(255, 217, 61, 0.2)' :
      '0 5px 15px rgba(108, 99, 255, 0.2)'
    };
  }
`;

const GenresContainer = styled.div`
  margin: ${({ theme }) => theme.spacing.sm} 0;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const WatchlistHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  .stats {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.small.size};
    background: rgba(255, 255, 255, 0.05);
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    backdrop-filter: blur(10px);
  }
`;

const Watchlist = ({ watchlist, onRemoveFromWatchlist, onUpdateRating }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [movieToRemove, setMovieToRemove] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [filterGenre, setFilterGenre] = useState("");

  const confirmRemove = (movieId) => {
    setShowConfirmModal(true);
    setMovieToRemove(movieId);
  };

  const handleConfirmRemove = () => {
    setShowConfirmModal(false);
    setIsLoading(true);
    setTimeout(() => {
      onRemoveFromWatchlist(movieToRemove);
      setIsLoading(false);
    }, 500);
  };

  const handleCancelRemove = () => {
    setShowConfirmModal(false);
    setMovieToRemove(null);
  };

  const sortedAndFilteredMovies = watchlist
    .filter((movie) => (filterGenre ? movie.genres.includes(filterGenre) : true))
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const renderStars = (movieId, currentRating = 0) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        onClick={() => onUpdateRating(movieId, index + 1)}
        style={{
          color: index < currentRating ? '#FFD93D' : '#4A4A4A'
        }}
      />
    ));
  };

  if (!watchlist.length) {
    return (
      <PageContainer>
        <SectionTitle>My Watchlist</SectionTitle>
        <EmptyWatchlist>
          <h3>Your watchlist is empty</h3>
          <p>Start adding movies from recommendations or search to build your watchlist!</p>
        </EmptyWatchlist>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <WatchlistHeader>
        <SectionTitle>My Watchlist</SectionTitle>
        <div className="stats">
          {watchlist.length} movie{watchlist.length !== 1 ? 's' : ''} in your list
        </div>
      </WatchlistHeader>
      <GridContainer>
        {watchlist.map((movie) => (
          <MovieCard key={movie.id || movie.title}>
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
            <RatingStars>
              {renderStars(movie.id, movie.rating)}
            </RatingStars>
            <ActionButton 
              onClick={() => confirmRemove(movie.id)}
              $isDelete
            >
              <FaTrash /> Remove from Watchlist
            </ActionButton>
          </MovieCard>
        ))}
      </GridContainer>

      {showConfirmModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Removal</h2>
            <p>Are you sure you want to remove this movie from your watchlist?</p>
            <div className="modal-actions">
              <ActionButton onClick={handleConfirmRemove} $isDelete>
                Yes, Remove
              </ActionButton>
              <ActionButton onClick={handleCancelRemove}>
                Cancel
              </ActionButton>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default Watchlist;
