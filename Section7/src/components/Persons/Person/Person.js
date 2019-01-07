import React from 'react'
import person_style from './Person.module.css';

const person = (props) => {
    
    console.log("Person", props.name, "updated")

    return (
        <div className={person_style.Person}>
            <p onClick={props.click}>I'm a {props.name} of {props.age}!!!</p>
            <input type="Text" onChange={props.changed} value={props.name} />
            {props.children}
        </div>        
    )
}

export default person

