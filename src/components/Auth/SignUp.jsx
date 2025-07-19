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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
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
        <div className="signup-container">
            {/* Wave Animation */}
            <ul class="background">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            
            {/* Sign Up Form */}
            <div className="form-container">
                <h2 className="form-title">Emplytic</h2>
                <p className="form-subtitle">Create your account</p>
                <form onSubmit={submitHandler} className="form">
                    <div>
                        <input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            type="text"
                            placeholder="Full Name"
                            className={`form-input ${errors.fullName ? 'error' : ''}`}
                        />
                        {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                    </div>
                    <div>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            type="email"
                            placeholder="Email Address"
                            className={`form-input ${errors.email ? 'error' : ''}`}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div>
                        <input
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                            type="tel"
                            placeholder="Phone Number"
                            className={`form-input ${errors.phoneNumber ? 'error' : ''}`}
                        />
                        {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                    </div>
                    <div>
                        <input
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            type="text"
                            placeholder="Username"
                            className={`form-input ${errors.username ? 'error' : ''}`}
                        />
                        {errors.username && <span className="error-message">{errors.username}</span>}
                    </div>
                    <div>
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            type="password"
                            placeholder="Password"
                            className={`form-input ${errors.password ? 'error' : ''}`}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    <div>
                        <input
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            type="password"
                            placeholder="Confirm Password"
                            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                        />
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>
                    <button type="submit" className="form-button">
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