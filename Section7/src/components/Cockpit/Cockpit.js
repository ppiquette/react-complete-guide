import React from 'react'
import cockpit_styles from './Cockpit.module.css';

const cockpit = (props) => {
    
    let textClasses = [];
    let buttonClass = '';
    
    if(props.shown) {
        buttonClass=cockpit_styles.red
    }

    if(props.all_persons.length <= 2 ) {
        textClasses.push(cockpit_styles.red);
    }
    if(props.all_persons.length <= 1) {
        textClasses.push(cockpit_styles.bold);
    }

    return (
        <div className={cockpit_styles.Cockpit}>
            <h1>Hello World</h1>
            <p className={textClasses.join(' ')}>Text</p>
            <button className={buttonClass} onClick={props.togglePersonHandler}>Show/Hide Persons</button>
        </div>
    );
}

export default cockpit