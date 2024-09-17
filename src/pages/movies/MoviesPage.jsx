import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../../components/search/SearchForm";
import MovieList from "../../components/list/MovieList";
import { toast } from "react-hot-toast";

const MoviesPage = ({ token }) => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (!searchTerm) {
          setMovies([]);
          return;
        }

        const url = `https://api.themoviedb.org/3/search/movie`;
        const options = {
          params: {
            include_adult: false,
            language: "en-US",
            page: 1,
            query: searchTerm
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(url, options);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
        toast.error("Failed to fetch movies. Please try again later.");
      }
    };

    fetchMovies();
  }, [searchTerm, token]);

  const handleSearch = async searchTerm => {
    setSearchParams({ query: searchTerm });
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearch} />
      <MovieList moviesList={movies} isTrendingPage={false}/>
    </div>
  );
};

export default MoviesPage;


