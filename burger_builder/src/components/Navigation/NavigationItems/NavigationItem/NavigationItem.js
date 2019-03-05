import React, {Component} from 'react';
import cssClasses from './NavigationItem.module.css'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom' 


class NavigationItem extends Component {
    
    render() {
        const active = (this.props.location.pathname === this.props.link)

        return (
            <li className={cssClasses.NavigationItem}>
                <Link 
                    to={this.props.link}
                    className={active ? cssClasses.active : null}
                >
                    {this.props.children}
                </Link>
            </li>
        );
    }
};

export default withRouter(NavigationItem);