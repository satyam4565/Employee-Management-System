import React, { useState } from 'react';
import './Login.css';

const Login = ({ handleLogin, handleShowSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        handleLogin(email, password);
        setEmail('');
        setPassword('');
    };

    return (
        <div className="login-bg">
            <div className="login-glass-card" role="main" aria-label="Login form">
                <div className="login-logo">
                    <img src="./Logo.png" alt="Emplytic Logo" />
                </div>
                <h4 className="form-title">Emplytic</h4>
                <form onSubmit={submitHandler} className="form" autoComplete="on">
                    <div className="floating-label-group">
                        <input
                            id="login-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            placeholder=" "
                            className="luxur-input"
                            autoComplete="username"
                        />
                        <label htmlFor="login-email" className="floating-label">Email address</label>
                    </div>
                    <div className="floating-label-group">
                        <input
                            id="login-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type={showPassword ? "text" : "password"}
                            placeholder=" "
                            className="luxur-input"
                            autoComplete="current-password"
                        />
                        <label htmlFor="login-password" className="floating-label">Password</label>
                        <button type="button" className="show-password-btn" aria-label="Show password" onClick={() => setShowPassword((v) => !v)}>{showPassword ? '🙈' : '👁️'}</button>
                    </div>
                    <button type="submit" className="luxur-btn">
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