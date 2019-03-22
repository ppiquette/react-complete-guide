import React from 'react';
import cssClasses from './Input.css'

const Input = ( props ) => {
    
    let inputElement = null;

    switch(props.inputType) {
        case('input'):
            inputElement = <input className={cssClasses.inputElement} {...props} />
            break;
        case('textarea'):
            inputElement = <textarea className={cssClasses.inputElement} {...props} />
            break;
        default:
            inputElement = <input className={cssClasses.inputElement} {...props} />
    }

    return (
        <div className={cssClasses.Input}>
            <label>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;