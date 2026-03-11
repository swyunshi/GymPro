import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { FaCreditCard, FaHistory, FaRedo } from 'react-icons/fa';
import toast from 'react-hot-toast';

const MemberMembership = () => {
    const { profile } = useAuth();
    const [payments, setPayments] = useState([]);
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        if (!profile?.id) return;
        supabase.from('payments').select('*').eq('member_id', profile.id).order('payment_date', { ascending: false }).then(({ data }) => setPayments(data || []));
        supabase.from('membership_plans').select('*').then(({ data }) => setPlans(data || []));
    }, [profile]);

    const expiryDate = profile?.expiry_date ? new Date(profile.expiry_date) : null;
    const today = new Date();
    const daysLeft = expiryDate ? Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24)) : null;

    const handleRenew = () => toast('Please contact the gym admin to renew your membership.', { icon: '📞' });

    return (
        <div>
            <div className="page-header">
                <h1>My Membership</h1>
                <p>Manage your membership plan and payment history</p>
            </div>

            {/* Current Plan */}
            <div className="card" style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <FaCreditCard style={{ color: 'var(--primary)', fontSize: '1.5rem' }} />
                    <h3>Current Plan</h3>
                </div>
                <div className="grid-2">
                    {[
                        { label: 'Plan Name', value: profile?.membership_plan || 'No Plan' },
                        { label: 'Status', value: daysLeft !== null && daysLeft > 0 ? 'Active' : 'Expired', badge: daysLeft !== null && daysLeft > 0 ? 'badge-success' : 'badge-danger' },
                        { label: 'Start Date', value: profile?.start_date ? new Date(profile.start_date).toLocaleDateString('en-IN') : 'N/A' },
                        { label: 'Expiry Date', value: expiryDate ? expiryDate.toLocaleDateString('en-IN') : 'N/A' },
                    ].map((item, i) => (
                        <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>{item.label}</div>
                            {item.badge
                                ? <span className={`badge ${item.badge}`}>{item.value}</span>
                                : <div style={{ fontWeight: 700, fontSize: '1rem' }}>{item.value}</div>}
                        </div>
                    ))}
                </div>
                {daysLeft !== null && daysLeft < 15 && (
                    <div style={{ marginTop: 20, padding: '14px 16px', background: 'rgba(231,76,60,0.08)', border: '1px solid rgba(231,76,60,0.2)', borderRadius: 'var(--radius-sm)', color: 'var(--danger)', fontSize: '0.9rem' }}>
                        ⚠️ Your membership {daysLeft > 0 ? `expires in ${daysLeft} days` : 'has expired'}. Renew now to continue enjoying full access.
                    </div>
                )}
                <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={handleRenew}>
                    <FaRedo /> Renew Membership
                </button>
            </div>

            {/* Available Plans */}
            {plans.length > 0 && (
                <div className="card" style={{ marginBottom: 24 }}>
                    <h3 style={{ marginBottom: 16 }}>Available Plans</h3>
                    <div className="grid-3">
                        {plans.map(plan => (
                            <div key={plan.id} style={{ padding: '20px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.03)' }}>
                                <div style={{ fontWeight: 700, marginBottom: 6 }}>{plan.name}</div>
                                <div style={{ color: 'var(--primary)', fontSize: '1.4rem', fontWeight: 800 }}>₹{plan.price?.toLocaleString()}</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{plan.duration_months} month{plan.duration_months > 1 ? 's' : ''}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Payment History */}
            <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <FaHistory style={{ color: 'var(--primary)' }} />
                    <h3>Payment History</h3>
                </div>
                {payments.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>No payment history found.</p>
                ) : (
                    <div className="table-wrapper">
                        <table>
                            <thead><tr><th>Date</th><th>Plan</th><th>Amount</th><th>Status</th></tr></thead>
                            <tbody>
                                {payments.map(p => (
                                    <tr key={p.id}>
                                        <td>{new Date(p.payment_date).toLocaleDateString('en-IN')}</td>
                                        <td>{p.plan_name}</td>
                                        <td>₹{p.amount?.toLocaleString()}</td>
                                        <td><span className={`badge badge-${p.status === 'paid' ? 'success' : 'warning'}`}>{p.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemberMembership;
