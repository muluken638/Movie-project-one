import React, { useState } from 'react';
import axios from 'axios';

const FilmAdd = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [yearReleased, setYearReleased] = useState('');
    const [rating, setRating] = useState('');
    const [duration, setDuration] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [director, setDirector] = useState('');
    const [cast, setCast] = useState('');
    const [language, setLanguage] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('genre', genre);
        formData.append('year_released', yearReleased);
        formData.append('rating', rating);
        formData.append('duration', duration);
        formData.append('cover_image', coverImage);
        formData.append('video_url', videoFile);
        formData.append('director', director);
        formData.append('cast', cast);
        formData.append('language', language);
        formData.append('country', country);

        try {
            const response = await axios.post('http://localhost:5000/api/movies/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Movie added successfully:', response.data);
        } catch (err) {
            setError('Failed to add movie. Please try again.');
            console.error('Error:', err);
        }
    };

    return (
        <div className="relative mt-12 w-full max-w-lg sm:mt-10">
            <div className="mx-5 border border-b-white/20 shadow-lg rounded-lg bg-white/10">
                <div className="flex flex-col p-6">
                    <h3 className="text-xl font-semibold leading-6 tracking-tighter">Add Movie</h3>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
                <div className="p-6 pt-0">
                    <form onSubmit={handleSubmit}>
                        {/* Title input */}
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0"
                            />
                        </div>

                        {/* Description input */}
                        <div className='mt-4'>
                            <input
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0"
                            />
                        </div>

                        {/* Genre input */}
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Genre"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                required
                                className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0"
                            />
                        </div>

                        {/* Year Released input */}
                        <div className="mt-4">
                            <input
                                type="number"
                                placeholder="Year Released"
                                value={yearReleased}
                                onChange={(e) => setYearReleased(e.target.value)}
                                required
                                min="1900"
                                max={new Date().getFullYear()}
                                className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0"
                            />
                        </div>

                        {/* Rating input */}
                        <div className="mt-4">
                            <input
                                type="number"
                                placeholder="Rating (0.0-10.0)"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                required
                                min="0.0"
                                max="10.0"
                                step="0.1"
                                className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0"
                            />
                        </div>

                        {/* Duration input */}
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Duration (e.g. 120 min)"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                                className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0"
                            />
                        </div>

                        {/* Director input */}
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Director"
                                value={director}
                                onChange={(e) => setDirector(e.target.value)}
                                required
                                className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0"
                            />
                        </div>

                        {/* Cast input */}
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Cast"
                                value={cast}
                                onChange={(e) => setCast(e.target.value)}
                                required
                                className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0"
                            />
                        </div>

                        {/* Language input */}
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Language"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                required
                                className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0"
                            />
                        </div>

                        {/* Country input */}
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                                className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0"
                            />
                        </div>

                        {/* Cover Image upload */}
                        <div className="mt-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setCoverImage(e.target.files[0])}
                                required
                                className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0"
                            />
                        </div>

                        {/* Video File upload */}
                        <div className="mt-4">
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => setVideoFile(e.target.files[0])}
                                required
                                className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4 flex items-center justify-end gap-x-2">
                            <a className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2" href="/">Back to Movies</a>
                            <button className="font-semibold hover:bg-black hover:text-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2" type="submit">Add Movie</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FilmAdd;
