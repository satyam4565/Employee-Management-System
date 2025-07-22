import React, { useState } from 'react';
import './SignUp.css';

const SignUp = ({ handleSignUp, handleBackToLogin }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
            newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
        }
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleSignUp(formData);
        }
    };

    return (
        <div className="signup-bg">
            <div className="signup-glass-card" role="main" aria-label="Sign up form">
                <div className="signup-logo">
                    <img src="./Logo.png" alt="Emplytic Logo" />
                </div>
                <h2 className="form-title">Emplytic</h2>
                <p className="form-subtitle">Create your account</p>
                <form onSubmit={submitHandler} className="form" autoComplete="on">
                    <div className="floating-label-group">
                        <input
                            id="signup-fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            type="text"
                            placeholder=" "
                            className={`form-input luxur-input ${errors.fullName ? 'error' : ''}`}
                            autoComplete="name"
                        />
                        <label htmlFor="signup-fullName" className="floating-label">Full Name</label>
                        {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                    </div>
                    <div className="floating-label-group">
                        <input
                            id="signup-email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            type="email"
                            placeholder=" "
                            className={`form-input luxur-input ${errors.email ? 'error' : ''}`}
                            autoComplete="email"
                        />
                        <label htmlFor="signup-email" className="floating-label">Email Address</label>
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="floating-label-group">
                        <input
                            id="signup-phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                            type="tel"
                            placeholder=" "
                            className={`form-input luxur-input ${errors.phoneNumber ? 'error' : ''}`}
                            autoComplete="tel"
                        />
                        <label htmlFor="signup-phoneNumber" className="floating-label">Phone Number</label>
                        {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                    </div>
                    <div className="floating-label-group">
                        <input
                            id="signup-username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            type="text"
                            placeholder=" "
                            className={`form-input luxur-input ${errors.username ? 'error' : ''}`}
                            autoComplete="username"
                        />
                        <label htmlFor="signup-username" className="floating-label">Username</label>
                        {errors.username && <span className="error-message">{errors.username}</span>}
                    </div>
                    <div className="floating-label-group">
                        <input
                            id="signup-password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            type={showPassword ? "text" : "password"}
                            placeholder=" "
                            className={`form-input luxur-input ${errors.password ? 'error' : ''}`}
                            autoComplete="new-password"
                        />
                        <label htmlFor="signup-password" className="floating-label">Password</label>
                        <button type="button" className="show-password-btn" aria-label="Show password" onClick={() => setShowPassword((v) => !v)}>{showPassword ? '🙈' : '👁️'}</button>
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    <div className="floating-label-group">
                        <input
                            id="signup-confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder=" "
                            className={`form-input luxur-input ${errors.confirmPassword ? 'error' : ''}`}
                            autoComplete="new-password"
                        />
                        <label htmlFor="signup-confirmPassword" className="floating-label">Confirm Password</label>
                        <button type="button" className="show-password-btn" aria-label="Show password" onClick={() => setShowConfirmPassword((v) => !v)}>{showConfirmPassword ? '🙈' : '👁️'}</button>
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>
                    <button type="submit" className="form-button luxur-btn">
                        Sign Up
                    </button>
                </form>
                <p className="form-footer">
                    Already have an account? <a href="#" className="form-link" onClick={handleBackToLogin}>Log in</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp; 