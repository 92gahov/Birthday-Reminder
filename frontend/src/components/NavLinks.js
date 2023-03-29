import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavLinks = ({ close }) => {

    const animateFrom = { opacity: 0, y: -40 };
    const animateTo = { opacity: 1, y: 0 };

    return (
        <nav className='links'>
            <ul>
                <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.10 }}>
                    <Link to="/" onClick={close}>Home</Link>
                </motion.li>
                <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.20 }}>
                    <Link to="/new" onClick={close}>New</Link>
                </motion.li>
                <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.30 }}>
                    <Link to="/all" onClick={close}>All</Link>
                </motion.li>
            </ul>
        </nav>
    )
};

export default NavLinks;