import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaChartBar, FaUsers, FaDumbbell, FaCreditCard, FaCalendarCheck, FaImages, FaShieldAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import './AdminLayout.css';

const allLinks = [
    { to: '/admin/dashboard', icon: <FaChartBar />, label: 'Dashboard', roles: ['super_admin', 'admin', 'manager', 'trainer'] },
    { to: '/admin/members', icon: <FaUsers />, label: 'Members', roles: ['super_admin', 'admin', 'manager'] },
    { to: '/admin/trainers', icon: <FaDumbbell />, label: 'Trainers', roles: ['super_admin', 'admin'] },
    { to: '/admin/plans', icon: <FaShieldAlt />, label: 'Membership Plans', roles: ['super_admin', 'admin'] },
    { to: '/admin/payments', icon: <FaCreditCard />, label: 'Payments', roles: ['super_admin', 'admin', 'manager'] },
    { to: '/admin/attendance', icon: <FaCalendarCheck />, label: 'Attendance', roles: ['super_admin', 'admin', 'manager'] },
    { to: '/admin/content', icon: <FaImages />, label: 'Content', roles: ['super_admin', 'admin'] },
];

const AdminLayout = () => {
    const { profile, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = async () => { await logout(); navigate('/'); };

    const roleLinks = allLinks.filter(l => l.roles.includes(profile?.role));
    const roleLabel = profile?.role === 'super_admin' ? 'Super Admin' : profile?.role === 'manager' ? 'Manager' : profile?.role === 'trainer' ? 'Trainer' : 'Admin';

    return (
        <div className="admin-layout">
            <aside className={`admin-sidebar ${mobileOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">GymPro <span>Admin</span></div>
                    <button className="sidebar-close" onClick={() => setMobileOpen(false)}><FaTimes /></button>
                </div>

                <div className="sidebar-user">
                    <div className="sidebar-avatar">{profile?.name?.charAt(0) || 'A'}</div>
                    <div>
                        <div className="sidebar-name">{profile?.name || 'Admin'}</div>
                        <div className="sidebar-role">{roleLabel}</div>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {roleLinks.map(link => (
                        <NavLink key={link.to} to={link.to} end={link.to === '/admin/dashboard'}
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

            <div className="admin-main">
                <header className="admin-topbar">
                    <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)}><FaBars /></button>
                    <h2>Admin Panel — <span className="gold-text">{roleLabel}</span></h2>
                </header>
                <div className="admin-content">
                    <Outlet />
                </div>
            </div>

            {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}
        </div>
    );
};

export default AdminLayout;
