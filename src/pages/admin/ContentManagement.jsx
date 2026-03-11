import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FaSave } from 'react-icons/fa';
import toast from 'react-hot-toast';

const keys = [
    { key: 'hero_title', label: 'Hero Title', type: 'input' },
    { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea' },
    { key: 'about_title', label: 'About Page Title', type: 'input' },
    { key: 'about_story', label: 'Gym Story', type: 'textarea' },
    { key: 'contact_phone', label: 'Contact Phone', type: 'input' },
    { key: 'contact_email', label: 'Contact Email', type: 'input' },
    { key: 'contact_address', label: 'Contact Address', type: 'textarea' },
];

const ContentManagement = () => {
    const [content, setContent] = useState({});
    const [saving, setSaving] = useState(null);

    useEffect(() => {
        supabase.from('site_content').select('*').then(({ data }) => {
            const map = {};
            (data || []).forEach(item => { map[item.key] = item.value; });
            setContent(map);
        });
    }, []);

    const handleSave = async (key) => {
        setSaving(key);
        const existing = await supabase.from('site_content').select('id').eq('key', key).single();
        const { error } = existing.data
            ? await supabase.from('site_content').update({ value: content[key] || '', updated_at: new Date().toISOString() }).eq('key', key)
            : await supabase.from('site_content').insert({ key, value: content[key] || '' });
        if (error) toast.error(error.message);
        else toast.success('Saved!');
        setSaving(null);
    };

    return (
        <div>
            <div className="page-header">
                <h1>Website Content</h1>
                <p>Update homepage content, contact info, and more</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {keys.map(item => (
                    <div key={item.key} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <label className="form-label" style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.label}</label>
                            <button className="btn btn-primary btn-sm" onClick={() => handleSave(item.key)} disabled={saving === item.key}>
                                <FaSave /> {saving === item.key ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                        {item.type === 'input' ? (
                            <input className="form-input" value={content[item.key] || ''} onChange={e => setContent({ ...content, [item.key]: e.target.value })} placeholder={`Enter ${item.label.toLowerCase()}...`} />
                        ) : (
                            <textarea className="form-textarea" value={content[item.key] || ''} onChange={e => setContent({ ...content, [item.key]: e.target.value })} placeholder={`Enter ${item.label.toLowerCase()}...`} style={{ minHeight: 100 }} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentManagement;
