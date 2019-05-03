import React, { Component } from 'react';
import Axios from '../../axios-orders'
import Order from './Order';
import {uniqueID} from '../../util/uniqueID'
import axiosInstance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'


class Orders extends Component {
    state = {
        orders: null
    }

    componentDidMount() {
        // .json is because we use Google Firebase
        Axios.get('/orders.json?auth=' + this.props.token)
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
                    this.props.userId == item.customer.userId ? <Order key={uniqueID()} item={item}></Order> : null
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



// When receiving a new state
const mapStateToProps = (state) => {
    return {
        token: state.app.auth.token,
        userId: state.app.auth.userId,
    }
}
  
// To change the state
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
 )(withErrorHandler(Orders, axiosInstance)))
