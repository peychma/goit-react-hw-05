import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useLocation, Outlet, NavLink } from "react-router-dom";
import axios from "axios";
import MovieCast from "../../components/cast/MovieCast";
import MovieReviews from "../../components/reviews/MovieReviews";
import css from "./MovieDetailsPage.module.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


//            <p className={css.director}>Director: <span>{movie.director || 'Unknown'}</span></p>
//            <p className={css.ageRestriction}>Age Restriction: <span>{movie.adult ? '18+' : '16+'}</span></p>
const MovieDetailsPage = ({ token }) => {
    const [movie, setMovie] = useState(null);
    const { movieId } = useParams();
    const defaultImg = "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
    const location = useLocation();
    const backLinkRef = useRef(location.state?.from || '/');

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

    return (
        <div>
        <div className={css.filmWrapper}>
            <div 
              className={css.filmBackground} 
              style={{
               backgroundImage: `url(https://image.tmdb.org/t/p/w780/${movie.poster_path})`,
               backgroundSize: '45% auto',
               backgroundPosition: 'right top',
               backgroundRepeat: 'no-repeat'
              }} />
    <div className={css.filmContent}>
        <Link className={css.gobackbutton} to={backLinkRef.current}>Go Back</Link>
        <img className={css.filmimg} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : defaultImg} alt={movie.title} />
        <div className={css.filmtext}>
            <h2 className={css.filmtitle}>{movie.title} ({new Date(movie.release_date).getFullYear()})</h2>
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
            <p className={css.filmpar}>{movie.overview}</p>
            <p className={css.genres}>Genres: <span>{movie.genres.map(genre => genre.name).join(', ')}</span></p>
        </div>
    </div>
</div>
            <div className={css.links}>
                <h3 className={css.htitle}>Additional information</h3>
                <NavLink className={css.link} to={`/movies/${movieId}/cast`}>Movie Cast</NavLink>
                <NavLink className={css.link} to={`/movies/${movieId}/reviews`}>Movie Reviews</NavLink>
                <Outlet />
            </div>
        </div>
    );
}

export default MovieDetailsPage;

