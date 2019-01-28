import React from 'react';
import cssClasses from './Modal.module.css'

const Modal = (props) => {
    return (
        <div className={cssClasses.Modal}>
            {props.children}
        </div>
    );
};

export default Modal;