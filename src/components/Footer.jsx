import { Link } from 'react-router-dom';
import { FaDumbbell, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <FaDumbbell />
                            <span>GymPro</span>
                        </div>
                        <p>Transform your body, transform your life. We provide world-class fitness facilities and expert training to help you reach your goals.</p>
                        <div className="footer-socials">
                            <a href="#" aria-label="Facebook"><FaFacebook /></a>
                            <a href="#" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" aria-label="YouTube"><FaYoutube /></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/membership">Membership Plans</Link></li>
                            <li><Link to="/trainers">Our Trainers</Link></li>
                            <li><Link to="/gallery">Gallery</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Membership</h4>
                        <ul>
                            <li><Link to="/membership">Basic Plan</Link></li>
                            <li><Link to="/membership">Standard Plan</Link></li>
                            <li><Link to="/membership">Premium Plan</Link></li>
                            <li><Link to="/register">Join Now</Link></li>
                            <li><Link to="/login">Member Login</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Contact Info</h4>
                        <ul className="footer-contact">
                            <li><FaMapMarkerAlt /><span>123 Fitness Street, Gym City, GC 400001</span></li>
                            <li><FaPhone /><span>+91 98765 43210</span></li>
                            <li><FaEnvelope /><span>info@gympro.com</span></li>
                        </ul>
                        <div className="footer-hours">
                            <h5>Opening Hours</h5>
                            <p>Mon – Fri: 5:00 AM – 11:00 PM</p>
                            <p>Sat – Sun: 6:00 AM – 10:00 PM</p>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} GymPro. All rights reserved.</p>
                    <p>Built with ❤️ for fitness enthusiasts</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
