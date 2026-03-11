import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';

const emptyForm = { name: '', phone: '', email: '', membership_plan: '', start_date: '', expiry_date: '', trainer_id: '', role: 'member' };

const MemberManagement = () => {
    const [members, setMembers] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState('');

    const fetchMembers = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('role', 'member')
            .order('created_at', { ascending: false });
        if (error) console.error('fetchMembers error:', error.message);
        setMembers(data || []);
    };

    const fetchTrainers = async () => {
        const { data, error } = await supabase.from('trainers').select('id, name');
        if (error) console.error('fetchTrainers error:', error.message);
        setTrainers(data || []);
    };

    useEffect(() => {
        fetchMembers();
        fetchTrainers();
    }, []);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = editing
            ? await supabase.from('profiles').update(form).eq('id', editing)
            : (() => { toast('New members must register themselves via the website.'); return { error: null }; })();
        if (error) return toast.error(error.message);
        toast.success(editing ? 'Member updated!' : 'Done');
        setShowModal(false);
        setEditing(null);
        setForm(emptyForm);
        fetchMembers();
    };

    const handleEdit = (m) => {
        setEditing(m.id);
        setForm({ name: m.name || '', phone: m.phone || '', email: m.email || '', membership_plan: m.membership_plan || '', start_date: m.start_date || '', expiry_date: m.expiry_date || '', trainer_id: m.trainer_id || '', role: m.role || 'member' });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this member?')) return;
        await supabase.from('profiles').delete().eq('id', id);
        toast.success('Member removed'); fetchMembers();
    };

    const filtered = members.filter(m => m.name?.toLowerCase().includes(search.toLowerCase()) || m.email?.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <div className="page-header">
                <h1>Member Management</h1>
                <p>Add, edit, and manage gym members</p>
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                    <FaSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input className="form-input" style={{ paddingLeft: 40 }} placeholder="Search members..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <button className="btn btn-primary" onClick={() => { setEditing(null); setForm(emptyForm); setShowModal(true); }}>
                    <FaPlus /> Add Member
                </button>
            </div>

            <div className="table-wrapper">
                <table>
                    <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Plan</th><th>Trainer</th><th>Expiry</th><th>Actions</th></tr></thead>
                    <tbody>
                        {filtered.map(m => {
                            const expired = m.expiry_date && new Date(m.expiry_date) < new Date();
                            return (
                                <tr key={m.id}>
                                    <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{m.name}</td>
                                    <td>{m.email}</td>
                                    <td>{m.phone}</td>
                                    <td><span className="badge badge-gold">{m.membership_plan || '—'}</span></td>
                                    <td>{trainers.find(t => t.id === m.trainer_id)?.name || '—'}</td>
                                    <td><span className={`badge badge-${expired ? 'danger' : 'success'}`}>{m.expiry_date || '—'}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <button className="btn btn-ghost btn-sm" onClick={() => handleEdit(m)}><FaEdit /></button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m.id)}><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>No members found.</div>}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-body" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">{editing ? 'Edit Member' : 'Add Member'}</h3>
                            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {[['name', 'Full Name', 'text'], ['phone', 'Phone', 'text'], ['email', 'Email', 'email']].map(([n, l, t]) => (
                                <div className="form-group" key={n}>
                                    <label className="form-label">{l}</label>
                                    <input className="form-input" name={n} type={t} value={form[n]} onChange={handleChange} required />
                                </div>
                            ))}
                            <div className="form-group">
                                <label className="form-label">Membership Plan</label>
                                <select className="form-select" name="membership_plan" value={form.membership_plan} onChange={handleChange}>
                                    <option value="">Select Plan</option>
                                    {['Basic', 'Standard', 'Premium'].map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div className="form-group">
                                    <label className="form-label">Start Date</label>
                                    <input className="form-input" name="start_date" type="date" value={form.start_date} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Expiry Date</label>
                                    <input className="form-input" name="expiry_date" type="date" value={form.expiry_date} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Assign Trainer</label>
                                <select className="form-select" name="trainer_id" value={form.trainer_id} onChange={handleChange}>
                                    <option value="">Select Trainer</option>
                                    {trainers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                {editing ? 'Update Member' : 'Save Member'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemberManagement;
