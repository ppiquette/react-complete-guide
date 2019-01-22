import React , { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'


class BurgerBuilder extends Component {
    constructor(props){
        super(props)
        this.state = {
            layers: ['bread-top', 'meat', 'bread-bottom']
        }
    }

    render(){
        return (
            <Aux>
                <Burger layers={this.state.layers}/>
                <div>Build controls</div>

            </Aux>
        )
    }

}

export default BurgerBuilder;