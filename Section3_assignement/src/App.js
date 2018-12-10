import React, { Component } from 'react';
import './App.css';
import UserOutput from './UserOutput/UserOutput'
import UserInput from './UserInput/UserInput'

class App extends Component {
  state = {
    username: "Rémi"
  }
  
  eventHandler = (event) => {
    this.setState(
      {
        username: event.target.value
      }
    )
  }

  render() {
    return (
      <div className="App">
        <UserInput input_change={this.eventHandler} initial={this.state.username}></UserInput>
        <UserOutput username='Patrick'></UserOutput>
        <UserOutput username={this.state.username}></UserOutput>
        <UserOutput></UserOutput>
      </div>
    );
  }
}

export default App;
