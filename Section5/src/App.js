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
  
  deleteHandler = (index) => {
    console.log("deleting index: ", {index})
    const updated_persons = this.state.persons.slice()
    updated_persons.splice(index, 1)
    this.setState({persons: updated_persons})
  }

  nameChangeHandler = (event, id) => {
    const person_index = this.state.persons.findIndex(p => {
        return p.id === id
    })
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
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    let className = [];
    if(this.state.persons.length <= 2 ) {
      className.push('red');
    }
    if(this.state.persons.length <= 1) {
      className.push('bold');
    }

    let dynamic_list_persons = null
    if(this.state.showPerson) {
      button_style.backgroundColor = 'red';
      dynamic_list_persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                key={person.id}  // https://fb.me/react-warning-keys
                click={() => this.deleteHandler(index)}
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
      <div className='App'>
        <h1 className={className.join(' ')}>Hello World</h1>
        <p><button style={button_style} onClick={this.togglePersonHandler}>togglePersonHandler</button></p>
        {dynamic_list_persons}
      </div>
    );
  }
}

export default App;
