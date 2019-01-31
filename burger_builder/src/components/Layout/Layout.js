import React, { Component } from "react";

import Aux from '../../hoc/Aux'
import cssClasses from './layout.module.css'
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showDrawer: false
    } 

    hideSideDrawerHandler = () => {
        this.setState({showDrawer: false});
    }

    showSideDrawerHandler = () => {
        this.setState({showDrawer: true});
    }

    render() {
        return (
            <Aux>
                <Toolbar menuClicked={this.showSideDrawerHandler}/>
                
                <SideDrawer
                    backdropClicked={this.hideSideDrawerHandler} 
                    show={this.state.showDrawer}
                />
                
                <main className={cssClasses.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

export default Layout;