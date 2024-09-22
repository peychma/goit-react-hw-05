import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../../components/search/SearchForm";
import MovieList from "../../components/list/MovieList";
import { toast } from "react-hot-toast";
import css from "./MoviesPage.module.css";

const MoviesPage = ({ token }) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromParams = parseInt(searchParams.get("page"), 10) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromParams);
  const searchQuery = searchParams.get("query") || '';

  useEffect(() => {
    console.log("Searching for:", searchQuery, "on page:", currentPage);

    const fetchMovies = async () => {
      if (!searchQuery) {
        console.log("No search term provided, resetting movies.");
        setMovies([]);
        setTotalPages(1);
        setTotalResults(0);
        return;
      }

      const url = `https://api.themoviedb.org/3/search/movie`;
      const options = {
        params: {
          include_adult: false,
          language: "en-US",
          page: currentPage,
          query: searchQuery,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(url, options);
        console.log("Movies fetched:", response.data);

        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setTotalResults(response.data.total_results);

        if (response.data.total_results === 0) {
          toast.error("Nothing found.");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        toast.error("Failed to fetch movies. Please try again later.");
      }
    };

    fetchMovies();
  }, [searchQuery, token, currentPage]);

  useEffect(() => {
    if (totalResults > 0) {
      toast.success(`Found ${totalResults} movies.`);
    }
  }, [totalResults]);

  const handleSearch = (searchQuery) => {
    console.log("Search term before setting:", searchQuery);
    setSearchParams({ query: searchQuery || '', page: 1 });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    console.log("Changing to page:", page);
    setCurrentPage(page);
    setSearchParams({ query: searchQuery, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearch} />
      <MovieList moviesList={movies} isTrendingPage={false} />

      {movies.length > 0 && (
        <div className={css.navigation}>
          {currentPage > 1 && (
            <button
              className={css.link}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous Page
            </button>
          )}
          {currentPage < totalPages && (
            <button
              className={css.link}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next Page
            </button>
          )}
          <span className={css.pageInfo}>
            {currentPage} / {totalPages}
          </span>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
