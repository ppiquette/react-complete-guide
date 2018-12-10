
import React from 'react';
import './UserInput.css';

const userinput = (props) => {
    return(
        <div className='UserInput'>
            <input type='Text' onChange={props.input_change} value={props.initial} size='70'/>
        </div>
    ); 
}

export default userinput
