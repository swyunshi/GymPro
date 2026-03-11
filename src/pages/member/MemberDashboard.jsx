import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { FaUser, FaCreditCard, FaCalendarCheck, FaBell, FaClock } from 'react-icons/fa';
import './MemberDashboard.css';

const MemberDashboard = () => {
    const { profile } = useAuth();
    const [attendance, setAttendance] = useState([]);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        if (!profile?.id) return;
        supabase.from('attendance').select('*').eq('member_id', profile.id).order('date', { ascending: false }).limit(5).then(({ data }) => setAttendance(data || []));
        supabase.from('payments').select('*').eq('member_id', profile.id).order('payment_date', { ascending: false }).limit(3).then(({ data }) => setPayments(data || []));
    }, [profile]);

    const expiryDate = profile?.expiry_date ? new Date(profile.expiry_date) : null;
    const today = new Date();
    const daysLeft = expiryDate ? Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24)) : null;

    return (
        <div className="member-dashboard">
            <div className="page-header">
                <h1>My Dashboard</h1>
                <p>Track your membership, workouts, and progress</p>
            </div>

            {/* Profile & Status */}
            <div className="dashboard-top">
                <div className="profile-card">
                    <div className="profile-avatar">{profile?.name?.charAt(0) || 'M'}</div>
                    <div className="profile-info">
                        <h3>{profile?.name}</h3>
                        <p>{profile?.email}</p>
                        <p>{profile?.phone}</p>
                    </div>
                    <span className="badge badge-gold">Member</span>
                </div>

                <div className="membership-status-card">
                    <div className="status-icon"><FaCreditCard /></div>
                    <div>
                        <div className="status-label">Current Plan</div>
                        <div className="status-value">{profile?.membership_plan || 'No Plan'}</div>
                    </div>
                    {daysLeft !== null && (
                        <div className={`days-left ${daysLeft < 7 ? 'urgent' : ''}`}>
                            <FaClock />
                            <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}</span>
                        </div>
                    )}
                </div>

                <div className="expiry-card">
                    <div className="status-icon"><FaCalendarCheck /></div>
                    <div>
                        <div className="status-label">Expiry Date</div>
                        <div className="status-value">{expiryDate ? expiryDate.toLocaleDateString('en-IN') : 'N/A'}</div>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="card notifications-card" style={{ marginBottom: 24 }}>
                <div className="card-header">
                    <FaBell className="gold-text" /> <h4>Notifications</h4>
                </div>
                <div className="notifications-list">
                    {daysLeft !== null && daysLeft < 10 && daysLeft > 0 && (
                        <div className="notification-item urgent">⚠️ Your membership expires in {daysLeft} days. Renew now!</div>
                    )}
                    {daysLeft !== null && daysLeft <= 0 && (
                        <div className="notification-item urgent">❌ Your membership has expired. Please renew to continue access.</div>
                    )}
                    <div className="notification-item">📢 New batch of HIIT classes starting next Monday!</div>
                    <div className="notification-item">🎉 You've visited the gym 5 times this week. Keep it up!</div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid-2">
                <div className="card">
                    <h4 style={{ marginBottom: 16 }}>Recent Attendance</h4>
                    {attendance.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)' }}>No attendance records yet.</p>
                    ) : (
                        <div className="table-wrapper">
                            <table>
                                <thead><tr><th>Date</th><th>Check-in</th></tr></thead>
                                <tbody>{attendance.map(a => (
                                    <tr key={a.id}><td>{new Date(a.date).toLocaleDateString('en-IN')}</td><td>{a.check_in_time}</td></tr>
                                ))}</tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className="card">
                    <h4 style={{ marginBottom: 16 }}>Recent Payments</h4>
                    {payments.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)' }}>No payment records yet.</p>
                    ) : (
                        <div className="table-wrapper">
                            <table>
                                <thead><tr><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
                                <tbody>{payments.map(p => (
                                    <tr key={p.id}>
                                        <td>{new Date(p.payment_date).toLocaleDateString('en-IN')}</td>
                                        <td>₹{p.amount?.toLocaleString()}</td>
                                        <td><span className={`badge badge-${p.status === 'paid' ? 'success' : 'warning'}`}>{p.status}</span></td>
                                    </tr>
                                ))}</tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MemberDashboard;
