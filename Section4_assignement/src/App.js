import React, { Component } from 'react';
import Validation from './Validation/Validation'
import './App.css';

class App extends Component {

  state = {
    txt: ""
  }

  changeHandler = (event) => {
    this.setState({txt: event.target.value})
  }
  
  render() {
    return (
      <div className="App">

        <input onChange={this.changeHandler}></input>
        <p>{this.state.txt.length}</p>
        <Validation length={this.state.txt.length}/>



        <ol>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
      </div>
    );
  }
}

export default App;
