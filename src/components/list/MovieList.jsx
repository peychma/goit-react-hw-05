import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import css from './MovieList.module.css';


const MovieList = ({ moviesList, token }) => {
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';
                const options = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get(url, options);
                console.log(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, [token]);

    return (
        <div>
            <ul className={css.movielist}>
                {moviesList.map(movie => (
                    <li className={css.movielinks} key={movie.id}>
                        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MovieList;
