import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaDownload } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AttendanceManagement = () => {
    const [records, setRecords] = useState([]);
    const [members, setMembers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ member_id: '', date: new Date().toISOString().slice(0, 10), check_in_time: '' });
    const [dateFilter, setDateFilter] = useState(new Date().toISOString().slice(0, 10));

    const fetchRecords = async () => {
        const { data } = await supabase.from('attendance').select('*, profiles(name)').order('date', { ascending: false }).order('check_in_time', { ascending: false });
        setRecords(data || []);
    };

    useEffect(() => {
        fetchRecords();
        supabase.from('profiles').select('id, name').eq('role', 'member').then(({ data }) => setMembers(data || []));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('attendance').insert(form);
        if (error) return toast.error(error.message);
        toast.success('Attendance marked!');
        setShowModal(false); setForm({ member_id: '', date: new Date().toISOString().slice(0, 10), check_in_time: '' });
        fetchRecords();
    };

    const filtered = dateFilter ? records.filter(r => r.date === dateFilter) : records;

    const exportCSV = () => {
        const rows = [['Member', 'Date', 'Day', 'Check-in Time'],
        ...filtered.map(r => [r.profiles?.name, r.date, new Date(r.date).toLocaleDateString('en-IN', { weekday: 'long' }), r.check_in_time])];
        const csv = rows.map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `attendance-${dateFilter}.csv`; a.click();
        toast.success('Report exported!');
    };

    return (
        <div>
            <div className="page-header">
                <h1>Attendance Management</h1>
                <p>Mark and track member gym visits</p>
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Filter by Date:</label>
                    <input className="form-input" type="date" value={dateFilter} style={{ width: 'auto' }} onChange={e => setDateFilter(e.target.value)} />
                    {dateFilter && <button className="btn btn-ghost btn-sm" onClick={() => setDateFilter('')}>Clear</button>}
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                    <button className="btn btn-outline btn-sm" onClick={exportCSV}><FaDownload /> Export</button>
                    <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}><FaPlus /> Mark Attendance</button>
                </div>
            </div>

            <div style={{ margin: '0 0 16px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Showing <strong style={{ color: 'var(--primary)' }}>{filtered.length}</strong> records {dateFilter && `for ${dateFilter}`}
            </div>

            <div className="table-wrapper">
                <table>
                    <thead><tr><th>Member</th><th>Date</th><th>Day</th><th>Check-In Time</th></tr></thead>
                    <tbody>
                        {filtered.map(r => (
                            <tr key={r.id}>
                                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{r.profiles?.name}</td>
                                <td>{r.date}</td>
                                <td style={{ color: 'var(--primary)' }}>{new Date(r.date).toLocaleDateString('en-IN', { weekday: 'long' })}</td>
                                <td>{r.check_in_time || '—'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No records for selected date.</div>}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-body" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Mark Attendance</h3>
                            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Select Member</label>
                                <select className="form-select" value={form.member_id} onChange={e => setForm({ ...form, member_id: e.target.value })} required>
                                    <option value="">-- Select Member --</option>
                                    {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Date</label>
                                <input className="form-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Check-In Time</label>
                                <input className="form-input" type="time" value={form.check_in_time} onChange={e => setForm({ ...form, check_in_time: e.target.value })} required />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Save Attendance</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttendanceManagement;
