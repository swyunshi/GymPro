import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaDumbbell, FaArrowRight, FaStar, FaPlay, FaFire, FaHeart, FaBolt } from 'react-icons/fa';
import './Home.css';

const stats = [
    { value: '500+', label: 'Active Members' },
    { value: '20+', label: 'Expert Trainers' },
    { value: '50+', label: 'Equipment Sets' },
    { value: '10+', label: 'Years Experience' },
];

const plans = [
    { name: 'Basic', price: '₹999', period: '/month', icon: <FaDumbbell />, features: ['Access to gym floor', 'Locker room access', 'Basic equipment', '2 group classes/week'], color: '#3498db' },
    { name: 'Standard', price: '₹1,799', period: '/month', icon: <FaFire />, features: ['All Basic features', 'Personal trainer (2x/week)', 'Full equipment access', 'Diet consultation', '5 group classes/week'], color: '#FFD700', popular: true },
    { name: 'Premium', price: '₹2,999', period: '/month', icon: <FaBolt />, features: ['All Standard features', 'Daily personal training', 'Dedicated nutritionist', 'Unlimited group classes', 'Sauna & spa access', 'Priority booking'], color: '#e74c3c' },
];

const trainers = [
    { name: 'Raj Sharma', role: 'Strength Coach', exp: '8 yrs', img: 'https://i.pravatar.cc/200?img=11' },
    { name: 'Priya Patel', role: 'Yoga & Wellness', exp: '6 yrs', img: 'https://i.pravatar.cc/200?img=23' },
    { name: 'Arjun Singh', role: 'Cardio Specialist', exp: '10 yrs', img: 'https://i.pravatar.cc/200?img=15' },
];

const testimonials = [
    { name: 'Ankit Mehta', text: 'GymPro completely transformed my body in just 4 months! The trainers are incredible.', rating: 5, img: 'https://i.pravatar.cc/60?img=33' },
    { name: 'Sneha Verma', text: 'Best gym in the city! Premium equipment and a very supportive community.', rating: 5, img: 'https://i.pravatar.cc/60?img=47' },
    { name: 'Rahul Gupta', text: 'Lost 15kg in 3 months with Diet Plan + workout combo. Highly recommend!', rating: 5, img: 'https://i.pravatar.cc/60?img=56' },
];

const fade = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const Home = () => {
    return (
        <div className="home">
            {/* Hero */}
            <section className="hero">
                <div className="hero-bg-effects">
                    <div className="hero-orb hero-orb-1" />
                    <div className="hero-orb hero-orb-2" />
                </div>
                <div className="container hero-content">
                    <motion.div initial="hidden" animate="visible" variants={fade} transition={{ duration: 0.8 }} className="hero-text">
                        <span className="badge badge-gold" style={{ marginBottom: 20, display: 'inline-block' }}>🏆 #1 Rated Gym in the City</span>
                        <h1>Forge Your <span className="gold-text">Strongest</span> Self</h1>
                        <p>World-class equipment, expert trainers, and a community that drives you to push beyond your limits. Your transformation starts here.</p>
                        <div className="hero-actions">
                            <Link to="/register" className="btn btn-primary btn-lg">Start Today <FaArrowRight /></Link>
                            <Link to="/membership" className="btn btn-ghost btn-lg"><FaPlay /> View Plans</Link>
                        </div>
                    </motion.div>
                </div>
                {/* Stats bar */}
                <div className="stats-bar">
                    <div className="container stats-inner">
                        {stats.map((s, i) => (
                            <motion.div key={i} className="stat-item" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
                                <span className="stat-val">{s.value}</span>
                                <span className="stat-lbl">{s.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Membership Preview */}
            <section className="section">
                <div className="container">
                    <p className="eyebrow">Flexible Pricing</p>
                    <h2 className="section-title">Choose Your Plan</h2>
                    <p className="section-subtitle">No hidden fees. Cancel anytime. Invest in yourself.</p>
                    <div className="plans-grid">
                        {plans.map((plan, i) => (
                            <motion.div key={i} className={`plan-card ${plan.popular ? 'popular' : ''}`}
                                initial="hidden" whileInView="visible" variants={fade} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                                {plan.popular && <div className="popular-badge">Most Popular</div>}
                                <div className="plan-icon" style={{ color: plan.color, background: plan.color + '1a' }}>{plan.icon}</div>
                                <h3>{plan.name}</h3>
                                <div className="plan-price"><span className="price">{plan.price}</span><span className="period">{plan.period}</span></div>
                                <ul className="plan-features">
                                    {plan.features.map((f, fi) => <li key={fi}><span className="check">✓</span>{f}</li>)}
                                </ul>
                                <Link to="/register" className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>
                                    Get Started
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trainer Highlights */}
            <section className="section trainers-section">
                <div className="container">
                    <p className="eyebrow">Expert Guidance</p>
                    <h2 className="section-title">Meet Our Trainers</h2>
                    <p className="section-subtitle">Certified professionals dedicated to your success</p>
                    <div className="grid-3">
                        {trainers.map((t, i) => (
                            <motion.div key={i} className="trainer-card" initial="hidden" whileInView="visible" variants={fade} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                                <img src={t.img} alt={t.name} />
                                <h4>{t.name}</h4>
                                <p>{t.role}</p>
                                <span className="badge badge-gold">{t.exp} Experience</span>
                            </motion.div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 40 }}>
                        <Link to="/trainers" className="btn btn-outline">View All Trainers <FaArrowRight /></Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section">
                <div className="container">
                    <p className="eyebrow">Success Stories</p>
                    <h2 className="section-title">What Members Say</h2>
                    <p className="section-subtitle">Real results from real people</p>
                    <div className="grid-3">
                        {testimonials.map((t, i) => (
                            <motion.div key={i} className="testimonial-card" initial="hidden" whileInView="visible" variants={fade} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                                <div className="stars">{[...Array(t.rating)].map((_, si) => <FaStar key={si} />)}</div>
                                <p>"{t.text}"</p>
                                <div className="testimonial-author">
                                    <img src={t.img} alt={t.name} />
                                    <span>{t.name}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="section cta-section">
                <div className="container">
                    <motion.div className="cta-banner" initial="hidden" whileInView="visible" variants={fade} viewport={{ once: true }}>
                        <div className="cta-icon"><FaHeart /></div>
                        <h2>Ready to Transform?</h2>
                        <p>Join thousands of members who have already changed their lives with GymPro.</p>
                        <Link to="/register" className="btn btn-primary btn-lg">Join Now — It's Free to Start <FaArrowRight /></Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
