import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import './Contact.css';

const fade = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase.from('contact_messages').insert(form);
            if (error) throw error;
            toast.success('Message sent! We\'ll get back to you within 24 hours.');
            setForm({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            toast.error('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">
            <section className="contact-hero">
                <div className="container">
                    <motion.div initial="hidden" animate="visible" variants={fade}>
                        <span className="eyebrow">Get in Touch</span>
                        <h1 className="section-title">We're Here to Help</h1>
                        <p className="section-subtitle">Have questions about membership, training or anything else? Reach out!</p>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="contact-layout">
                        {/* Info */}
                        <motion.div className="contact-info" initial="hidden" whileInView="visible" variants={fade} viewport={{ once: true }}>
                            <h2>Contact Information</h2>
                            <p>Drop by, call us, or send a message. Our team is always ready to assist you.</p>

                            <div className="contact-info-items">
                                {[
                                    { icon: <FaMapMarkerAlt />, label: 'Address', value: '123 Fitness Street, Gym City, GC 400001' },
                                    { icon: <FaPhone />, label: 'Phone', value: '+91 98765 43210' },
                                    { icon: <FaEnvelope />, label: 'Email', value: 'info@gympro.com' },
                                    { icon: <FaClock />, label: 'Hours', value: 'Mon-Fri 5AM–11PM | Sat-Sun 6AM–10PM' },
                                ].map((item, i) => (
                                    <div key={i} className="contact-item">
                                        <div className="contact-icon">{item.icon}</div>
                                        <div>
                                            <div className="contact-label">{item.label}</div>
                                            <div className="contact-value">{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Map */}
                            <div className="map-embed">
                                <iframe
                                    title="GymPro Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995!3d19.08250365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1"
                                    width="100%" height="220"
                                    style={{ border: 0, borderRadius: 'var(--radius)', filter: 'invert(90%) hue-rotate(180deg)' }}
                                    allowFullScreen loading="lazy">
                                </iframe>
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div className="contact-form-card" initial="hidden" whileInView="visible" variants={fade} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <h2>Send a Message</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Full Name</label>
                                    <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Subject</label>
                                    <input className="form-input" name="subject" value={form.subject} onChange={handleChange} placeholder="Membership inquiry, etc." required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Message</label>
                                    <textarea className="form-textarea" name="message" value={form.message} onChange={handleChange} placeholder="Write your message here..." required />
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                                    <FaPaperPlane /> {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
