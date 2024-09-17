import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

const MovieCast = ({ token }) => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieCast = async () => {
            try {
                const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
                const options = {
                    params: { language: "en-US" },
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get(url, options);
                setCast(response.data.cast);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching movie cast:", error);
                setError("Error fetching movie cast. Please try again later.");
                setLoading(false);
            }
        };

        fetchMovieCast();
    }, [movieId, token]);

    const defaultImg = "/icon_2.png";

    if (loading) {
        return <p>Loading cast...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (cast.length === 0) {
        return <p>No cast available.</p>;
    }

    return (
        <div>
            <ul className={css.cast}>
                {cast.map(actor => (
                    <li className={css.card} key={actor.id}>
                        <div className={css.imagediv}>
                            <img 
                                src={actor.profile_path ? 
                                    `https://image.tmdb.org/t/p/w780/${actor.profile_path}` : 
                                    defaultImg
                                } 
                                width={250} 
                                alt={actor.name} 
                            />
                        </div>
                        <p className={css.actorName}>{actor.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MovieCast;
