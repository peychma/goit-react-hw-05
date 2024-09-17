import React from 'react';
import { useEffect, useState } from 'react';
import MovieList from '../../components/list/MovieList';
import axios from 'axios';

const HomePage = ({ token }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const url = 'https://api.themoviedb.org/3/trending/movie/day';
                const options = {
                    method: 'GET',
                    params: { language: 'en-US' },
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.request(url, options);
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, [token]);

    return (
        <div>
            {movies && movies.length > 0 && <MovieList moviesList={movies} token={token} isTrendingPage={true}/>}
        </div>
    );
}

export default HomePage;