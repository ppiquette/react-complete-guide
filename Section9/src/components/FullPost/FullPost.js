import React, { Component } from 'react';

import './FullPost.css';
import Axios from 'axios';

class FullPost extends Component {    

    state = {
        post: null
    }

    componentDidUpdate() {
        if (this.state.post === null || (this.state.post.id !== this.props.id)){
            Axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                .then(response => { this.setState({ post: response.data }) })
        }
    }

    render () {
        let post = <p>Please select a Post!</p>;
        if(this.state.post !== null) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.post.title}</h1>
                    <p>{this.state.post.body}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;