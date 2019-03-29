import React from 'react';
import cssClasses from './Button.module.css'

const Button = (props) => {
    
    let buttonStyle = [cssClasses.Button, cssClasses[props.buttonType]]

    return (
        <button 
            className={buttonStyle.join(' ')}
            onClick={props.onClick}
            disabled= {props.disabled}
        >
            {/* If I don't call children the text, that is passed as a child, won't be displayed */}
            {props.children}
        </button>
    );
};

export default Button;