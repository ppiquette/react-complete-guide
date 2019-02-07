import React, { Component } from 'react';
import Posts from './Posts/Posts'
import { Route , NavLink, Switch } from 'react-router-dom'
import NewPost from './NewPost/NewPost'


import './Blog.css';

class Blog extends Component {
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
                        </ul>
                    </nav>
                </header>
                
                {/* Switch component is used to tell Router to stop when it finds one valid route. Otherwise,
                    it would display *all* matching routes */}
                <Switch>
                    <Route path="/new-post" exact component={NewPost}/>
                    <Route path="/" component={Posts}/>
                </Switch>
            </div>
        );
    }
}

export default Blog;