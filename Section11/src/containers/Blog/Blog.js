import React, { Component } from 'react';
import Posts from './Posts/Posts'
import { Route , NavLink, Switch } from 'react-router-dom'
import NewPost from './NewPost/NewPost'
import FullPost from './FullPost/FullPost'


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
                    <Route path="/" exact component={Posts}/>
                    <Route path="/post/:id" component={FullPost}/>
                    <Route path="/new-post" exact component={NewPost}/>
                </Switch>
            </div>
        );
    }
}

export default Blog;