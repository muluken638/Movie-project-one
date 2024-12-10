import React, { useState } from 'react';
import axios from 'axios';

const SeasonsAdd = ({ seriesId }) => {
  const [formData, setFormData] = useState({
    season_number: '',
    release_year: '',
    description: '',
    total_episodes: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/series/add-season', {
        ...formData,
        series_id: seriesId,  // Pass series ID
      });
      alert(response.data.message);
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      alert('Error adding season!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-4">Add New Season</h1>
      <form onSubmit={handleSubmit}>
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
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
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
        <div className="flex justify-center mt-6">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SeasonsAdd;
