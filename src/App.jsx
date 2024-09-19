import React from "react";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navigation from "./components/navigation/Navigation";
import HomePage from "./pages/home/HomePage";
import MoviesPage from "./pages/movies/MoviesPage";
import NotFoundPage from "./pages/notfound/NotFoundPage";
import MovieDetailsPage from "./pages/details/MovieDetailsPage";

const MovieCast = React.lazy(() => import("./components/cast/MovieCast"));
const MovieReviews = React.lazy(() => import("./components/reviews/MovieReviews"));

function App() {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzE3NjhmNWYyZGNkNzYzMzQ1MjIyMzAyNWU3YzdkZiIsInN1YiI6IjY1ZmJmNTEzNjA2MjBhMDE3YzI2ZWNiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RnQvIY9S6kVDR0KpUOp9Uy3tay69hkb_uNvvL7TECiI";

    return (
        <div>
            <Navigation />
            <main>
                <Toaster />
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<HomePage token={token} />} />
                        <Route path="/movies" element={<MoviesPage token={token} />} />
                        <Route path="/movies/:movieId" element={<MovieDetailsPage token={token} />} >
                            <Route path="cast" element={<MovieCast token={token} />} />
                            <Route path="reviews" element={<MovieReviews token={token} />} />
                        </Route>
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Suspense>
            </main>
        </div>
    );
}

export default App;



