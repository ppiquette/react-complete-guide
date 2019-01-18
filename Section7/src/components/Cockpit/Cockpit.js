import React from 'react'
import cockpit_styles from './Cockpit.module.css';
import Aux from '../hoc/Aux'

const cockpit = (props) => {
    
    let textClasses = [];
    let buttonClass = cockpit_styles.Button;
    
    if(props.shown) {
        buttonClass=[cockpit_styles.Button, cockpit_styles.Red].join(' ');
    }

    if(props.all_persons.length <= 2 ) {
        textClasses.push(cockpit_styles.red);
    }
    if(props.all_persons.length <= 1) {
        textClasses.push(cockpit_styles.bold);
    }

    return (
        <Aux>
            <h1>{props.app_title}</h1>
            <p className={textClasses.join(' ')}>Some text</p>
            <button className={buttonClass} onClick={props.togglePersonHandler}>Show/Hide Persons</button>
            <button onClick={props.loginFct}>Login</button>
        </Aux>
    );
}

export default cockpit