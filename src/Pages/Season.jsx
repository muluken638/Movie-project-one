import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const Season = () => {
    const { seriesId } = useParams();
    const [seasons, setSeasons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSeasons = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/series/${seriesId}/seasons`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch seasons: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setSeasons(data);
            } catch (err) {
                setError(err.message);
                console.error("Fetch error: ", err); // Log detailed error to console
            } finally {
                setLoading(false);
            }
        };

        fetchSeasons();
    }, [seriesId]);

    if (loading) return <div>Loading seasons...</div>;
    if (error) return <div>Error: {error}</div>;

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

            <h3 className="text-2xl font-semibold mb-4">Seasons</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {seasons.map(season => (
                    <Link 
                        key={season.season_number}
                        to={`/userlayout/series/${seriesId}/seasons/${season.season_number}/episodes`}
                    >
                        <div className="border p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                            <h4 className="text-center mt-2">Season {season.season_number}</h4>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Season;
