import React, { useState, useEffect } from "react";
import axios from "axios";
import css from "./MovieReviews.module.css";

const MovieReviews = ({ movieId, token }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchMovieReviews = async () => {
            try {
                const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
                const options = {
                    params: { language: "en-US", page: "1" },
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get(url, options);
                setReviews(response.data.results);
            } catch (error) {
                console.error("Error fetching movie reviews:", error);
            }
        };

        fetchMovieReviews();
    }, [movieId, token]);

    if (reviews.length === 0) {
        return <p>No reviews available.</p>;
    }

    return (
        <div>
            <ul className={css.reviewslist}>
                {reviews.map(review => (
                    <li key={review.id}>
                        <p className={css.reviewsautor}>Author: {review.author}</p>
                        <p>Content: {review.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MovieReviews;

