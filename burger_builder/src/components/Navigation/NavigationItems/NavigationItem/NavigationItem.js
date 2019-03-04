import React from 'react';
import cssClasses from './NavigationItem.module.css'
import {Link} from 'react-router-dom'


const NavigationItem = (props) => {
    return (
        <li className={cssClasses.NavigationItem}>
            <Link 
                to={props.link}
                className={props.active ? cssClasses.active : null}
            >
                {props.children}
            </Link>

            {/* <a 
                href={props.link}
                className={props.active ? cssClasses.active : null}
            >{props.children}</a> */}
        </li>
    );
};

export default NavigationItem;