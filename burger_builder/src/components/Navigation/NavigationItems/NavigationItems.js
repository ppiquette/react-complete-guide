import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import cssClasses from './NavigationItems.module.css'

const NavigationItems = (props) => {
    return (
        <ul className={cssClasses.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/checkout">Checkout</NavigationItem>
        </ul>
    );
};

export default NavigationItems;