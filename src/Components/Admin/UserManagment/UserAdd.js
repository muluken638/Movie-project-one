// src/Components/Register.js

import React, { useState } from 'react';
import axios from 'axios';

const Useradd = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {fullname, username, password });
            // Optionally, redirect to login or homepage after successful registration
            console.log('Registration successful:', response.data);
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error('Registration error:', err);
        }
    };

    return (
        <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
            <a href="#">
                <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
                    <div>
                        {/* Your logo or icon */}
                    </div>
                    MovieFlix
                </div>
            </a>
            <div className="relative mt-12 w-full max-w-lg sm:mt-10">
                <div className="mx-5 border border-b-white/20 shadow-lg rounded-lg bg-white/10">
                    <div className="flex flex-col p-6">
                        <h3 className="text-xl font-semibold leading-6 tracking-tighter">Register</h3>
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                    <div className="p-6 pt-0">
                        <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                                <input
                                    type="text"
                                    placeholder="Full Name"                                    
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    required
                                    className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0"
                                />
                            </div>
                            <div className='mt-4'> 
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0"
                                />
                            </div>
                            <div className="mt-4">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0"
                                />
                            </div>
                            <div className="mt-4 flex items-center justify-end gap-x-2">
                                <a className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2" href="/">Login</a>
                                <button className="font-semibold hover:bg-black hover:text-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2" type="submit">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Useradd;
