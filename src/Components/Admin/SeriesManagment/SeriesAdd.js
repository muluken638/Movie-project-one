import React, { useState } from 'react';
import axios from 'axios';

const SeriesAdd = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    language: '',
    genre: '',
    release_year: '',
    poster_url: '',
    rating: '',
    views: 0,
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
      const response = await axios.post('http://localhost:5000/api/series/add-series', formData);
      alert(response.data.message);  // show success message
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      alert('Error adding series!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-4">Add New Series</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
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
          <label htmlFor="language" className="block text-lg font-medium">Language</label>
          <input
            type="text"
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block text-lg font-medium">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
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
          <label htmlFor="poster_url" className="block text-lg font-medium">Poster URL</label>
          <input
            type="text"
            id="poster_url"
            name="poster_url"
            value={formData.poster_url}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-lg font-medium">Rating</label>
          <input
            type="text"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="views" className="block text-lg font-medium">Views</label>
          <input
            type="number"
            id="views"
            name="views"
            value={formData.views}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-center mt-6">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SeriesAdd;
