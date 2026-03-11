import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaDumbbell, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import './Auth.css';

const Register = () => {
    const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', confirm: '' });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirm) return toast.error('Passwords do not match');
        if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
        setLoading(true);
        try {
            await register(form.email, form.password, form.name, form.phone);
            toast.success('Account created! Please check your email to verify.');
            navigate('/login');
        } catch (err) {
            toast.error(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card auth-card-wide">
                <div className="auth-logo">
                    <FaDumbbell />
                    <span>GymPro</span>
                </div>
                <h1>Join GymPro</h1>
                <p className="auth-subtitle">Start your fitness journey today</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-grid-2">
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input className="form-input" name="name" value={form.name}
                                onChange={handleChange} placeholder="John Doe" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            <input className="form-input" name="phone" value={form.phone}
                                onChange={handleChange} placeholder="+91 98765 43210" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input className="form-input" type="email" name="email" value={form.email}
                            onChange={handleChange} placeholder="you@email.com" required />
                    </div>
                    <div className="auth-grid-2">
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="password-wrap">
                                <input className="form-input" type={showPass ? 'text' : 'password'}
                                    name="password" value={form.password} onChange={handleChange}
                                    placeholder="Min. 6 characters" required />
                                <button type="button" className="password-toggle"
                                    onClick={() => setShowPass(!showPass)}>
                                    {showPass ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Confirm Password</label>
                            <input className="form-input" type="password" name="confirm" value={form.confirm}
                                onChange={handleChange} placeholder="Repeat password" required />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p className="auth-footer">
                    Already a member? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
