import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {logOut} from '../../store/actions/authActions'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'


class logout extends Component {

    componentDidMount(){
        this.props.logout();
    }

    render() {
        return (
            <Redirect to="/"/>
        );
    }
}


// When receiving a new state
const mapStateToProps = (state) => {
    return {
    }
}
  
// To change the state
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {dispatch(logOut())}
    }
}

// Need to wrap withRouter around redux (i.e. connect) otherwise get a warning
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
 )(logout))