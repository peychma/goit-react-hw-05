/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../../components/search/SearchForm";
import MovieList from "../../components/list/MovieList";
import { toast } from "react-hot-toast";
import css from "./MoviesPage.module.css"

const MoviesPage = ({ token }) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (!searchTerm) {
          setMovies([]);
          setTotalPages(1);
          return;
        }

        const url = `https://api.themoviedb.org/3/search/movie`;
        const options = {
          params: {
            include_adult: false,
            language: "en-US",
            page: currentPage,
            query: searchTerm
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(url, options);
        const results = response.data.results.slice(0);
        setMovies(results);
        setTotalPages(response.data.total_pages);
        
        if (response.data.total_results === 0) {
          toast.error("Нічого не знайдено.");
        } else {
          toast.success(`Знайдено ${response.data.total_results} фільмів.`);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        toast.error("Failed to fetch movies. Please try again later.");
      }
    };

    fetchMovies();
  }, [searchTerm, token, currentPage]);

  const handleSearch = async searchTerm => {
    setSearchParams({ query: searchTerm });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearch} />
      <MovieList moviesList={movies} isTrendingPage={false} />

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
      </div>
    </div>
  );
};

export default MoviesPage;*/

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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (!searchTerm) {
          setMovies([]);
          setTotalPages(1);
          return;
        }

        const url = `https://api.themoviedb.org/3/search/movie`;
        const options = {
          params: {
            include_adult: false,
            language: "en-US",
            page: currentPage,
            query: searchTerm
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(url, options);
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        
        if (response.data.total_results === 0) {
          toast.error("Nothing found.");
        } else {
          toast.success(`Found ${response.data.total_results} movies.`);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        toast.error("Failed to fetch movies. Please try again later.");
      }
    };

    fetchMovies();
  }, [searchTerm, token, currentPage]);

  const handleSearch = async (searchTerm) => {
    setSearchParams({ query: searchTerm });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearch} />
      <MovieList moviesList={movies} isTrendingPage={false} />

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
    </div>
  );
};

export default MoviesPage;
