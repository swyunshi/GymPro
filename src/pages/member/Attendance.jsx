import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { FaCalendarCheck } from 'react-icons/fa';

const Attendance = () => {
    const { profile } = useAuth();
    const [records, setRecords] = useState([]);

    useEffect(() => {
        if (!profile?.id) return;
        supabase.from('attendance').select('*').eq('member_id', profile.id).order('date', { ascending: false }).then(({ data }) => setRecords(data || []));
    }, [profile]);

    const thisMonth = records.filter(r => {
        const d = new Date(r.date);
        const now = new Date();
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });

    return (
        <div>
            <div className="page-header">
                <h1>Attendance History</h1>
                <p>Your gym visit records and check-in history</p>
            </div>

            {/* Stats Row */}
            <div className="grid-3" style={{ marginBottom: 24 }}>
                {[
                    { label: 'Total Visits', value: records.length, icon: '🏋️' },
                    { label: 'This Month', value: thisMonth.length, icon: '📅' },
                    { label: 'Streak (Days)', value: records.length > 0 ? records.length : 0, icon: '🔥' },
                ].map((s, i) => (
                    <div key={i} className="stat-card">
                        <div className="stat-icon" style={{ background: 'rgba(255,215,0,0.1)' }}>{s.icon}</div>
                        <div className="stat-value">{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Records Table */}
            <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <FaCalendarCheck style={{ color: 'var(--primary)', fontSize: '1.2rem' }} />
                    <h3>Check-In Records</h3>
                </div>
                {records.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>No attendance records yet. Start visiting the gym to track your progress!</p>
                ) : (
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr><th>#</th><th>Date</th><th>Day</th><th>Check-In Time</th></tr>
                            </thead>
                            <tbody>
                                {records.map((r, i) => {
                                    const date = new Date(r.date);
                                    return (
                                        <tr key={r.id}>
                                            <td style={{ color: 'var(--text-muted)' }}>{records.length - i}</td>
                                            <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{date.toLocaleDateString('en-IN')}</td>
                                            <td style={{ color: 'var(--primary)' }}>{date.toLocaleDateString('en-IN', { weekday: 'long' })}</td>
                                            <td>{r.check_in_time || 'N/A'}</td>
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

export default Attendance;
