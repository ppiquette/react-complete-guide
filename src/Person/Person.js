import React from 'react'

const person = (props) => {
    
    console.log("Person", props.name, "updated")
    return (
        <div>
            <p onClick={props.click}>I'm a {props.name} of {props.age}!!!</p>
            <p>{props.children}</p>
            {/* The required event for the function "nameChangeHandler" contained in the onChange keyword is automatically sent to the function*/}
            <input type="Text" onChange={props.changed}/>
        </div>        
    )
}

export default person

