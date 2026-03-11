import { motion } from 'framer-motion';
import { FaHeart, FaEye, FaRocket, FaDumbbell, FaUsers, FaTrophy } from 'react-icons/fa';
import './About.css';

const fade = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const trainers = [
    { name: 'Raj Sharma', role: 'Head Strength Coach', exp: '8 Years', spec: 'Powerlifting, Bodybuilding', img: 'https://i.pravatar.cc/200?img=11' },
    { name: 'Priya Patel', role: 'Yoga & Wellness Expert', exp: '6 Years', spec: 'Yoga, Meditation, Flexibility', img: 'https://i.pravatar.cc/200?img=23' },
    { name: 'Arjun Singh', role: 'Cardio & HIIT Coach', exp: '10 Years', spec: 'Running, HIIT, Cycling', img: 'https://i.pravatar.cc/200?img=15' },
    { name: 'Neha Kapoor', role: 'Nutrition Coach', exp: '5 Years', spec: 'Sports Nutrition, Weight Loss', img: 'https://i.pravatar.cc/200?img=47' },
];

const equipment = [
    { name: 'Free Weights Zone', desc: '500+ dumbbells, barbells, kettlebells from 1kg to 100kg', icon: '🏋️' },
    { name: 'Cardio Theater', desc: '40+ treadmills, bikes, ellipticals with HD screens', icon: '🏃' },
    { name: 'Functional Training', desc: 'Battle ropes, TRX, plyometric equipment', icon: '💪' },
    { name: 'Group Studio', desc: 'Dedicated air-conditioned studio for group classes', icon: '🎯' },
    { name: 'Recovery Zone', desc: 'Foam rollers, massage guns, stretching area', icon: '🧘' },
    { name: 'Sauna & Steam', desc: 'Premium sauna and steam rooms for recovery', icon: '♨️' },
];

const About = () => (
    <div className="about-page">
        {/* Hero */}
        <section className="about-hero">
            <div className="container">
                <motion.div initial="hidden" animate="visible" variants={fade} transition={{ duration: 0.7 }}>
                    <span className="eyebrow">About GymPro</span>
                    <h1 className="section-title">Built for Champions,<br />Open to Everyone</h1>
                    <p className="section-subtitle">Founded in 2014, GymPro has been the region's premier fitness destination for over a decade.</p>
                </motion.div>
            </div>
        </section>

        {/* Story */}
        <section className="section">
            <div className="container">
                <div className="about-story">
                    <motion.div className="story-text" initial="hidden" whileInView="visible" variants={fade} viewport={{ once: true }}>
                        <h2>Our Story</h2>
                        <p>GymPro was born out of a passion for fitness and a desire to create a space where every individual — beginner or athlete — could achieve extraordinary results. What started as a modest 2,000 sq.ft. gym has grown into a 15,000 sq.ft. fitness complex.</p>
                        <p>Over the years, we have helped more than 10,000 members hit their goals — from weight loss and muscle gain to athletic performance and stress relief. Our approach is simple: world-class equipment + expert guidance + a supportive community = transformation.</p>
                    </motion.div>
                    <motion.div className="story-stats" initial="hidden" whileInView="visible" variants={fade} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                        {[{ icon: <FaUsers />, val: '10,000+', lbl: 'Members Served' }, { icon: <FaTrophy />, val: '25+', lbl: 'Awards Won' }, { icon: <FaDumbbell />, val: '200+', lbl: 'Equipment Pieces' }, { icon: <FaHeart />, val: '98%', lbl: 'Satisfaction Rate' }].map((s, i) => (
                            <div key={i} className="story-stat-card">
                                <div className="story-stat-icon">{s.icon}</div>
                                <div className="story-stat-val">{s.val}</div>
                                <div className="story-stat-lbl">{s.lbl}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>

        {/* Mission & Vision */}
        <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="container">
                <h2 className="section-title">Mission & Vision</h2>
                <p className="section-subtitle">What drives us every day</p>
                <div className="grid-2">
                    {[
                        { icon: <FaHeart />, title: 'Our Mission', text: 'To empower individuals of all fitness levels to achieve their health and wellness goals through state-of-the-art facilities, expert coaching, and a motivating community environment.' },
                        { icon: <FaEye />, title: 'Our Vision', text: 'To be the most transformative fitness community in the country — a place where every member feels inspired, supported, and equipped to become the best version of themselves.' },
                    ].map((item, i) => (
                        <motion.div key={i} className="mission-card" initial="hidden" whileInView="visible" variants={fade} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                            <div className="mission-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* Trainers */}
        <section className="section">
            <div className="container">
                <h2 className="section-title">Our Expert Trainers</h2>
                <p className="section-subtitle">Certified, experienced, and passionate about your success</p>
                <div className="grid-4">
                    {trainers.map((t, i) => (
                        <motion.div key={i} className="about-trainer-card" initial="hidden" whileInView="visible" variants={fade} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                            <img src={t.img} alt={t.name} />
                            <h4>{t.name}</h4>
                            <p className="trainer-role">{t.role}</p>
                            <p className="trainer-spec">{t.spec}</p>
                            <span className="badge badge-gold">{t.exp}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* Equipment */}
        <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="container">
                <h2 className="section-title">World-Class Equipment</h2>
                <p className="section-subtitle">Every machine, every tool — built for peak performance</p>
                <div className="grid-3">
                    {equipment.map((e, i) => (
                        <motion.div key={i} className="equipment-card" initial="hidden" whileInView="visible" variants={fade} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                            <div className="equipment-icon">{e.icon}</div>
                            <h4>{e.name}</h4>
                            <p>{e.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    </div>
);

export default About;
