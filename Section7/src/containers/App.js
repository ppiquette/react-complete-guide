
import React, { PureComponent } from 'react';
import app_styles from './App.module.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'
import WithClass from '../components/hoc/WithClass'

class App extends PureComponent {

  constructor(props){
    super(props);
    console.log("[App.js] in constructor", props)
  
    this.state = {
      persons: [
        {id: "id_787", name: "Tom", age: "39"},
        {id: "id_kj7", name: "Tim", age: "36"},
        {id: "id_hiu", name: "Tob", age: "35"},
        {id: "id_k87", name: "Bobby", age: "65"}
      ],
      showPerson: false
    };
  }

  componentWillMount() {
    console.log("[App.js] in componentWillMount")
  }

  componentDidMount() {
    console.log("[App.js] in componentDidMount")
  }

  // NOT required anymore since it is don in the PureComponent we are extending
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("[UPDATE App.js] in shouldComponentUpdate", nextProps, nextState);
  //   return JSON.stringify(this.state) !== JSON.stringify(nextState);
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log("[UPDATE App.js] in componentWillUpdate", nextProps, nextState);
  }

  componentDidUpdate(){
    console.log("[UPDATE App.js] in componentDidUpdate");
  }

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

  showPersonHandler = () => {
    this.setState(
      {showPerson: true}
    )
  }

  render() {
    console.log("[App.js] in render")

    let dynamic_list_persons = null
    if(this.state.showPerson) {
      dynamic_list_persons = (
          <Persons
            persons={this.state.persons}
            clicked={this.deleteHandler}
            changed={this.nameChangeHandler}
          />
      )
    }

    return (
      <WithClass classes={app_styles.App}>
        <button onClick={this.showPersonHandler}>Show Persons</button>

        <Cockpit
          app_title={this.props.title} 
          shown={this.state.showPerson}
          all_persons={this.state.persons}
          togglePersonHandler={this.togglePersonHandler}
        />
        {dynamic_list_persons}
      </WithClass>
    );
  }
}

export default App;
