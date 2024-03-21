import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import SearchForm from '../../components/search/SearchForm';
import MovieList from '../../components/list/MovieList';

const MoviesPage = ({ token }) => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  const searchMovies = async searchTerm => {
    const url = `https://api.themoviedb.org/3/search/movie`;
    const options = {
      params: {
        include_adult: false,
        language: 'en-US',
        page: 1,
        query: searchTerm
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.get(url, options);
    return response.data.results;
  };

  const handleSearch = async searchTerm => {
    try {
      const searchedMovies = await searchMovies(searchTerm);
      setMovies(searchedMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      toast.error('Failed to fetch movies. Please try again later.');
    }
  };

  const updateQueryParams = searchTerm => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('query', searchTerm);
    window.history.replaceState(null, '', `?${searchParams.toString()}`);
  };

  return (
    <div>
        <SearchForm onSubmit={handleSearch} updateQueryParams={updateQueryParams} />
        <MovieList moviesList={movies}/>
    </div>
  );
}

export default MoviesPage; 
