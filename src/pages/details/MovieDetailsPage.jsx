import React, { useState, useEffect } from "react";
import { Link, useParams, NavLink, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import css from "./MovieDetailsPage.module.css";
import clsx from "classnames";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const MovieDetailsPage = ({ token }) => {
    const [movie, setMovie] = useState(null);
    const { movieId } = useParams();
    const defaultImg = "/icon_1.png";
    const location = useLocation();
    const getActiveLink = ({ isActive }) => clsx(css.link, { [css.active]: isActive });
     const backLinkHref = location.state?.from ?? "/";

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const url = `https://api.themoviedb.org/3/movie/${movieId}`;
                const options = {
                    params: { language: "en-US" },
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get(url, options);
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [movieId, token]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    const ratingPercentage = Math.round(movie.vote_average * 10);
    const ratingColor = ratingPercentage > 70 ? 'green' : ratingPercentage >= 50 ? 'yellow' : 'red';
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';

    return (
        <div>
            <div className={css.filmWrapper}>
                <div 
                    className={css.filmBackground} 
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w780/${movie.poster_path || 'default'})`,
                        backgroundPosition: 'right top',
                        backgroundRepeat: 'no-repeat'
                    }} 
                />
                <div className={css.filmContent}>
                    <Link to={backLinkHref}>
                    <button className={css.gobackbutton}>
                        Go Back
                        </button>
                    </Link>
                    <img 
                        className={css.filmimg} 
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w780/${movie.poster_path}` : defaultImg} 
                        alt={movie.title} 
                    />
                    <div className={css.filmtext}>
                        <h2 className={css.filmtitle}>
                            {movie.title} 
                            {releaseYear && ` (${releaseYear})`}
                        </h2>
                        <div className={css.ratingWrapper}>
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
                          <span className={css.ratingLabel}>User Score</span>
                        </div>
                        <p className={css.filmpar}>
                           <span className={css.boldText}>Description:</span>{" "}
                           {movie.overview 
                           ? <span>{movie.overview}</span> 
                           : "No description available"}
                        </p>
                        <p className={css.genres}>
                           <span className={css.boldText}>Genres:</span>{" "}
                           {movie.genres.length > 0 
                           ? <span>{movie.genres.map(genre => genre.name).join(', ')}</span> 
                           : "No genres available"}
                        </p>
                    </div>
                </div>
            </div>
            <div className={css.links}>
                <h3 className={css.htitle}>Additional information</h3>
                <NavLink className={getActiveLink} to={`/movies/${movieId}/cast`}>Movie Cast</NavLink>
                <NavLink className={getActiveLink} to={`/movies/${movieId}/reviews`}>Movie Reviews</NavLink>
                <Outlet />
            </div>
        </div>
    );
};

export default MovieDetailsPage;
