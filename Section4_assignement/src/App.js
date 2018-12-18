import React, { Component } from 'react';
import Validation from './Validation/Validation'
import './App.css';
import Char from './Char/Char.js';

class App extends Component {

  state = {
    txt: "allo patate"
  }

  changeHandler = (event) => {
    this.setState({txt: event.target.value});
  }

  deleteHandler = (index) => {
    console.log("Delete: ", index, this.state.txt)
    const str = [...this.state.txt];
    str.splice(index, 1);
    console.log(str)
    this.setState({txt: str.join("")});
  }


  render() {
  
    let allChars = (
      this.state.txt.split("").map((one_char, index) => {
        return(
          <Char 
            key={index}
            delete={() => this.deleteHandler(index)}
            char={one_char}>
          </Char>
        )
      })
    )
  
    return (
      <div className="App">
        <input onChange={this.changeHandler} value={this.state.txt}></input>
        <p>{this.state.txt.length}</p>
        <Validation length={this.state.txt.length}></Validation>
        {allChars}
      </div>
    );
  }
}

export default App;
