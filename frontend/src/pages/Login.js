import React, { useState } from 'react';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <>
            <section>
                <div className='login'>
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit}>
                        <p>Email:</p>
                        <input type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} />
                        <p>Password:</p>
                        <input type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} />
                        <div className='log-btn'>
                            <button type='submit'>Log in</button>
                        </div>
                        <div className='signup-btn'>
                            <div>
                                <p>Don't have an account?</p>
                            </div>
                            <div>
                                <Link to='/signup'>
                                    <button>Sign Up</button>
                                </Link>
                            </div>
                        </div>
                        {
                            error && <p style={{ textAlign: 'center', marginTop: '8px', color: 'red' }}>{error}</p>
                        }
                    </form>
                </div>
            </section>
            {
                isLoading && <Loader />
            }
        </>
    )
};

export default Login;