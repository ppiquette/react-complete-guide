
import React, { PureComponent } from 'react';
import app_styles from './App.module.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'
// import WithClass from '../components/hoc/WithClass'
import compWrapperWithClass from '../components/hoc/compWrapperWithClass'

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
      showPerson: false,
      toggleCounter: 0
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

    // Here there is 2 ways of preventing race codition on the asynchronous setState function. First,
    // save the value of state.showPerson into a local variable and use it in setState(). Second, pass 
    // a function to setState with the prevState being "magically" filled by React. 
    // From the web: 
    //   If you pass a function as the first argument of setState, React will call it with the 
    //   at-call-time-current state and expect you to return an Object to merge into state. 
    const doesShow = this.state.showPerson;
    this.setState((prevState, props) => {
      return {
        showPerson: !doesShow,
        toggleCounter: prevState.toggleCounter + 1
      }
    })
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

      // This commented code was using the WithClass functional component to wrap the elements
      // into one div and passing the style. The code is now replaced by the component wrapper
      // compWrapperWithClass that is set in the export statement at the end of this file

      // <WithClass classes={app_styles.App}>
      //   <button onClick={this.showPersonHandler}>Show Persons</button>

      //   <Cockpit
      //     app_title={this.props.title} 
      //     shown={this.state.showPerson}
      //     all_persons={this.state.persons}
      //     togglePersonHandler={this.togglePersonHandler}
      //   />
      //   {dynamic_list_persons}
      // </WithClass>

      <>

        <p> {this.state.toggleCounter} </p>

        <button onClick={this.showPersonHandler}>Show Persons</button>

        <Cockpit
          app_title={this.props.title} 
          shown={this.state.showPerson}
          all_persons={this.state.persons}
          togglePersonHandler={this.togglePersonHandler}
        />
        {dynamic_list_persons}
      </>
    );
  }
}

export default compWrapperWithClass(App, app_styles.App);
