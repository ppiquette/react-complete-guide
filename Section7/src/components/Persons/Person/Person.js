import React, { PureComponent } from 'react'
import person_style from './Person.module.css';
import cssClassWrapper from '../../hoc/cssClassWrapper'
import PropTypes from 'prop-types'
import { AuthContext } from '../../../containers/App' 

class Person extends PureComponent {

    constructor(props){
        super(props);
        console.log("[Person.js] in constructor", props);
        this.nameOfNewProperty = React.createRef();
    }
    
    componentWillMount() {
        console.log("[Person.js] in componentWillMount")
    }
    
    componentDidMount() {
        console.log("[Person.js] in componentDidMount")

        // Using the ref define inside the input element. The following will focus the Person with index 0
        // if (this.props.index === 0){
        //     this.nameOfNewProperty.current.focus()
        // }
        // this.focusInput();
    }

    // Focus function that can be potentially called from outside 
    focusInput() {
        this.nameOfNewProperty.current.focus();
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
        console.log("[Person.js] in render");

        return (
        <>
            {/* This context bypass Persons and all other hoc in between. It is directly imported in this object*/}
            <AuthContext.Consumer>
                {(auth) => auth ? <p>I'm authenticated</p> : null}
            </AuthContext.Consumer>

            <p onClick={this.props.click}>I'm a {this.props.name} of {this.props.age}!!!</p>
            <input 
                ref={this.nameOfNewProperty}
                type="Text" 
                onChange={this.props.changed} 
                value={this.props.name} />
            {this.props.children}
        </>   
        )
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default cssClassWrapper(Person, person_style.Person)

