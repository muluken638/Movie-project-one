import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const WatchMovies = () => {
    const { moviesId } = useParams(); // Getting movie ID from URL params
    const [movies, setMovies] = useState([]); // State for storing movie data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate(); // To navigate back to previous page

    // Fetching movie data when the component mounts or movieId changes
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/movies/${moviesId}`);
                setMovies(response.data); // Set fetched data into state
                setLoading(false); // Set loading to false after data is fetched
            } catch (err) {
                setError("Error fetching movies data.");
                setLoading(false); // Set loading to false if error occurs
            }
        };

        fetchMovies();
    }, [moviesId]);

    // Handle loading, error, or missing movie states
    if (loading) return <p>Loading movie...</p>;
    if (error) return <p>{error}</p>;
    if (!movies) return <div>Movie not found</div>;

    return (
        <section className="my-8">
            {/* Back Arrow Button */}
            <button
                onClick={() => navigate(-1)} // Navigate to the previous page
                className="text-blue-500 hover:text-blue-700 font-semibold mb-4 flex items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
            </button>

            <h3 className="text-2xl font-semibold mb-4">Watch {movies.title}</h3>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex justify-center mb-4">
                    {/* If video is from YouTube */}
                    {movies.video_url.includes('youtube') ? (
                        <iframe
                            className="w-full h-60 md:h-72 lg:h-80" // Responsive height
                            src={movies.video_url} // The YouTube embed URL
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        // If video is a local file
                        <video 
                            className="w-full h-60 md:h-72 lg:h-80" 
                            controls
                            src={`http://localhost:5000/${movies.video_url.replace(/\\/g, '/')}`} 
                            ></video>
                    )}
                </div>

                {/* Display the movie description and other details */}
                <div className="flex flex-col justify-center mb-4">
                    <h4 className="text-lg font-semibold">Description</h4>
                    <p className="text-gray-700">{movies.description}</p> {/* Ensure description is available */}
                    <h4 className="text-md font-semibold mt-2">Cast</h4>
                    <p className="text-gray-600">{movies.cast}</p> {/* Ensure cast is available */}
                </div>
            </div>
        </section>
    );
};

export default WatchMovies;
