import React from 'react';
import './Char.css'

const Char = (props) => {
    console.log("Char updated")
    return(
        <div className='char' onClick={props.delete}>
            <p>{props.char}</p>
            {props.children}
        </div>

    )
}

export default Char

