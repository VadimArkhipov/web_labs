import React from 'react';
import "./navbar-component.css"
import { NavLink } from "react-router-dom";

const NavbarComponent = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="navbar-wrap">
                    <ul className="navbar-menu">
                        <li><NavLink to="/settings">Торги</NavLink></li>
                        <li><NavLink to="/" end>Акции</NavLink></li>
                        <li><NavLink to="/brokers">Брокеры</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;