import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import cssClasses from './SideDrawer.module.css'
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = (props) => {
    
    let cssSideDrawer = [cssClasses.SideDrawer, cssClasses.Close];
    if(props.show) {
        cssSideDrawer =  [cssClasses.SideDrawer, cssClasses.Open];
    } 

    return (
        <Aux>
            <Backdrop 
                show={props.show}
                backdropClicked={props.backdropClicked}
            />
            <div className={cssSideDrawer.join(' ')}>
                <div className={cssClasses.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems></NavigationItems>
                </nav>
            </div>
        </Aux>
    );
};

export default SideDrawer;