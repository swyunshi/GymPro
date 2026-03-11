import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaDumbbell, FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, profile, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const dashboardLink = profile?.role === 'member' ? '/member/dashboard'
        : profile?.role === 'admin' || profile?.role === 'super_admin' || profile?.role === 'manager' || profile?.role === 'trainer' ? '/admin/dashboard'
            : '/login';

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/membership', label: 'Membership' },
        { to: '/trainers', label: 'Trainers' },
        { to: '/gallery', label: 'Gallery' },
        { to: '/contact', label: 'Contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-inner">
                <Link to="/" className="navbar-logo">
                    <FaDumbbell />
                    <span>GymPro</span>
                </Link>

                <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
                    {navLinks.map(link => (
                        <li key={link.to}>
                            <NavLink to={link.to} end className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="navbar-actions">
                    {user ? (
                        <>
                            <Link to={dashboardLink} className="btn btn-ghost btn-sm">
                                <FaUser /> Dashboard
                            </Link>
                            <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                            <Link to="/register" className="btn btn-primary btn-sm">Join Now</Link>
                        </>
                    )}
                </div>

                <button className="navbar-hamburger" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {isOpen && (
                <div className="navbar-mobile-menu">
                    {navLinks.map(link => (
                        <NavLink key={link.to} to={link.to} end onClick={() => setIsOpen(false)}>
                            {link.label}
                        </NavLink>
                    ))}
                    {user ? (
                        <>
                            <Link to={dashboardLink} onClick={() => setIsOpen(false)}>Dashboard</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                            <Link to="/register" onClick={() => setIsOpen(false)}>Join Now</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
