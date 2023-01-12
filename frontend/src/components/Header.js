import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { Spin as Hamburger } from 'hamburger-react';
import NavLinks from './NavLinks';

const Header = () => {

    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const close = () => {
        setOpen(false);
    };

    return (
        <>
            <header className='header'>
                <div>
                    <h1>Birthday Reminder</h1>
                </div>
                {
                    user && <div>
                        <Hamburger size={44} toggled={open} toggle={setOpen} />
                    </div>
                }
            </header>
            {
                open && <NavLinks close={close} />
            }
        </>
    )
};

export default Header;