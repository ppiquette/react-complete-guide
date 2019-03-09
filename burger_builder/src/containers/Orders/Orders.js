import React, { Component } from 'react';
import Axios from '../../axios-orders'
import Order from '../../components/Order/Order';
import {uniqueID} from '../../util/uniqueID'

class Orders extends Component {
    state = {
        orders: null
    }

    componentDidMount() {
        // .json is because we use Google Firebase
        Axios.get('/orders.json')
            .then(response => {
                this.setState({orders: Object.values(response.data)})
            })
            .catch(error => {
            });
    }
    
    render() {

        let display = null;
        if(this.state.orders){
            display = this.state.orders.map((item) => { 
                return(
                    <Order key={uniqueID()} item={item}></Order>
                )
            })
        }

        return (
            <div>
                {display}
            </div>
        );
    }
}

export default Orders;