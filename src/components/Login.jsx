import axios from 'axios';
import { useState } from 'react';
import './Auth.css'; 
import {useNavigate} from "react-router-dom"

import ReactLoading from 'react-loading';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password }, { withCredentials: true });
            if(response.status === 200){
                navigate("/start");
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
        } finally {
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
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
            <p>Don&apos;t have an account? <a href="/signup">Sign Up</a></p>
        </div>
    );
};

export default Login;
