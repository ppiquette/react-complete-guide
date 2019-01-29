import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png'
import cssClasses from './Logo.module.css'

const Logo = (props) => {
    return (
        <div className={cssClasses.Logo}>
            <img src={burgerLogo} alt="MyBurger"></img>
        </div>
    );
};

export default Logo;