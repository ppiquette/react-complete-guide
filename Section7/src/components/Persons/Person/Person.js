import React, { PureComponent } from 'react'
import person_style from './Person.module.css';
import compWrapperWithClass from '../../hoc/compWrapperWithClass'
import PropTypes from 'prop-types'


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

        // Using the ref define inside the input element
        if (this.props.index == 0){
            this.nameOfNewProperty.focus()
        }
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
        <>
            <p onClick={this.props.click}>I'm a {this.props.name} of {this.props.age}!!!</p>
            <input 
                ref={(anyname) => {this.nameOfNewProperty = anyname} }
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

export default compWrapperWithClass(Person, person_style.Person)

