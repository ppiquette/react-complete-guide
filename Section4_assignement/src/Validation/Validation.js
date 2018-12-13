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
        <p>{output}</p>
    )
}

export default Validation
