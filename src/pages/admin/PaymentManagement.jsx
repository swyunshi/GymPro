import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FaDownload, FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';

const PaymentManagement = () => {
    const [payments, setPayments] = useState([]);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        supabase.from('payments').select('*, profiles(name, email)').order('payment_date', { ascending: false })
            .then(({ data }) => setPayments(data || []));
    }, []);

    const filtered = payments.filter(p => {
        const matchFilter = filter === 'all' || p.status === filter;
        const matchSearch = p.profiles?.name?.toLowerCase().includes(search.toLowerCase()) || p.profiles?.email?.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    const exportCSV = () => {
        const rows = [['Member', 'Email', 'Plan', 'Amount', 'Date', 'Status'],
        ...filtered.map(p => [p.profiles?.name, p.profiles?.email, p.plan_name, p.amount, p.payment_date, p.status])];
        const csv = rows.map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'payments.csv'; a.click();
        toast.success('CSV exported!');
    };

    const totalRevenue = filtered.filter(p => p.status === 'paid').reduce((s, p) => s + (p.amount || 0), 0);
    const pendingCount = filtered.filter(p => p.status === 'pending').length;

    return (
        <div>
            <div className="page-header">
                <h1>Payment Management</h1>
                <p>Track and manage all gym payment transactions</p>
            </div>

            {/* Quick Stats */}
            <div className="grid-3" style={{ marginBottom: 24 }}>
                {[
                    { label: 'Total Transactions', value: payments.length },
                    { label: 'Collected Revenue', value: `₹${totalRevenue.toLocaleString()}` },
                    { label: 'Pending Payments', value: pendingCount },
                ].map((s, i) => (
                    <div key={i} className="stat-card">
                        <div className="stat-value" style={{ fontSize: '1.6rem' }}>{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Filters & Export */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                    <FaSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input className="form-input" style={{ paddingLeft: 40 }} placeholder="Search by member..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                {['all', 'paid', 'pending'].map(f => (
                    <button key={f} className={`btn ${filter === f ? 'btn-primary' : 'btn-ghost'} btn-sm`} onClick={() => setFilter(f)}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
                <button className="btn btn-outline btn-sm" onClick={exportCSV}><FaDownload /> Export CSV</button>
            </div>

            <div className="table-wrapper">
                <table>
                    <thead><tr><th>Member</th><th>Email</th><th>Plan</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
                    <tbody>
                        {filtered.map(p => (
                            <tr key={p.id}>
                                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.profiles?.name || '—'}</td>
                                <td>{p.profiles?.email}</td>
                                <td>{p.plan_name}</td>
                                <td style={{ color: 'var(--primary)', fontWeight: 700 }}>₹{p.amount?.toLocaleString()}</td>
                                <td>{p.payment_date}</td>
                                <td><span className={`badge badge-${p.status === 'paid' ? 'success' : 'warning'}`}>{p.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No payment records found.</div>}
            </div>
        </div>
    );
};

export default PaymentManagement;
