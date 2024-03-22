import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useLocation, Outlet, NavLink } from "react-router-dom";
import axios from "axios";
import MovieCast from "../../components/cast/MovieCast";
import MovieReviews from "../../components/reviews/MovieReviews";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = ({ token }) => {
    const [movie, setMovie] = useState(null);
    const [showCast, setShowCast] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const { movieId } = useParams();
    const defaultImg = "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
    const location = useLocation();
    const backLink = location.state?.from ?? '/';
    const castRef = useRef();
    const reviewsRef = useRef();

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

    return (
        <div>
            <div className={css.film}>
                <Link className={css.gobackbutton} to={backLink}>Go Back</Link>
                <h2 className={css.filmtitle}>{movie.title}</h2>
                <div className={css.imgdiv}>
                    <img className={css.filmimg} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : defaultImg} alt={movie.title} />
                </div>
                <p className={css.filmpar}>{movie.overview}</p>
            </div>
            <div className={css.links}>
                <h3>Additional information</h3>
                <NavLink className={css.link} to="#" onClick={() => setShowCast(true)} ref={castRef}>Movie Cast</NavLink>
                {showCast && <MovieCast token={token} />}
                <NavLink className={css.link} to="#" onClick={() => setShowReviews(true)} ref={reviewsRef}>Movie Reviews</NavLink>
                {showReviews && <MovieReviews token={token} />}
                <Outlet />
            </div>
        </div>
    );
}

export default MovieDetailsPage;
