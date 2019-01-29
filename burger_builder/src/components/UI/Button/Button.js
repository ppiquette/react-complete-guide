import React from 'react';
import cssClasses from './Button.module.css'

const Button = (props) => {
    return (
        <button 
            className={[cssClasses.Button, cssClasses[props.buttonType]].join(' ')}
            onClick={props.onClick}>
            {/* If I don't call children the text, that I now understand is passed as 
                a child, won't be displayed */}
            {props.children}
        </button>
    );
};

export default Button;