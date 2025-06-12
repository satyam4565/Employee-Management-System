import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        handleLogin(email, password);
        setEmail('');
        setPassword('');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-teal-400 via-emerald-500 to-blue-500 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
                <h2 className="text-3xl font-extrabold text-center text-emerald-600 mb-6">Welcome Back 👋</h2>
                <form onSubmit={submitHandler} className="space-y-5">
                    <div>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            placeholder="Email address"
                            className="w-full px-5 py-3 text-black rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 placeholder-gray-500 transition duration-200"
                        />
                    </div>
                    <div>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            placeholder="Password"
                            className="w-full px-5 py-3 text-black rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 placeholder-gray-500 transition duration-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-xl shadow-lg transition duration-300"
                    >
                        Log In
                    </button>
                </form>
                <p className="text-sm text-center text-gray-500 mt-6">
                    Don't have an account? <a href="#" className="text-emerald-600 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
