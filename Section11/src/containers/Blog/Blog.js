import React, { Component } from 'react';
import Posts from './Posts/Posts'
import { Route } from 'react-router-dom'
import NewPost from './NewPost/NewPost'

import './Blog.css';

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <Route path="/" exact render={() => <Posts></Posts>}></Route>
                <Route path="/new-post" exact render={() => <NewPost></NewPost>}></Route>
            </div>
        );
    }
}

export default Blog;