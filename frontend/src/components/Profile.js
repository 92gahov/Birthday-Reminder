import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useLogout } from '../hooks/useLogout';

const Profile = () => {

    const { user } = useContext(AuthContext);
    const { logout } = useLogout();

    const handleClick = () => {
        logout();
    };

    return (
        <section className='profile'>
            <div>
                <p>{user.name}</p>
            </div>
            <div>
                <button onClick={handleClick}>Logout</button>
            </div>
        </section>
    )
};

export default Profile;