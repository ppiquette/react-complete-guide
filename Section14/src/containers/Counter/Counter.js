import React, { Component } from 'react';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

import { connect } from 'react-redux'
import { dispatch } from 'react'
import { changeBy, storeCounter, removeCounter } from '../../store/actions'


class Counter extends Component {

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={() => this.props.onChangeBy(1)} />
                <CounterControl label="Decrement" clicked={() => this.props.onChangeBy(-1)}  />
                <CounterControl label="Add 5" clicked={() => this.props.onChangeBy(5)}  />
                <CounterControl label="Subtract 5" clicked={() => this.props.onChangeBy(-5)}  />
                <div>
                    <button onClick={() => this.props.onStore(this.props.ctr)}>Store counters</button>
                    <ul>
                        List of stored counters
                        {this.props.results.map((current, index) => {
                            return (
                                <li key={index} onClick={() => this.props.onRemove(index)}>{current}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ctr: state.counter,
        results: state.results,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeBy: (by) => {
            dispatch(changeBy(by))
        },
        onStore: (counter) => {
            dispatch(storeCounter(counter))
        },
        onRemove: (index) => {
            dispatch(removeCounter(index))
        },
    }
}

// Connect returne a function (that is a high order component) that we then called with the (Counter) component has a parameter 
export default connect(mapStateToProps, mapDispatchToProps)(Counter);