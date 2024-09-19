import React, { useEffect } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import css from "./MovieList.module.css";

const MovieList = ({ moviesList, token, isTrendingPage }) => {
    const fetchMovies = async () => {
        try {
            const url = "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";
            const options = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.get(url, options);
            console.log(response.data.results);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [token]);

    const getRatingColor = (rating) => {
        if (rating > 70) return 'green';
        if (rating >= 50) return 'yellow';
        return 'red';
    };

    return (
        <div>
            {isTrendingPage && <h1 className={css.trendingHeader}>Trending today</h1>}
            <ul className={css.movielist}>
                {moviesList.map(movie => {
                    const ratingPercentage = Math.round(movie.vote_average * 10);
                    const ratingColor = getRatingColor(ratingPercentage);
                    const defaultImage = '/icon_1.png';

                    return (
                        <li className={css.movielinks} key={movie.id}>
                            <a
                                href={`/movies/${movie.id}`}
                                className={css.link}
                            >
                                    <img
                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w780${movie.poster_path}` : defaultImage}
                                        alt={movie.title}
                                        className={css.poster}
                                        onError={(e) => { e.target.src = defaultImage; }}
                                    />
                            
                                <div className={css.movieinfo}>
                                    <h3 className={css.movietitle}>{movie.title}</h3>
                                    <p className={css.text}>Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
                                    <div className={css.ratingCircle}>
                                        <CircularProgressbar
                                            value={ratingPercentage}
                                            text={`${ratingPercentage}%`}
                                            styles={buildStyles({
                                                pathColor: ratingColor,
                                                textColor: '#fff',
                                                trailColor: '#d6d6d6',
                                                textSize: '24px'
                                            })}
                                        />
                                    </div>
                                </div>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MovieList;