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

    const defaultImg = "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

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
                        {actor.name}
                        <div className={css.imagediv}>
                            <img 
                                src={actor.profile_path ? 
                                    `https://image.tmdb.org/t/p/w500/${actor.profile_path}` : 
                                    defaultImg
                                } 
                                width={250} 
                                alt={actor.name} 
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MovieCast;
