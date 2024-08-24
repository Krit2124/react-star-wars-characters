import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../assets/Logo.png';

const Header = () => {
    return (
        <div className='flex-row-sb-c container'>
            <div>
                <img src={logo} alt="logo" />
            </div>

            <div className='flex-row-sb-c flex-gap-73'>
                <NavLink to="/" className='header-link color-white'>
                    <p>Home</p>
                </NavLink>

                <NavLink to="/characters" className='header-link color-white'>
                    <p>Characters</p>
                </NavLink>
            </div>
        </div>
    );
};

export default Header;