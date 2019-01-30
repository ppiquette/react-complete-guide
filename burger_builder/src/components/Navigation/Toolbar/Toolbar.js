import React from 'react';
import cssClasses from './Toolbar.module.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => {
    return (
        <header className={cssClasses.Toolbar}>
            <div onClick={props.menuClicked}>MENU</div>

            <div className={[cssClasses.Logo, cssClasses.DesktopOnly].join(' ')}>
                <Logo />
            </div>
               
            <nav className={cssClasses.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </header>
    );
};

export default Toolbar;