import React from 'react';
import cssClass from './NoFound.module.css'

const NoFound = () => {
    return (
        <div className={cssClass.NoFound}>
            <p>Path not found</p>
        </div>
    );
};

export default NoFound;