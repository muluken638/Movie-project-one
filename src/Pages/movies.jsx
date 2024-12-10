import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaBookmark, FaHeart } from 'react-icons/fa';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [selectedgenre, setSelectedgenre] = useState('All');
    const [genres, setgenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likedMovies, setLikedMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/movies');
                setMovies(response.data);

                // Extract unique genres from the movies data
                const genreList = ['All', ...new Set(response.data.map(s => s.genre))];
                setgenres(genreList);

                setLoading(false);
            } catch (err) {
                setError("Error fetching movies data.");
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const filteredMovies = selectedgenre === 'All'
        ? movies
        : movies.filter(s => s.genre === selectedgenre);

    const handleLike = async (movieId) => {
        try {
            await axios.post('http://localhost:5000/api/liked', { movieId });
            setLikedMovies(prevLikedMovies =>
                prevLikedMovies.includes(movieId)
                    ? prevLikedMovies.filter(id => id !== movieId)
                    : [...prevLikedMovies, movieId]
            );
        } catch (err) {
            console.error('Failed to like movie:', err);
            alert('Error liking movie.');
        }
    };

    const handleSaveForLater = async (movieId) => {
        try {
            await axios.post('http://localhost:5000/api/watchlist', { movieId });
            setSavedMovies(prevSavedMovies =>
                prevSavedMovies.includes(movieId)
                    ? prevSavedMovies.filter(id => id !== movieId)
                    : [...prevSavedMovies, movieId]
            );
        } catch (err) {
            console.error('Failed to save movie:', err);
            alert('Error saving movie to watchlist.');
        }
    };

    if (loading) return <p>Loading movies...</p>;
    if (error) return <p>{error}</p>;

    return (
        <section className="my-8">
            <button
                onClick={() => navigate(-1)}
                className="text-blue-500 hover:text-blue-700 font-semibold mb-4 flex items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
            </button>

            <h3 className="text-2xl font-semibold mb-4">Movies</h3>

            <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
                {genres.map(genre => (
                    <button
                        key={genre}
                        onClick={() => setSelectedgenre(genre)}
                        className={`p-1 rounded ${selectedgenre === genre ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        <h1>{genre}</h1>
                    </button>
                ))}
            </div>

            <div className='border-b-2 my-4'></div>

            {/* Movies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-3">
                {filteredMovies.map(movie => {
                    // Fix image path by replacing backslashes with forward slashes
                    const imagePath = movie.cover_image.replace(/\\/g, '/');
                    return (
                        <div key={movie.id} className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg duration-200 h-64 transition-transform transform hover:scale-105">
                            <Link to={`${movie.id}/watchmovies`} className="block h-full">
                                {/* Display image with the correct path */}
                                <img
                                    src={`http://localhost:5000/${movie.cover_image.replace(/\\/g, '/')}`}
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-between p-4">
                                    <div>
                                        <h4 className="text-white text-lg font-semibold">{movie.title}</h4>
                                        <p className="text-gray-300 text-sm">{movie.genre}</p>
                                    </div>
                                    <div className="flex justify-end mt-2 gap-4">
                                        {/* Like Button */}
                                        <button
                                            onClick={(e) => { e.preventDefault(); handleLike(movie.id); }}
                                            className={`${likedMovies.includes(movie.id) ? 'text-red-500' : 'text-white'} hover:text-red-600`}
                                        >
                                            <FaHeart />
                                        </button>
                                        {/* Save for Later Button */}
                                        <button
                                            onClick={(e) => { e.preventDefault(); handleSaveForLater(movie.id); }}
                                            className={`${savedMovies.includes(movie.id) ? 'text-blue-500' : 'text-white'} hover:text-blue-600`}
                                        >
                                            <FaBookmark />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Movies;
