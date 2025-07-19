import React, { useState } from 'react';
import './Login.css'; 

const Login = ({ handleLogin, handleShowSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        handleLogin(email, password);
        setEmail('');
        setPassword('');
    };

    return (
        <div className="login-container">
            {/* Wave Animation */}
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>

            {/* Login Form */}
            <div className="form-container">
                <h2 className="form-title">Emplytic</h2>
                <form onSubmit={submitHandler} className="form">
                    <div>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            placeholder="Email address"
                            className="form-input"
                        />
                    </div>
                    <div>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            placeholder="Password"
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="form-button">
                        Log In
                    </button>
                </form>
                <p className="form-footer">
                    Don't have an account? <a href="#" className="form-link" onClick={handleShowSignUp}>Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;