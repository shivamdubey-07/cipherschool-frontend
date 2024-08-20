import { useState } from 'react';
import axios from 'axios';
import './Auth.css'; // Import the CSS for styling
import ReactLoading from 'react-loading';


const Signup = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [loading,setLoading]=useState(false)

    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post('http://localhost:5000/api/signup', { name,email, password });
            console.log(response.data);
        } catch (error) {
           
            console.error(error);
        }finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
        {loading && (
            <div className="loading-overlay">
                <ReactLoading type='spin' height='50px' width='50px' color='black' />
            </div>
        )}
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
            <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Signup;
