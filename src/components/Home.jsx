import { Link } from 'react-router-dom';
import './Home.css'
const Home = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <img 
                    
                    src="HomeImg.jpg" 
                    alt="Hero" 
                    className="hero-image"
                />
                <div className="hero-text">
                    <h1>Welcome to TaskMaster</h1>
                    <p>Your ultimate tool for managing tasks with ease.</p>
                    <div className="home-buttons">
                        <Link to="/login" className="btn primary-btn">Login</Link>
                        <Link to="/signup" className="btn secondary-btn">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
