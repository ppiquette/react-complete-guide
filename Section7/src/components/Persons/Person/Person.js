import React, { PureComponent } from 'react'
import person_style from './Person.module.css';
import WithClass from '../../hoc/WithClass'

class Person extends PureComponent {

    constructor(props){
        super(props);
        console.log("[Person.js] in constructor", props)
    }
    
    componentWillMount() {
        console.log("[Person.js] in componentWillMount")
    }
    
    componentDidMount() {
        console.log("[Person.js] in componentDidMount")
    }

    componentWillUnmount() {
        // Component is about to get removed => Perform any cleanup work here!
        console.log("[Person.js] in componentWillUnmount");
    }

    componentWillReceiveProps(nextProps) {
        console.log("[UPDATE Person.js] in componentWillReceiveProps", nextProps);
    }
    
    componentWillUpdate(nextProps, nextState) {
      console.log("[UPDATE Person.js] in componentWillUpdate", nextProps, nextState);
    }

    componentDidUpdate(){
      console.log("[UPDATE Person.js] in componentDidUpdate");
    }

    render() {
        console.log("[Person.js] in render")

        return (
            <WithClass className={person_style.Person}>
                <p onClick={this.props.click}>I'm a {this.props.name} of {this.props.age}!!!</p>
                <input type="Text" onChange={this.props.changed} value={this.props.name} />
                {this.props.children}
            </WithClass>        
        )
    }
}

export default Person

