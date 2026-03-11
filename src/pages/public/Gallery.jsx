import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import './Gallery.css';

const fade = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const photos = [
    { id: 1, src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600', title: 'Weight Room', category: 'facility' },
    { id: 2, src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600', title: 'Cardio Zone', category: 'facility' },
    { id: 3, src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600', title: 'CrossFit Area', category: 'training' },
    { id: 4, src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600', title: 'Personal Training', category: 'training' },
    { id: 5, src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600', title: 'Group Yoga', category: 'classes' },
    { id: 6, src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600', title: 'Group HIIT', category: 'classes' },
    { id: 7, src: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=600', title: 'Free Weights', category: 'facility' },
    { id: 8, src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600', title: 'Morning Workout', category: 'training' },
    { id: 9, src: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=600', title: 'Stretching Zone', category: 'classes' },
];

const categories = ['all', 'facility', 'training', 'classes'];

const Gallery = () => {
    const [active, setActive] = useState('all');
    const [lightbox, setLightbox] = useState(null);

    const filtered = active === 'all' ? photos : photos.filter(p => p.category === active);

    return (
        <div className="gallery-page">
            <section className="gallery-hero">
                <div className="container">
                    <motion.div initial="hidden" animate="visible" variants={fade}>
                        <span className="eyebrow">Visual Tour</span>
                        <h1 className="section-title">Explore Our Gym</h1>
                        <p className="section-subtitle">Take a look inside GymPro — world-class facilities, inspiring spaces.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="gallery-filters">
                        {categories.map(cat => (
                            <button key={cat} className={`filter-btn ${active === cat ? 'active' : ''}`} onClick={() => setActive(cat)}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="gallery-grid">
                        {filtered.map((img, i) => (
                            <motion.div key={img.id} className="gallery-item"
                                initial="hidden" animate="visible" variants={fade} transition={{ delay: i * 0.05 }}
                                onClick={() => setLightbox(img)}>
                                <img src={img.src} alt={img.title} />
                                <div className="gallery-overlay">
                                    <span>{img.title}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}>
                        <motion.div className="lightbox-inner" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
                            onClick={e => e.stopPropagation()}>
                            <button className="lightbox-close" onClick={() => setLightbox(null)}><FaTimes /></button>
                            <img src={lightbox.src} alt={lightbox.title} />
                            <p>{lightbox.title}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
