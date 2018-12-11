import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  // state is only available since we are extending Component
  state = {
    persons: [
      {name: "Tom", age: "39"},
      {name: "Tim", age: "36"},
      {name: "Tob", age: "35"},
      {name: "Bobby", age: "65"}
    ],
    showPerson: false
  };
  patate = 0
  
  switchNameHandler = (new_name) => {
    this.setState({
      persons: [
        {name: new_name, age: "39"},
        {name: "Timi", age: "36"},
        {name: "Tobi", age: "35"}
      ]
    })
  }
  
  nameInputChangeHandler = (event) => {
    this.setState({
      persons: [
        {name: "Tom", age: "39"},
        {name: event.target.value, age: "36"},
        {name: "Tobi", age: "35"}
      ]
    })
  }

  togglePersonHandler = (event) => {
    this.setState(
      {showPerson: !this.state.showPerson}
    )
  }


  render() {
    const button_style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }
    
    // Static list of 3 persons that correspond top the 3 first entries we have in the 
    // state.persons array. It is static since it needs to match the number of entries in state
    let static_list_persons = null
    if (this.state.showPerson) {
      static_list_persons = (
        <div>
          <Person 
            name={this.state.persons[0].name} 
            age={this.state.persons[0].age}
            click={this.switchNameHandler.bind(this, 'Tomi')}>

            {/* Creating a "child" */}
            <Person  
              name={this.state.persons[1].name} 
              age={this.state.persons[1].age}
              changed={this.nameInputChangeHandler}
            />
          </Person>

          <Person  
            name={this.state.persons[2].name} 
            age={this.state.persons[2].age}
          />
        </div>
      )
    }

    // Dynamic version that adjust itself to how many elements there is in the state
    let dynamic_list_persons = (
        <div>
          <p>... and the dynamic version below:</p>

          {/* The "map" function will apply the (anonymous, here) function to each element 
              in persons. In the arrow function below, person is the argument of the function. 
              The actual anonymous function has no name. */}
          {this.state.persons.map(person => {
            return (
              <div>
                <Person
                  name={person.name} 
                  age={person.age}
                />
              </div>
            )
          })}
        </div>
      )


    return (
      <div className="App">
        <h1>Hello World</h1>
        <p><button style={button_style} onClick={this.togglePersonHandler}>togglePersonHandler</button></p>
        {static_list_persons}

        {dynamic_list_persons}
      </div>
    );
  }
}

export default App;
