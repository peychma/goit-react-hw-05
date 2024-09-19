import React from "react";
import { Link, useLocation} from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import css from "./MovieList.module.css";

const MovieList = ({ moviesList, token, isTrendingPage }) => {

    const location = useLocation();
    const getRatingColor = (rating) => {
        if (rating > 70) return 'green';
        if (rating >= 50) return 'yellow';
        return 'red';
    };

    const formatDate = (dateString) => {
        if (!dateString) {
            return "Unknown";
        }

        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
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
                            <Link 
                                to={`/movies/${movie.id}`} 
                                state={{ from: location.pathname }} // Передаємо поточний шлях
                            >
                                <img
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w780${movie.poster_path}` : defaultImage}
                                    alt={movie.title}
                                    className={css.poster}
                                    onError={(e) => { e.target.src = defaultImage; }}
                                />
                                <div className={css.movieinfo}>
                                    <h3 className={css.movietitle}>{movie.title}</h3>
                                    <p className={css.text}>Release Date: {formatDate(movie.release_date)}</p>
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
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MovieList;