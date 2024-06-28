import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import axios from 'axios';

function UserDashboard({ login, getLoginId }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [isLogin, setIsLogin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // No need to store userId in state, you can directly use it
    // const [userId, setUserId] = useState(null);

    const handleOnChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/signup';
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            const data = response.data;
            
            alert(data.message);
    
                localStorage.setItem('userId', data.userId);
                setIsLoggedIn(true);
                login(true);
                console.log('Login ID:',data.userId);
                getLoginId(data.userId)
    
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred, please try again.');
        }
    };
    

    const toggleForm = () => {
        setIsLogin(prev => !prev);
        setFormData({ username: "", password: "" });
    };

    return (
        <div className='vh-100' style={{ background: 'linear-gradient(to bottom, #3498db, #9b59b6)' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 t-25">
                        <div className="card m-5 rounded-4">
                            <div className="mt-5">
                                <h3 className="text-center">{isLogin ? 'Login' : 'Sign-up'}</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-2 m-5">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" onChange={handleOnChange} value={formData.username} className="form-control border-0 border-bottom" id="username" placeholder="" />
                                    </div>
                                    <div className="mb-2 m-5">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" onChange={handleOnChange} value={formData.password} className="form-control border-0 border-bottom" id="password" placeholder="" />
                                    </div>
                                    <center className='m-4'>
                                        <button type="submit" className="btn btn-primary btn-block w-100 mt-4 mb-4 rounded-5" style={{ background: 'linear-gradient(to bottom, #3498db, #9b59b6)' }}>{isLogin ? 'Login' : 'Sign-up'}</button>
                                        <p className="text-center">{isLogin ? 'New User? ' : 'Already have an account? '}
                                            <button type="button" className="btn btn-link" onClick={toggleForm}>{isLogin ? 'Sign-up' : 'Login'}</button>
                                        </p>
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
