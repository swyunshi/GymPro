import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaDumbbell, FaFire, FaBolt, FaCheck, FaTimes } from 'react-icons/fa';
import './MembershipPlans.css';

const fade = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const plans = [
    {
        name: 'Basic', price: 999, duration: '1 Month', icon: <FaDumbbell />, color: '#3498db',
        features: ['Gym floor access', 'Locker room', 'Basic equipment', '2 group classes/week', null, null, null, null],
    },
    {
        name: 'Standard', price: 1799, duration: '1 Month', icon: <FaFire />, color: '#FFD700', popular: true,
        features: ['Gym floor access', 'Locker room', 'All equipment', '5 group classes/week', 'Personal trainer 2x/week', 'Diet consultation', null, null],
    },
    {
        name: 'Premium', price: 2999, duration: '1 Month', icon: <FaBolt />, color: '#e74c3c',
        features: ['Gym floor access', 'Locker room', 'All equipment', 'Unlimited group classes', 'Daily personal training', 'Dedicated nutritionist', 'Sauna & steam access', 'Priority booking'],
    },
];

const comparison = [
    { feature: 'Gym Floor Access', basic: true, standard: true, premium: true },
    { feature: 'Locker Room', basic: true, standard: true, premium: true },
    { feature: 'Group Classes', basic: '2/week', standard: '5/week', premium: 'Unlimited' },
    { feature: 'Personal Trainer', basic: false, standard: '2x/week', premium: 'Daily' },
    { feature: 'Diet Consultation', basic: false, standard: true, premium: true },
    { feature: 'Dedicated Nutritionist', basic: false, standard: false, premium: true },
    { feature: 'Sauna & Steam', basic: false, standard: false, premium: true },
    { feature: 'Priority Booking', basic: false, standard: false, premium: true },
];

const MembershipPlans = () => (
    <div className="plans-page">
        <section className="plans-hero">
            <div className="container">
                <motion.div initial="hidden" animate="visible" variants={fade}>
                    <span className="eyebrow">Flexible Membership</span>
                    <h1 className="section-title">Invest in Your Health</h1>
                    <p className="section-subtitle">Choose the plan that fits your goals. No long-term contracts. Cancel anytime.</p>
                </motion.div>
            </div>
        </section>

        {/* Plans */}
        <section className="section">
            <div className="container">
                <div className="plans-grid-full">
                    {plans.map((plan, i) => (
                        <motion.div key={i} className={`plan-full-card ${plan.popular ? 'popular' : ''}`}
                            initial="hidden" whileInView="visible" variants={fade} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                            {plan.popular && <div className="popular-badge">⭐ Most Popular</div>}
                            <div className="plan-header">
                                <div className="plan-icon-lg" style={{ color: plan.color, background: plan.color + '1a' }}>{plan.icon}</div>
                                <div>
                                    <h2>{plan.name}</h2>
                                    <p className="plan-duration">{plan.duration}</p>
                                </div>
                            </div>
                            <div className="plan-price-lg">
                                <span className="currency">₹</span>
                                <span className="amount">{plan.price.toLocaleString()}</span>
                                <span className="per">/month</span>
                            </div>
                            <ul className="plan-features-lg">
                                {plan.features.filter(Boolean).map((f, fi) => (
                                    <li key={fi}><FaCheck className="check-icon" />{f}</li>
                                ))}
                            </ul>
                            <Link to="/register" className={`btn btn-lg ${plan.popular ? 'btn-primary' : 'btn-outline'}`} style={{ justifyContent: 'center' }}>
                                Get {plan.name} Plan
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* Comparison Table */}
        <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="container">
                <h2 className="section-title">Plan Comparison</h2>
                <p className="section-subtitle">See exactly what each plan includes</p>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th style={{ color: '#3498db' }}>Basic</th>
                                <th style={{ color: 'var(--primary)' }}>Standard ⭐</th>
                                <th style={{ color: '#e74c3c' }}>Premium</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparison.map((row, i) => (
                                <tr key={i}>
                                    <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{row.feature}</td>
                                    {['basic', 'standard', 'premium'].map(col => (
                                        <td key={col} style={{ textAlign: 'center' }}>
                                            {typeof row[col] === 'boolean'
                                                ? row[col] ? <FaCheck style={{ color: 'var(--success)' }} /> : <FaTimes style={{ color: 'var(--danger)' }} />
                                                : <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{row[col]}</span>}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ textAlign: 'center', marginTop: 40 }}>
                    <Link to="/register" className="btn btn-primary btn-lg">Start Your Membership Today</Link>
                </div>
            </div>
        </section>
    </div>
);

export default MembershipPlans;
