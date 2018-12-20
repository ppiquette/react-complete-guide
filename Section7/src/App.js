
import React, { Component } from 'react';
import app_styles from './App.module.css';
import Person from './Person/Person'

class App extends Component {
  // state is only available since we are extending Component
  state = {
    persons: [
      {id: "id_787", name: "Tom", age: "39"},
      {id: "id_kj7", name: "Tim", age: "36"},
      {id: "id_hiu", name: "Tob", age: "35"},
      {id: "id_k87", name: "Bobby", age: "65"}
    ],
    showPerson: false
  };
  
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

    const updated_persons = [...this.state.persons]
    updated_persons[person_index].name = event.target.value
    this.setState({persons: updated_persons})
  }

  togglePersonHandler = (event) => {
    this.setState(
      {showPerson: !this.state.showPerson}
    )
  }

  render() {
    let appClasses = [];
    let buttonClass = '';
    
    if(this.state.persons.length <= 2 ) {
      appClasses.push(app_styles.red);
    }
    if(this.state.persons.length <= 1) {
      appClasses.push(app_styles.bold);
    }

    let dynamic_list_persons = null
    if(this.state.showPerson) {
      dynamic_list_persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                key={person.id}
                click={() => this.deleteHandler(index)}
                name={person.name} 
                age={person.age}
                changed={(event) => this.nameChangeHandler(event, person.id)}
              />
            )
          })}
        </div>
      )
      buttonClass = app_styles.Red
    }

    return (
      <div className={app_styles.App}>
        <h1>Hello World</h1>
        <p className={appClasses.join(' ')}>Text</p>
        <button className={buttonClass} onClick={this.togglePersonHandler}>Show/Hide Persons</button>
        {dynamic_list_persons}
      </div>
    );
  }
}

export default App;
