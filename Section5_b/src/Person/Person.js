import React from 'react'
import './Person.css';

const person = (props) => {
    
    console.log("Person", props.name, "updated")

    return (
        <div className="Person">
            <p onClick={props.click}>I'm a {props.name} of {props.age}!!!</p>
            <input type="Text" onChange={props.changed} value={props.name} />
            {props.children}
        </div>        
    )
}

export default person

