import React from 'react';
import cssClasses from './DrawerToggle.module.css'

const DrawerToggle = (props) => {
    return (
        <div className={cssClasses.DrawerToggle} onClick={props.menuClicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default DrawerToggle;