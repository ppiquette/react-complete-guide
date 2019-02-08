import React, { Component } from 'react';
import Posts from './Posts/Posts'
import { Route , NavLink, Switch, Redirect } from 'react-router-dom'
import './Blog.css';

import asyncComponent from '../../hoc/asyncComponent'
// import NewPost from './NewPost/NewPost'

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost')
})


class Blog extends Component {
    state = {
        authenticated: true
    }
    
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                exact 
                                activeClassName='myActiveClassName'
                                activeStyle={{
                                    textDecoration: 'underline'
                                }}
                                to="/">Home</NavLink></li>
                            <li><NavLink 
                                exact 
                                activeClassName='myActiveClassName'
                                to={{
                                    pathname: "/new-post",
                                    hash: "submit",
                                    search: "quick-submit=true"
                                }}>New Post</NavLink></li>
                            <li style={{color: "lightgray", fontSize: 10 }}>React Version: {React.version}</li>
                        </ul>
                    </nav>
                </header>
                
                {/* Switch component is used to tell Router to stop when it finds one valid route. Otherwise,
                    it would display *all* matching routes */}
                <Switch>
                    {this.state.authenticated ? <Route path="/new-post" exact component={AsyncNewPost}/> : null}
                    <Route path="/posts" component={Posts}/>
                    <Redirect from="/" to="/posts"/>
                </Switch>
            </div>
        );
    }
}

export default Blog;