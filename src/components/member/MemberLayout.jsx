import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHome, FaCreditCard, FaDumbbell, FaAppleAlt, FaCalendarCheck, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import './MemberLayout.css';

const links = [
    { to: '/member/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { to: '/member/membership', icon: <FaCreditCard />, label: 'Membership' },
    { to: '/member/workout', icon: <FaDumbbell />, label: 'Workout Plan' },
    { to: '/member/diet', icon: <FaAppleAlt />, label: 'Diet Plan' },
    { to: '/member/attendance', icon: <FaCalendarCheck />, label: 'Attendance' },
];

const MemberLayout = () => {
    const { profile, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = async () => { await logout(); navigate('/'); };

    return (
        <div className="member-layout">
            <aside className={`member-sidebar ${mobileOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">GymPro</div>
                    <button className="sidebar-close" onClick={() => setMobileOpen(false)}><FaTimes /></button>
                </div>

                <div className="sidebar-user">
                    <div className="sidebar-avatar">{profile?.name?.charAt(0) || 'M'}</div>
                    <div>
                        <div className="sidebar-name">{profile?.name || 'Member'}</div>
                        <div className="sidebar-role">Member</div>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {links.map(link => (
                        <NavLink key={link.to} to={link.to} end={link.to === '/member/dashboard'}
                            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                            onClick={() => setMobileOpen(false)}>
                            {link.icon}<span>{link.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <button className="sidebar-logout" onClick={handleLogout}>
                    <FaSignOutAlt /><span>Logout</span>
                </button>
            </aside>

            <div className="member-main">
                <header className="member-topbar">
                    <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)}><FaBars /></button>
                    <h2>Welcome back, <span className="gold-text">{profile?.name?.split(' ')[0] || 'Member'}</span> 👋</h2>
                </header>
                <div className="member-content">
                    <Outlet />
                </div>
            </div>

            {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}
        </div>
    );
};

export default MemberLayout;
