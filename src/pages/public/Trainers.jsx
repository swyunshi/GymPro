import { motion } from 'framer-motion';
import { FaStar, FaInstagram } from 'react-icons/fa';
import './Trainers.css';

const fade = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const trainers = [
    { id: 1, name: 'Raj Sharma', role: 'Head Strength Coach', exp: '8 Years', spec: ['Powerlifting', 'Bodybuilding', 'Olympic Lifting'], bio: 'National-level powerlifter turned coach. Raj has helped over 200 members build serious strength and muscle.', img: 'https://i.pravatar.cc/300?img=11', rating: 5, schedule: { Mon: '9AM-1PM', Wed: '9AM-1PM', Fri: '9AM-1PM', Sat: '10AM-2PM' } },
    { id: 2, name: 'Priya Patel', role: 'Yoga & Wellness Expert', exp: '6 Years', spec: ['Hatha Yoga', 'Meditation', 'Flexibility Training'], bio: 'Certified yoga instructor from Rishikesh. Priya helps members find balance between strength and serenity.', img: 'https://i.pravatar.cc/300?img=23', rating: 5, schedule: { Tue: '7AM-11AM', Thu: '7AM-11AM', Sat: '8AM-12PM', Sun: '9AM-1PM' } },
    { id: 3, name: 'Arjun Singh', role: 'Cardio & HIIT Coach', exp: '10 Years', spec: ['HIIT', 'Running Coaching', 'Cycling'], bio: 'Former marathon runner with 10+ years of coaching experience. Arjun specializes in fat loss and endurance.', img: 'https://i.pravatar.cc/300?img=15', rating: 5, schedule: { Mon: '5AM-9AM', Wed: '5AM-9AM', Fri: '5AM-9AM', Sun: '6AM-10AM' } },
    { id: 4, name: 'Neha Kapoor', role: 'Nutrition & Wellness Coach', exp: '5 Years', spec: ['Sports Nutrition', 'Weight Management', 'Meal Planning'], bio: 'Certified sports nutritionist helping athletes and everyday members optimize their diet for peak performance.', img: 'https://i.pravatar.cc/300?img=47', rating: 5, schedule: { Tue: '10AM-2PM', Thu: '10AM-2PM', Fri: '2PM-6PM', Sat: '10AM-2PM' } },
    { id: 5, name: 'Vikram Bose', role: 'CrossFit & Functional Coach', exp: '7 Years', spec: ['CrossFit', 'Functional Training', 'Calisthenics'], bio: 'Level 3 CrossFit certified. Vikram builds athletes who can do anything, anywhere.', img: 'https://i.pravatar.cc/300?img=12', rating: 5, schedule: { Mon: '6PM-9PM', Wed: '6PM-9PM', Fri: '6PM-9PM', Sat: '3PM-6PM' } },
    { id: 6, name: 'Aisha Khan', role: 'Zumba & Dance Fitness', exp: '4 Years', spec: ['Zumba', 'Aerobics', 'Dance Cardio'], bio: 'Certified Zumba instructor with infectious energy. Aisha makes every workout feel like a celebration.', img: 'https://i.pravatar.cc/300?img=48', rating: 5, schedule: { Tue: '6PM-9PM', Thu: '6PM-9PM', Sat: '4PM-7PM', Sun: '10AM-1PM' } },
];

const Trainers = () => (
    <div className="trainers-page">
        <section className="trainers-hero">
            <div className="container">
                <motion.div initial="hidden" animate="visible" variants={fade}>
                    <span className="eyebrow">Expert Team</span>
                    <h1 className="section-title">Your Coaches, Your Champions</h1>
                    <p className="section-subtitle">Every trainer at GymPro is certified, experienced, and passionate about getting you results.</p>
                </motion.div>
            </div>
        </section>

        <section className="section">
            <div className="container">
                <div className="trainers-full-grid">
                    {trainers.map((t, i) => (
                        <motion.div key={t.id} className="trainer-full-card"
                            initial="hidden" whileInView="visible" variants={fade} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.15 }}>
                            <div className="trainer-img-wrap">
                                <img src={t.img} alt={t.name} />
                                <div className="trainer-img-overlay">
                                    <FaInstagram />
                                </div>
                            </div>
                            <div className="trainer-info">
                                <div className="trainer-header">
                                    <div>
                                        <h3>{t.name}</h3>
                                        <p className="trainer-role">{t.role}</p>
                                    </div>
                                    <div className="trainer-rating">
                                        <FaStar />
                                        <span>{t.rating}.0</span>
                                    </div>
                                </div>
                                <span className="badge badge-gold">{t.exp} Experience</span>
                                <p className="trainer-bio">{t.bio}</p>
                                <div className="trainer-specs">
                                    {t.spec.map((s, si) => <span key={si} className="spec-tag">{s}</span>)}
                                </div>
                                <div className="trainer-schedule">
                                    <h4>Schedule</h4>
                                    <div className="schedule-grid">
                                        {Object.entries(t.schedule).map(([day, time]) => (
                                            <div key={day} className="schedule-item">
                                                <span className="day">{day}</span>
                                                <span className="time">{time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    </div>
);

export default Trainers;
