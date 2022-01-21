import React, { useContext, useState } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { Context } from '../../context/ComicsContext';


const Header = () => {

    const { search, handleSearch, getComicsPagedwithFilter } = useContext(Context);
    
    

    return (
        <div className="header">
            <div className="logo">
                <Link to="/">
                    <img src='data:image/png;base64,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' alt="" />
                </Link>
            </div>
            <div className="input-busca">
                <input
                    type="text"
                    className="text"
                    value={search}
                    placeholder="Busque por titulo"
                    onChange={e => handleSearch(e.target.value)} />
                <button
                    onClick={getComicsPagedwithFilter}
                >Buscar</button>
            </div>
            <div className="user-area">
                <div>
                    <Link to="/Cart">
                        <img src='../../assets/' alt="" />
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default Header