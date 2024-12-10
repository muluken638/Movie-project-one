// src/Series.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Series = () => {
    const [series, setSeries] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/series');
                setSeries(response.data);

                // Extract unique genres from series data
                const genreList = ['All', ...new Set(response.data.map(s => s.genre))];
                setGenres(genreList);
                setLoading(false);
            } catch (err) {
                setError("Error fetching series data.");
                setLoading(false);
            }
        };

        fetchSeries();
    }, []);

    const filteredSeries = selectedGenre === 'All'
        ? series
        : series.filter(s => s.genre === selectedGenre);

    if (loading) return <p>Loading series...</p>;
    if (error) return <p>{error}</p>;

    return (
        <section className="my-8">
            <h3 className="text-2xl font-semibold mb-4">Series</h3>

            {/* Genre Filter */}
            <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
                {genres.map(genre => (
                    <button
                        key={genre}
                        onClick={() => setSelectedGenre(genre)}
                        className={`p-2 rounded ${selectedGenre === genre ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {genre}
                    </button>
                ))}
            </div>

            <div className="border-b-2 my-4"></div>

            {/* Series Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-3">
                {filteredSeries.map(series => (
                    <Link to={`/userlayout/series/${series.id}/seasons`} key={series.id}>
                        <div className="border p-2 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                            <img src={`http://localhost:5000/${series.cover_image}`} alt={series.title} className="w-full h-48 object-cover rounded-lg" />
                            <h4 className="text-center mt-2">{series.title}</h4>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Series;
