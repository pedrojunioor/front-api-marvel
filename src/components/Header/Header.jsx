import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <Link to="/">LOGO</Link>
            </div>
            <div className="input-busca">
                <input type="text" className="text" />
            </div>
            <div className="user-area">
                <div>
                    <Link to="/Cart">CART</Link>
                </div>
            </div>
        </div>

    )
}

export default Header