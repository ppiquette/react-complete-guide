import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
  
  constructor(props){
    super(props);
    console.log("[Persons.js] in constructor", props)
  }

  componentWillMount() {
    console.log("[CREATE Persons.js] in componentWillMount")
  }

  componentDidMount() {
    console.log("[CREATE Persons.js] in componentDidMount")
  }

  componentWillUnmount() {
    console.log("[CREATE Persons.js] in componentWillUnmount");
  }

  componentWillReceiveProps(nextProps) {
    console.log("[UPDATE Persons.js] in componentWillReceiveProps", nextProps);
  }

  // NOT required anymore since it is don in the PureComponent we are extending
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("[UPDATE Persons.js] in shouldComponentUpdate", nextProps, nextState);
  //   return nextProps.persons !== this.props.persons
  //   // return true;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log("[UPDATE Persons.js] in componentWillUpdate", nextProps, nextState);
  }

  componentDidUpdate(){
    console.log("[UPDATE Persons.js] in componentDidUpdate");
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