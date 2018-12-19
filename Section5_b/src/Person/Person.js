import React from 'react'
import './Person.css';
import Radium from 'radium'

const person = (props) => {
    
    console.log("Person", props.name, "updated")
    const my_style = {
        '@media (min-width: 500px)': {
            width: '450px'
        }
    }

    return (
        <div className="Person" style={my_style}>
            <p onClick={props.click}>I'm a {props.name} of {props.age}!!!</p>
            <input type="Text" onChange={props.changed} value={props.name} />
            {props.children}
        </div>        
    )
}

export default Radium(person)

