import React from 'react';
import cssClasses from './Toolbar.module.css'
import Logo from '../../Logo/Logo';

const Toolbar = () => {
    return (
        <header className={cssClasses.Toolbar}>
            <div>MENU</div>
            <Logo/>
            <nav>
                ...
            </nav>
        </header>
    );
};

export default Toolbar;