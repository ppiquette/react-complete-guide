import React from 'react';

const Validation = (props) => {
    let output = "just right"
    if(props.length < 5){
        output = "string too short"
    }
    else if(props.length > 10) {
        output = "string too long"
    }

    return(
        <div>
            <p>{output}</p>
            {props.children}
        </div>
    )
}

export default Validation
