// src/Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [user, setUser] = useState({ username: '', password: '' });
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    // Fetch user data when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user'); // Your API to fetch user details
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user data', err);
            }
        };

        fetchUserData();
    }, []);

    // Handle file change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', user.username);
        formData.append('password', user.password);
        if (file) {
            formData.append('profileImage', file);
        }

        try {
            await axios.put('http://localhost:5000/api/user', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Profile updated successfully!');
        } catch (err) {
            console.error('Error updating profile', err);
            setMessage('Failed to update profile.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center   p-6">
            <div className="bg-gray-200 shadow-lg rounded-lg p-8 w-full max-w-md ">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Profile</h2>
                {message && <p className="text-green-600 text-center mb-4">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={user.username}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-500 p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-500 p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Profile Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                        {user.profileImage && (
                            <img
                                src={user.profileImage}
                                alt="Profile"
                                className="mt-2 w-24 h-24 object-cover rounded-full border border-gray-300"
                            />
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
