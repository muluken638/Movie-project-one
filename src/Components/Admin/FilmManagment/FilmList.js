import React, { useEffect, useState } from 'react';
import AddnewFilm from '../../../Buttons/AddnewFilm';

const FilmList = () => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newgenere, setNewgenere] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Fetch movies from the API when the component mounts
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('http://localhost:5000/api/movies');
      const data = await response.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setNewTitle(movie.title);
    setNewDescription(movie.description);
    setNewgenere(movie.genere);
    setNewImage(movie.image);
    setShowModal(true); // Show modal when edit button is clicked
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/movies/${id}`, {
      method: 'DELETE',
    });
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('description', newDescription);
    formData.append('genre', newgenere);
    if (newImage) {
      formData.append('cover_image', newImage); // Append the new image file
    }

    try {
      const response = await fetch(`http://localhost:5000/api/movies/${editingMovie.id}`, {
        method: 'PUT',
        body: formData,
      });

      const updatedMovie = await response.json();
      setMovies(movies.map(movie => (movie.id === editingMovie.id ? updatedMovie : movie)));
      setShowModal(false); // Close modal after saving
      setEditingMovie(null);
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file); // Set the new image file
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close modal when clicked outside or on cancel
    setEditingMovie(null);
  };

  return (
    <div className="w-full mt-10">
      <div className='flex justify-between items-center pb-2'>
        <h1 className="text-2xl font-bold mb-4">Movies List</h1>
        <AddnewFilm />
      </div>
      <table className="min-w-full bg-white border border-gray-300 overflow-auto">
        <thead>
          <tr>
            <th className="py-2 border">Title</th>
            <th className="py-2 border">Description</th>
            <th className="py-2 border">Genere</th>
            <th className="py-2 border">Image</th>
            <th className="py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.id}>
              <td className="border px-4 py-2">{movie.title}</td>
              <td className="border px-4 py-2">{movie.description}</td>
              <td className="border px-4 py-2">{movie.genre}</td>
              <td className="border px-4 py-2">
                <img src={`http://localhost:5000${movie.cover_image}`} alt={movie.title} className="w-16 h-16 object-cover" />
              </td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEdit(movie)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(movie.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing movie */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-bold mb-2">Edit Movie</h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border p-2 mb-2 w-full"
              placeholder="Title"
            />
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border p-2 mb-2 w-full"
              placeholder="Description"
            />
            <input
              type="text"
              value={newgenere}
              onChange={(e) => setNewgenere(e.target.value)}
              className="border p-2 mb-2 w-full"
              placeholder="Genere"
            />
            {/* File input for image */}
            <input
              type="file"
              onChange={handleImageChange}
              className="border p-2 mb-2 w-full"
              accept="image/*"
            />
            {/* Preview the selected image */}
            {newImage && (
              <div className="mb-2">
                <img src={URL.createObjectURL(newImage)} alt="Preview" className="w-32 h-32 object-cover" />
              </div>
            )}
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmList;
