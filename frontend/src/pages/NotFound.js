import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

function NotFound() {

    const { user } = useContext(AuthContext);

    return (
        <div className='not-found'>
            <h2>404</h2>
            <h3>Not Found!</h3>
            {
                user ? <Link to="/">Home</Link> : <Link to="/login">Login</Link>
            }
        </div>
    )
}

export default NotFound