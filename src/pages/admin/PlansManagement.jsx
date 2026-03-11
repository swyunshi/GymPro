import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const emptyForm = { name: '', price: '', duration_months: '', features: '' };

const PlansManagement = () => {
    const [plans, setPlans] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editing, setEditing] = useState(null);

    const fetch = async () => {
        const { data } = await supabase.from('membership_plans').select('*').order('price');
        setPlans(data || []);
    };
    useEffect(() => { fetch(); }, []);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name: form.name,
            price: parseFloat(form.price),
            duration_months: parseInt(form.duration_months),
            features: form.features.split('\n').map(f => f.trim()).filter(Boolean),
        };
        const { error } = editing
            ? await supabase.from('membership_plans').update(payload).eq('id', editing)
            : await supabase.from('membership_plans').insert(payload);
        if (error) return toast.error(error.message);
        toast.success(editing ? 'Plan updated!' : 'Plan added!');
        setShowModal(false); setEditing(null); setForm(emptyForm); fetch();
    };

    const handleEdit = (p) => {
        setEditing(p.id);
        setForm({ name: p.name || '', price: p.price || '', duration_months: p.duration_months || '', features: (p.features || []).join('\n') });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this plan?')) return;
        await supabase.from('membership_plans').delete().eq('id', id);
        toast.success('Plan removed'); fetch();
    };

    return (
        <div>
            <div className="page-header">
                <h1>Membership Plans</h1>
                <p>Manage pricing and membership plan features</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
                <button className="btn btn-primary" onClick={() => { setEditing(null); setForm(emptyForm); setShowModal(true); }}>
                    <FaPlus /> Add Plan
                </button>
            </div>

            <div className="grid-3">
                {plans.map(p => (
                    <div key={p.id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                            <div>
                                <h3 style={{ fontWeight: 800, marginBottom: 4 }}>{p.name}</h3>
                                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>₹{p.price?.toLocaleString()}</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{p.duration_months} month{p.duration_months > 1 ? 's' : ''}</div>
                            </div>
                            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                                <button className="btn btn-ghost btn-sm" onClick={() => handleEdit(p)}><FaEdit /></button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}><FaTrash /></button>
                            </div>
                        </div>
                        {p.features?.length > 0 && (
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {p.features.map((f, i) => (
                                    <li key={i} style={{ display: 'flex', gap: 8, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                        <span style={{ color: 'var(--success)' }}>✓</span>{f}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
                {plans.length === 0 && (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                        No plans yet. Add your first membership plan.
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-body" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">{editing ? 'Edit Plan' : 'Add Plan'}</h3>
                            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group"><label className="form-label">Plan Name</label><input className="form-input" name="name" value={form.name} onChange={handleChange} required /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div className="form-group"><label className="form-label">Price (₹)</label><input className="form-input" name="price" type="number" value={form.price} onChange={handleChange} required /></div>
                                <div className="form-group"><label className="form-label">Duration (months)</label><input className="form-input" name="duration_months" type="number" value={form.duration_months} onChange={handleChange} required /></div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Features (one per line)</label>
                                <textarea className="form-textarea" name="features" value={form.features} onChange={handleChange} placeholder="Gym floor access&#10;Locker room&#10;Group classes" style={{ minHeight: 120 }} />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>{editing ? 'Update Plan' : 'Add Plan'}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlansManagement;
