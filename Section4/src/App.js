import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  // state is only available since we are extending Component
  state = {
    persons: [
      {id: "id_787", name: "Tom", age: "39"},
      {id: "id_kjh7", name: "Tim", age: "36"},
      {id: "id_kjhiu", name: "Tob", age: "35"},
      {id: "id_ky87", name: "Bobby", age: "65"}
    ],
    showPerson: false
  };
  patate = 0
  
  deleteNameHandler = (index) => {
    console.log("deleting index: ", {index})
    // The slice() with no parameters make sure to copy the state so we dont modify the 
    // original state until calling setState() at the very end. We could also have done: 
    // const updated_persons = [...this.state.person] 
    // that open (spread) the array and then create a new one with the spreaded elements 
    //
    // Finally, we use a "const" here since array are only referenced. We can change its 
    // content without changing the pointer to it.
    const updated_persons = this.state.persons.slice()
    updated_persons.splice(index, 1)
    this.setState({persons: updated_persons})
  }

  nameChangeHandler = (event, id) => {
    const person_index = this.state.persons.findIndex(p => {
        return p.id === id
    })
    // Here again we create a copy to not edit the original in state
    const person = {...this.state.persons[person_index]}
    person.name = event.target.value

    const updated_persons = [...this.state.persons]
    updated_persons[person_index] = person
    this.setState({persons: updated_persons})
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

    // Dynamic version that adjust itself to how many elements there is in the state compare 
    // to Section 3 where we need to have a JSX block for every element of the state.persons array
    let dynamic_list_persons = null
    if(this.state.showPerson) {
      dynamic_list_persons = (
        <div>
              <p>Dynamic version  :</p>

              {/* The "map" function will apply the (anonymous, here) function to each element 
                  in persons. In the arrow function below, person is the argument of the function. 
                  The actual anonymous function has no name. The arguments (an element of the array, 
                  its index in the array) are automatically pass to the function */}
              {this.state.persons.map((person, index) => {
                return (
                  <Person
                    key={person.id}  // https://fb.me/react-warning-keys
                    click={() => this.deleteNameHandler(index)}
                    name={person.name} 
                    age={person.age}
                    changed={(event) => this.nameChangeHandler(event, person.id)}
                  />
                )
              })}
        </div>
      )
    }

    return (
      <div className="App">
        <h1>Hello World</h1>
        <p><button style={button_style} onClick={this.togglePersonHandler}>togglePersonHandler</button></p>
        {dynamic_list_persons}
      </div>
    );
  }
}

export default App;
