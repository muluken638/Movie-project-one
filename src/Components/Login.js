import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            login(response.data.token); // Call login method with the token
            if (username=='admin')
            {
                navigate('/admin/dashboard')
            }else
            navigate('/userlayout/homepage'); // Navigate to the homepage after login
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
            <a href="#">
                <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                        </svg>
                    </div>
                    MovieFlix
                </div>
            </a>
            <div className="relative mt-12 w-full max-w-lg sm:mt-10">
                <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
                <div className="mx-5 border border-b-white/20 shadow-lg rounded-lg bg-white/10">
                    <div className="flex flex-col p-6">
                        <h3 className="text-xl font-semibold leading-6 tracking-tighter">Login</h3>
                        <p className="mt-1.5 text-sm font-medium text-white/50">
                            Welcome back, enter your credentials to continue.
                        </p>
                    </div>
                    <div className="p-6 pt-0">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                    <div className="flex justify-between">
                                        <label className="text-xs font-medium text-gray-400 group-focus-within:text-white">Username</label>
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        autoComplete="off"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                    <div className="flex justify-between">
                                        <label className="text-xs font-medium text-gray-400 group-focus-within:text-white">Password</label>
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="remember" className="outline-none focus:outline focus:outline-sky-300" />
                                    <span className="text-xs">Remember me</span>
                                </label>
                                <a className="text-sm font-medium text-foreground underline" href="/forgot-password">Forgot password?</a>
                            </div>
                            <div className="mt-4 flex items-center justify-end gap-x-2">
                                <a className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2" href="/register">Register</a>
                                <button id='login' className="font-semibold hover:bg-black hover:text-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2" type="submit">Log in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Login;
