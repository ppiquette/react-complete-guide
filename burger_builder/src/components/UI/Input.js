import React from 'react';
import cssClasses from './Input.module.css'

const Input = ( props ) => {
    
    let cssClassesInputElements = [cssClasses.InputElement]
    if(props.invalid && props.touched){
        cssClassesInputElements.push(cssClasses.InputNotValid)
    }

    let inputElement = null;
    switch(props.elementtype) {
        case('input'):
            inputElement = <input className={cssClassesInputElements.join(' ')} {...props.elementconfig} value={props.value} onChange={props.onChange}/>
            break;
        case('textarea'):
            inputElement = <textarea className={cssClasses.InputElement} {...props.elementconfig} value={props.value} onChange={props.onChange}/>
            break;
        case('select'):
            inputElement = (
                <select 
                    className={cssClasses.InputElement} 
                    value={props.value}
                    onChange={props.onChange}
                >
                    {props.elementconfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))} 
                </select>
            )
            break;
        default:
            inputElement = <input className={cssClasses.InputElement} {...props.elementconfig} value={props.value} onChange={props.onChange}/>
    }

    return (
        <div className={cssClasses.Input}>
            <label className={cssClasses.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;