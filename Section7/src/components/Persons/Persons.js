import React, { Component } from 'react';
import Person from './Person/Person';


class Persons extends Component {
  
  constructor(props){
    super(props);
    console.log("[Persons.js] in constructor", props)
  }

  componentWillMount() {
    console.log("[Persons.js] in componentWillMount")
  }

  componentDidMount() {
    console.log("[Persons.js] in componentDidMount")
  }

  componentWillUnmount() {
    // Component is about to get removed => Perform any cleanup work here!
    console.log("[Persons.js] in componentWillUnmount");
}
  render() {

    console.log("[Persons.js] in render")

    return(this.props.persons.map((person, index) => {
        return (
          <Person
            key={person.id}
            click={() => this.props.clicked(index)}
            name={person.name} 
            age={person.age}
            changed={(event) => this.props.changed(event, person.id)}
          />
        )
      }))
    }
  }

export default Persons;