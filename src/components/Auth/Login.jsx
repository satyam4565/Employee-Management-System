import React, { useContext, useEffect, useState } from 'react';
import './Login.css';
import { ToastContext } from '../../context/ToastProvider';
import { getLocalStorage } from '../../utils/localStorage';

const Login = ({ handleLogin, handleShowSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [credentialsList, setCredentialsList] = useState({ admin: [], employees: [] });
    const toast = useContext(ToastContext);

    useEffect(() => {
        if (showInfo) {
            try {
                const { admin, employees } = getLocalStorage();
                setCredentialsList({
                    admin: admin || [],
                    employees: (employees || []).map(e => ({ email: e.email, password: e.password, name: e.firstName }))
                })
            } catch (e) {
                setCredentialsList({ admin: [], employees: [] })
            }
        }
    }, [showInfo]);

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
                <button onClick={() => setShowInfo(true)} className="mt-3 text-sm text-gray-700 underline">Available login credentials</button>
                {showInfo && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-[#6b00e6] rounded-xl shadow-2xl p-5 w-[90vw] max-w-md">
                            <h3 className="text-lg font-semibold mb-3">Available login credentials</h3>
                            <div className="mb-2">
                                <h4 className="font-medium">Admin</h4>
                                {credentialsList.admin.length ? credentialsList.admin.map((a, i) => (
                                    <div key={i} className="text-sm">{a.email} / {a.password}</div>
                                )) : <div className="text-sm text-gray-500">None</div>}
                            </div>
                            <div className="mb-2 max-h-40 overflow-auto border rounded p-2">
                                <h4 className="font-medium">Employees</h4>
                                {credentialsList.employees.length ? credentialsList.employees.map((e, i) => (
                                    <div key={i} className="text-sm">{e.email} / {e.password} ({e.name})</div>
                                )) : <div className="text-sm text-gray-500">None</div>}
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button onClick={() => setShowInfo(false)} className="px-3 py-1.5 rounded bg-[#6b00e6] border-black ">Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;