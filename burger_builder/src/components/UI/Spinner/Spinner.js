import React from 'react';
import cssClasses from './Spinner.module.css'

const Spinner = () => {
    return (
        <div className={cssClasses.loader}>Loading...</div>
    );
};

export default Spinner;