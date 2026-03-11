import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { FaUsers, FaCreditCard, FaUserPlus, FaDumbbell, FaAppleAlt } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const revenueData = [
    { month: 'Oct', revenue: 45000 }, { month: 'Nov', revenue: 52000 },
    { month: 'Dec', revenue: 61000 }, { month: 'Jan', revenue: 58000 },
    { month: 'Feb', revenue: 67000 }, { month: 'Mar', revenue: 72000 },
];

// ─── TRAINER VIEW ────────────────────────────────────────────────────────────
const TrainerDashboard = ({ profile }) => {
    const [members, setMembers] = useState([]);
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            // Get all members
            const { data: membersData } = await supabase
                .from('profiles')
                .select('*')
                .eq('role', 'member')
                .order('name');

            // Get workout plans with member info
            const { data: workouts } = await supabase
                .from('workout_plans')
                .select('*');

            setMembers(membersData || []);
            setWorkoutPlans(workouts || []);
            setLoading(false);
        };
        fetch();
    }, []);

    const getWorkoutForMember = (memberId) =>
        workoutPlans.find(w => w.member_id === memberId);

    const activeMembers = members.filter(m =>
        m.expiry_date && new Date(m.expiry_date) > new Date()
    );

    return (
        <div>
            <div className="page-header">
                <h1>Trainer Dashboard</h1>
                <p>Welcome back, <span style={{ color: 'var(--primary)' }}>{profile?.name}</span> — here are your assigned members</p>
            </div>

            {/* Quick stats — trainer relevant only */}
            <div className="grid-3" style={{ marginBottom: 28 }}>
                {[
                    { icon: <FaUsers />, label: 'Total Members', value: members.length, color: '#3498db', bg: 'rgba(52,152,219,0.12)' },
                    { icon: <FaCreditCard />, label: 'Active Members', value: activeMembers.length, color: 'var(--success)', bg: 'rgba(46,204,113,0.12)' },
                    { icon: <FaDumbbell />, label: 'Workout Plans Set', value: workoutPlans.length, color: 'var(--primary)', bg: 'rgba(255,215,0,0.12)' },
                ].map((s, i) => (
                    <div key={i} className="stat-card">
                        <div className="stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
                        <div className="stat-value" style={{ fontSize: '1.8rem' }}>{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Member list with workout/diet info */}
            <div className="card">
                <h3 style={{ marginBottom: 20, display: 'flex', gap: 8, alignItems: 'center' }}>
                    <FaDumbbell style={{ color: 'var(--primary)' }} /> Member Overview
                </h3>

                {loading ? (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>Loading members...</p>
                ) : members.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>No members found.</p>
                ) : (
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Member</th>
                                    <th>Phone</th>
                                    <th>Plan</th>
                                    <th>Membership Status</th>
                                    <th>Expiry Date</th>
                                    <th>Workout Plan</th>
                                    <th>Diet Plan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(m => {
                                    const expired = m.expiry_date && new Date(m.expiry_date) < new Date();
                                    const workout = getWorkoutForMember(m.id);
                                    return (
                                        <tr key={m.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                    <div style={{
                                                        width: 36, height: 36, borderRadius: '50%',
                                                        background: 'linear-gradient(135deg, var(--primary), #e6a800)',
                                                        color: '#000', fontWeight: 800, fontSize: '0.85rem',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        flexShrink: 0,
                                                    }}>
                                                        {m.name?.charAt(0) || '?'}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{m.name || '—'}</div>
                                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{m.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{m.phone || '—'}</td>
                                            <td>
                                                {m.membership_plan
                                                    ? <span className="badge badge-gold">{m.membership_plan}</span>
                                                    : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                                            </td>
                                            <td>
                                                <span className={`badge badge-${expired ? 'danger' : 'success'}`}>
                                                    {expired ? 'Expired' : 'Active'}
                                                </span>
                                            </td>
                                            <td style={{ color: expired ? 'var(--danger)' : 'var(--text-secondary)' }}>
                                                {m.expiry_date || '—'}
                                            </td>
                                            <td>
                                                {workout
                                                    ? <span className="badge badge-success"><FaDumbbell style={{ marginRight: 4 }} />Assigned</span>
                                                    : <span className="badge badge-warning">Not Assigned</span>}
                                            </td>
                                            <td>
                                                <span className="badge badge-info">
                                                    <FaAppleAlt style={{ marginRight: 4 }} />View
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── ADMIN / MANAGER VIEW (original) ─────────────────────────────────────────
const AdminManagerDashboard = () => {
    const [stats, setStats] = useState({ members: 0, active: 0, revenue: 0, newThisMonth: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const [membersRes, paymentsRes] = await Promise.all([
                supabase.from('profiles').select('id, expiry_date, created_at').eq('role', 'member'),
                supabase.from('payments').select('amount, payment_date').eq('status', 'paid'),
            ]);
            const members = membersRes.data || [];
            const payments = paymentsRes.data || [];
            const now = new Date();
            const active = members.filter(m => m.expiry_date && new Date(m.expiry_date) > now).length;
            const totalRevenue = payments.reduce((s, p) => s + (p.amount || 0), 0);
            const newThisMonth = members.filter(m => {
                const d = new Date(m.created_at);
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            }).length;
            setStats({ members: members.length, active, revenue: totalRevenue, newThisMonth });
        };
        fetchStats();
    }, []);

    const statCards = [
        { icon: <FaUsers />, label: 'Total Members', value: stats.members, color: '#3498db', bg: 'rgba(52,152,219,0.12)' },
        { icon: <FaCreditCard />, label: 'Active Memberships', value: stats.active, color: 'var(--success)', bg: 'rgba(46,204,113,0.12)' },
        { icon: <FaCreditCard />, label: 'Total Revenue', value: `₹${stats.revenue.toLocaleString()}`, color: 'var(--primary)', bg: 'rgba(255,215,0,0.12)' },
        { icon: <FaUserPlus />, label: 'New This Month', value: stats.newThisMonth, color: '#9b59b6', bg: 'rgba(155,89,182,0.12)' },
    ];

    return (
        <div>
            <div className="page-header">
                <h1>Admin Dashboard</h1>
                <p>Overview of gym performance and key metrics</p>
            </div>

            <div className="grid-4" style={{ marginBottom: 28 }}>
                {statCards.map((s, i) => (
                    <div key={i} className="stat-card">
                        <div className="stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
                        <div className="stat-value" style={{ fontSize: '1.8rem' }}>{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid-2">
                <div className="card">
                    <h3 style={{ marginBottom: 20 }}>Monthly Revenue</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
                            <YAxis stroke="var(--text-muted)" fontSize={12} tickFormatter={v => `₹${v / 1000}k`} />
                            <Tooltip
                                contentStyle={{ background: 'var(--bg-card2)', border: '1px solid var(--border-subtle)', borderRadius: 8 }}
                                formatter={v => [`₹${v.toLocaleString()}`, 'Revenue']}
                            />
                            <Bar dataKey="revenue" fill="var(--primary)" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: 20 }}>Membership Status</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
                        {[
                            { label: 'Active Members', value: stats.active, total: stats.members, colour: 'var(--success)' },
                            { label: 'Expired / Inactive', value: stats.members - stats.active, total: stats.members, colour: 'var(--danger)' },
                            { label: 'New This Month', value: stats.newThisMonth, total: stats.members, colour: 'var(--primary)' },
                        ].map((row, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{row.label}</span>
                                    <span style={{ color: row.colour, fontWeight: 700 }}>{row.value}</span>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 6, height: 8, overflow: 'hidden' }}>
                                    <div style={{ width: `${row.total ? (row.value / row.total) * 100 : 0}%`, height: '100%', background: row.colour, borderRadius: 6 }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── MAIN COMPONENT — routes by role ─────────────────────────────────────────
const AdminDashboard = () => {
    const { profile } = useAuth();

    if (profile?.role === 'trainer') {
        return <TrainerDashboard profile={profile} />;
    }

    return <AdminManagerDashboard />;
};

export default AdminDashboard;
