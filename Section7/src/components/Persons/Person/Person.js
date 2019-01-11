import React, { Component } from 'react'
import person_style from './Person.module.css';

class Person extends Component {

    constructor(props){
        super(props);
        console.log("[Person.js] in constructor", props)
      }
    
    componentWillMount() {
        console.log("[Person.js] in componentWillMount")
    }
    
    componentDidMount() {
        console.log("[Person.js] in componentDidMount")
    }

    componentWillUnmount() {
        // Component is about to get removed => Perform any cleanup work here!
        console.log("[Person.js] in componentWillUnmount");
    }

    render() {
      console.log("[Person.js] in render")

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

