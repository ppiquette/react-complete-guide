import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  // state is only available since we are extending Component
  state = {
    persons: [
      {name: "Tom", age: "39"},
      {name: "Tim", age: "36"},
      {name: "Tob", age: "35"}
    ]
  };
  patate = 0
  
  staticSwitchNameHandler = () => {
    // console.log("was clicked");
    this.setState({
      persons: [
        {name: "Billy", age: "39"},
        {name: "Timi", age: "36"},
        {name: "Tobi", age: "35"}
      ]
    })
  }
  
  switchNameHandler = (new_name) => {
    // console.log("was clicked");
    this.setState({
      persons: [
        {name: new_name, age: "39"},
        {name: "Timi", age: "36"},
        {name: "Tobi", age: "35"}
      ]
    })
  }
  
  // This function works with the event that is being automatically sent by the onChange in Person
  nameChangeHandler = (patate) => {
    // console.log("was clicked");
    this.setState({
      persons: [
        {name: "Tom", age: "39"},
        {name: patate.target.value, age: "36"},
        {name: "Tobi", age: "35"}
      ]
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Hello World</h1>
        <p>It really works</p>

        {/* pass the function name to the onClick parameter. If we pass the function name with ending () it gets executed on render, not just on click */}
        <button onClick={this.staticSwitchNameHandler}>Set to value in function</button>
        {/* now we have a parameter to the function pass to the Person component, see below for more details*/}
        <button onClick={this.switchNameHandler.bind(this, 'Tommy')}>Set to value in function's parameter</button>

        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age}
          // The Bind function is one of the 2 ways to pass a function **with parameters** to another component. From the doc:
          // For a given function, creates a bound function that has the same body as the original function. The this object of 
          // the bound function is associated with the specified object, and has the specified initial parameters.
          click={this.switchNameHandler.bind(this, 'Tomi')}
        />
        <Person  
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          // here the Person component is the one responsible to feed the function declare here (the current parent class) to whatever it needs
          changed={this.nameChangeHandler}
        />
        <Person  
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age}
          // The arrow function is the second notation to pass a function **with parameters** to another component. It seems 
          // that it sometime generate unwanted render call though. Bind should be prefered
          click={() => this.switchNameHandler('Tomi')}
        />
      </div>
    );
  }
}

export default App;
