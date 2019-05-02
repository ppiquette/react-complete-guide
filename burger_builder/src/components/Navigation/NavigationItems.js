import React, {Component} from 'react';
import NavigationItem from './NavigationItem'
import cssClasses from './NavigationItems.module.css'
import { connect } from 'react-redux';
import { logOut } from '../../store/actions/authActions';

class NavigationItems extends Component {

    onLogout = () => {
        this.props.logout();
    }


    render() {
        return (
            <ul className={cssClasses.NavigationItems}>
                <NavigationItem link="/">Burger Builder</NavigationItem>
                <NavigationItem link="/checkout">Checkout</NavigationItem>
                
                {this.props.isAuthenticated ? 
                    <>
                        <NavigationItem link="/orders">Orders</NavigationItem> 
                        <NavigationItem link="/logout">Logout</NavigationItem> 
                    </>: 
                    <NavigationItem link="/auth">Authenticate</NavigationItem> } 
            </ul>
        );
    }
};


// When receiving a new state
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.app.auth.token !== null,
    }
}
  
// To change the state
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {dispatch(logOut())}
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
 )(NavigationItems)

 