import React, { useState } from 'react';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const [matchPsw, setMatchPsw] = useState(true);
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordTwo) {
            setMatchPsw(false);
            return;
        } else {
            setMatchPsw(true);
            await signup(name, email, password);
        }
    }

    return (
        <>
            <section>
                <div className='signup'>
                    <h3>Sign Up</h3>
                    <form onSubmit={handleSubmit}>
                        <p>Name:</p>
                        <input type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name} />
                        <p>Email:</p>
                        <input type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} />
                        <p>Password:</p>
                        <input type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} />
                        <p>Confirm password:</p>
                        <input type="password"
                            onChange={(e) => setPasswordTwo(e.target.value)}
                            value={passwordTwo} />
                        <div className='sign-btn'>
                            <button type='submit'>Sign up</button>
                        </div>
                        <div className='login-btn'>
                            <div>
                                <p>Already have an account?</p>
                            </div>
                            <div>
                                <Link to='/login'>
                                    <button>Log in</button>
                                </Link>
                            </div>
                        </div>
                        {
                            matchPsw === false ? <p style={{ textAlign: 'center', marginTop: '8px', color: 'red' }}>Passwords do not match!</p> :
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

export default Signup;