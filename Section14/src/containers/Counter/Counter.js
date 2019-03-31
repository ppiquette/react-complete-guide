import React, { Component } from 'react';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

import { connect } from 'react-redux'
import { dispatch } from 'react'
import { changeBy } from '../../store/actions'


class Counter extends Component {

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={() => this.props.onChangeBy(1)} />
                <CounterControl label="Decrement" clicked={() => this.props.onChangeBy(-1)}  />
                <CounterControl label="Add 5" clicked={() => this.props.onChangeBy(5)}  />
                <CounterControl label="Subtract 5" clicked={() => this.props.onChangeBy(-5)}  />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ctr: state.counter,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeBy: (by) => {
            dispatch(changeBy(by))
        },
    }
}

// Connect returne a function (that is a high order component) that we then called with the (Counter) component has a parameter 
export default connect(mapStateToProps, mapDispatchToProps)(Counter);