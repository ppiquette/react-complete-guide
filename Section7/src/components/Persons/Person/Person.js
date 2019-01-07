import React, { Component } from 'react'
import person_style from './Person.module.css';

class Person extends Component {

    render() {
        console.log("Person", this.props.name, "updated")

        return (
            <div className={person_style.Person}>
                <p onClick={this.props.click}>I'm a {this.props.name} of {this.props.age}!!!</p>
                <input type="Text" onChange={this.props.changed} value={this.props.name} />
                {this.props.children}
            </div>        
        )
    }
}

export default Person

