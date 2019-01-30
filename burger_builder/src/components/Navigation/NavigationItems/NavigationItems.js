import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import cssClasses from './NavigationItems.module.css'

const NavigationItems = () => {
    return (
        <ul className={cssClasses.NavigationItems}>
            <NavigationItem link="/" active>Burger Builder</NavigationItem>
            <NavigationItem link="/">Checkout</NavigationItem>
        </ul>
    );
};

export default NavigationItems;