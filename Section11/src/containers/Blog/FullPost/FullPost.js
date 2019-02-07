import React, { Component } from 'react';

import './FullPost.css';
import Axios from 'axios';

// This imported component make sure to pass routing information to the wrapped component
import { withRouter } from 'react-router-dom'

class FullPost extends Component {    

    state = {
        post: null
    }

    fetchPost = () => {
        let id = this.props.match.params.id;
        if (id >= 0) { 
            if (this.state.post === null || (this.state.post.id != id)){
                Axios.get('/posts/' + id)
                    .then(response => { this.setState({ post: response.data }) })
                    .catch(error => {console.log("Error occured") })
            }
        }

    }

    componentDidMount() {
        this.fetchPost()
    }
    
    componentDidUpdate() {
        this.fetchPost()
    }
    
    deletePostHandler = () => {
        Axios.delete('/posts/' + this.state.post.id)
            .then(response => {
                console.log(response);
            })
    }

    render () {
        let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;
        if(this.state.post !== null) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.post.title}</h1>
                    <p>{this.state.post.body}</p>
                    <div className="Edit">
                        <button 
                            className="Delete"
                            onClick={this.deletePostHandler}
                        >Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default withRouter(FullPost);