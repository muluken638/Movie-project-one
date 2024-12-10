import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilmEdit = ({ seriesId }) => {
  const [formData, setFormData] = useState({
    season_number: '',
    release_year: '',
    description: '',
    total_episodes: '',
  });

  const [seriesList, setSeriesList] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState(seriesId); // Default to selected series

  useEffect(() => {
    // Fetch series list from the database
    const fetchSeries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/series');
        setSeriesList(response.data);
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    fetchSeries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/series/add-season', {
        ...formData,
        series_id: selectedSeries, // Pass selected series ID
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error submitting season form:', error);
      alert('Error adding season!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4">Add Season for Series</h2>

      <form onSubmit={handleSubmit}>
        {/* Dropdown for selecting series */}
        <div className="mb-4">
          <label htmlFor="series_id" className="block text-lg font-medium">Select Series</label>
          <select
            id="series_id"
            name="series_id"
            value={selectedSeries}
            onChange={(e) => setSelectedSeries(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
            required
          >
            <option value="">Select a series</option>
            {seriesList.map((series) => (
              <option key={series.id} value={series.id}>
                {series.title}
              </option>
            ))}
          </select>
        </div>

        {/* Season Number */}
        <div className="mb-4">
          <label htmlFor="season_number" className="block text-lg font-medium">Season Number</label>
          <input
            type="number"
            id="season_number"
            name="season_number"
            value={formData.season_number}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        {/* Release Year */}
        <div className="mb-4">
          <label htmlFor="release_year" className="block text-lg font-medium">Release Year</label>
          <input
            type="number"
            id="release_year"
            name="release_year"
            value={formData.release_year}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium">Season Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        {/* Total Episodes */}
        <div className="mb-4">
          <label htmlFor="total_episodes" className="block text-lg font-medium">Total Episodes</label>
          <input
            type="number"
            id="total_episodes"
            name="total_episodes"
            value={formData.total_episodes}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Season
        </button>
      </form>
    </div>
  );
};

export default FilmEdit;
