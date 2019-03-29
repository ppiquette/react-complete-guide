import React from 'react';
import cssClasses from './Backdrop.module.css'


const Backdrop = (props) => {
    return (
        props.show ? <div className={cssClasses.Backdrop} onClick={props.backdropClicked}></div> : null
    );
};

export default Backdrop;