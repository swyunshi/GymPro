import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const emptyForm = { name: '', specialization: '', experience: '', bio: '', photo_url: '' };

const TrainerManagement = () => {
    const [trainers, setTrainers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editing, setEditing] = useState(null);

    const fetch = async () => {
        const { data } = await supabase.from('trainers').select('*').order('name');
        setTrainers(data || []);
    };
    useEffect(() => { fetch(); }, []);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { ...form, experience: parseInt(form.experience) || 0 };
        const { error } = editing
            ? await supabase.from('trainers').update(payload).eq('id', editing)
            : await supabase.from('trainers').insert(payload);
        if (error) return toast.error(error.message);
        toast.success(editing ? 'Trainer updated!' : 'Trainer added!');
        setShowModal(false); setEditing(null); setForm(emptyForm); fetch();
    };

    const handleEdit = (t) => {
        setEditing(t.id);
        setForm({ name: t.name || '', specialization: t.specialization || '', experience: t.experience || '', bio: t.bio || '', photo_url: t.photo_url || '' });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this trainer?')) return;
        await supabase.from('trainers').delete().eq('id', id);
        toast.success('Trainer removed'); fetch();
    };

    return (
        <div>
            <div className="page-header">
                <h1>Trainer Management</h1>
                <p>Manage your gym's trainer team</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
                <button className="btn btn-primary" onClick={() => { setEditing(null); setForm(emptyForm); setShowModal(true); }}>
                    <FaPlus /> Add Trainer
                </button>
            </div>

            <div className="grid-3">
                {trainers.map(t => (
                    <div key={t.id} className="card" style={{ textAlign: 'center' }}>
                        <img
                            src={t.photo_url || `https://i.pravatar.cc/100?u=${t.id}`}
                            alt={t.name}
                            style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)', margin: '0 auto 12px' }}
                        />
                        <h4 style={{ fontWeight: 700, marginBottom: 4 }}>{t.name}</h4>
                        <p style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: 4 }}>{t.specialization}</p>
                        <span className="badge badge-gold">{t.experience} yrs exp</span>
                        {t.bio && <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 8 }}>{t.bio}</p>}
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
                            <button className="btn btn-ghost btn-sm" onClick={() => handleEdit(t)}><FaEdit /> Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t.id)}><FaTrash /></button>
                        </div>
                    </div>
                ))}
            </div>

            {trainers.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                    No trainers added yet. Click "Add Trainer" to get started.
                </div>
            )}

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-body" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">{editing ? 'Edit Trainer' : 'Add Trainer'}</h3>
                            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {[['name', 'Full Name'], ['specialization', 'Specialization'], ['photo_url', 'Photo URL (optional)']].map(([n, l]) => (
                                <div className="form-group" key={n}>
                                    <label className="form-label">{l}</label>
                                    <input className="form-input" name={n} value={form[n]} onChange={handleChange} required={n !== 'photo_url'} />
                                </div>
                            ))}
                            <div className="form-group">
                                <label className="form-label">Experience (years)</label>
                                <input className="form-input" name="experience" type="number" min="0" value={form.experience} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Bio</label>
                                <textarea className="form-textarea" name="bio" value={form.bio} onChange={handleChange} style={{ minHeight: 80 }} />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                {editing ? 'Update' : 'Add Trainer'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainerManagement;
