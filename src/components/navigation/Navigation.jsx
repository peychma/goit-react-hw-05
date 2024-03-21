import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from "classnames";
import css from "./Navigation.module.css";

const Navigation = () => {
    const getActiveLink = ({ isActive }) =>
        clsx(css.link, {
            [css.active]: isActive,
        });

    return (
        <div>
            <header className={css.navigation}>
                <NavLink to="/" className={getActiveLink}>Home</NavLink>
                <NavLink to="/movies" className={getActiveLink}>Movies</NavLink>
            </header>
        </div>
    );
}

export default Navigation;
