import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const WatchEpisode = () => {
    const { seriesId, seasonNumber, episode_number } = useParams();
    const [episode, setEpisode] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!episode_number) {
            setError("Episode number is missing in the URL.");
            setLoading(false);
            return;
        }

        const fetchEpisode = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/series/${seriesId}/seasons/${seasonNumber}/episodes/${episode_number}`
                );
                setEpisode(response.data.episode);
            } catch (err) {
                setError("Error fetching episode data: " + (err.response?.data?.message || err.message));
            } finally {
                setLoading(false);
            }
        };

        fetchEpisode();
    }, [seriesId, seasonNumber, episode_number]);

    if (loading) return <p>Loading episode...</p>;
    if (error) return <p>{error}</p>;
    if (!episode) return <div>Episode not found</div>;

    return (
        <section className="my-8">
            <button
                onClick={() => navigate(-1)}
                className="text-blue-500 hover:text-blue-700 font-semibold mb-4 flex items-center"
                aria-label="Go back"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
            </button>

            <h3 className="text-2xl font-semibold mb-4">Watch Episode {episode.title}</h3>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex justify-center mb-4">
                    {episode.video_url.includes('youtube') ? (
                        <iframe
                            className="w-full h-60 md:h-72 lg:h-80"
                            src={episode.video_url}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <video 
                            className="w-full h-60 md:h-72 lg:h-80" 
                            controls
                            src={`http://localhost:5000/${episode.video_url.replace(/\\/g, '/')}`} 
                        ></video>
                    )}
                </div>

                <div className="flex flex-col justify-center mb-4">
                    <h4 className="text-lg font-semibold">Description</h4>
                    <p className="text-gray-700">{episode.description}</p>
                    <h4 className="text-md font-semibold mt-2">Cast</h4>
                    <p className="text-gray-600">{episode.cast?.join(', ') || 'No cast information available'}</p>
                </div>
            </div>
        </section>
    );
};

export default WatchEpisode;
