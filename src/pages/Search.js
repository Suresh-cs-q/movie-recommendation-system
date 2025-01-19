import React, { useState } from "react";
import axios from "axios";
import { FaSearch, FaStar, FaPlus } from 'react-icons/fa';
import {
  PageContainer,
  GridContainer,
  MovieCard,
  SectionTitle,
  SearchBar,
  Badge,
  StyledButton
} from '../styles/PageStyles';
import styled from 'styled-components';

const SearchFilters = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  option {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

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

const NoResults = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Search = ({ onAddToWatchlist }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm && !genre && !year && !rating) return;

    setSearching(true);
    try {
      const response = await axios.get('http://localhost:5000/search', {
        params: {
          title: searchTerm,
          genre,
          release_year: year,
          rating
        }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
    }
    setSearching(false);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <PageContainer>
      <SectionTitle>Search Movies</SectionTitle>
      
      <form onSubmit={handleSearch}>
        <SearchBar>
          <FaSearch />
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>

        <SearchFilters>
          <FilterSelect value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">All Genres</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="animation">Animation</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="fantasy">Fantasy</option>
            <option value="horror">Horror</option>
            <option value="sci-fi">Science Fiction</option>
            <option value="thriller">Thriller</option>
          </FilterSelect>

          <FilterSelect value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </FilterSelect>

          <FilterSelect value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="">Any Rating</option>
            <option value="9">9+ Rating</option>
            <option value="8">8+ Rating</option>
            <option value="7">7+ Rating</option>
            <option value="6">6+ Rating</option>
          </FilterSelect>
        </SearchFilters>

        <StyledButton type="submit" disabled={searching}>
          {searching ? 'Searching...' : 'Search'}
        </StyledButton>
      </form>

      {results.length > 0 ? (
        <GridContainer>
          {results.map((movie) => (
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
      ) : (
        <NoResults>
          {searching ? 'Searching...' : 'No movies found. Try adjusting your search criteria.'}
        </NoResults>
      )}
    </PageContainer>
  );
};

export default Search;
