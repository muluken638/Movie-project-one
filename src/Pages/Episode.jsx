import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Episode = () => {
    const { seriesId, seasonNumber } = useParams();
    const navigate = useNavigate();
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/series/${seriesId}/seasons/${seasonNumber}/episodes`);
                setEpisodes(response.data.episodes);  // No need for `title` as it’s not returned from the API
            } catch (err) {
                setError("Error fetching episodes data: " + (err.response?.data?.message || err.message));
            } finally {
                setLoading(false);
            }
        };

        fetchEpisodes();
    }, [seriesId, seasonNumber]);

    const handleWatch = (episode) => {
        navigate(`series/${seriesId}/seasons/${seasonNumber}/episode/${episode.episodeNumber}/watch`);
    };

    if (loading) return <p>Loading episodes...</p>;
    if (error) return <p>{error}</p>;

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

            <h3 className="text-2xl font-semibold mb-4">Season {seasonNumber} Episodes </h3>
            <div className="grid grid-cols-1 gap-4">
                {episodes.map(episode => (
                    <div key={episode.episodeNumber} className="border p-2 rounded-lg shadow-md flex justify-between items-center">
                        <div>
                            <h4>Episode {episode.episode_number}: {episode.title}</h4>
                            <p>{episode.description}</p>
                            <h2>{episode.duration} {"       "}{episode.release_date}</h2>
                        </div>
                        <div className="flex space-x-2">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" aria-label={`Download Episode ${episode.episodeNumber}`}>
                                Download
                            </button>
                            <button
                                onClick={() => handleWatch(episode)}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                aria-label={`Watch Episode ${episode.episode_number}`}
                            >
                                Watch
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Episode;
