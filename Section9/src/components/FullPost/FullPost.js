import React, { Component } from 'react';

import './FullPost.css';
import Axios from 'axios';

class FullPost extends Component {    

    state = {
        post: null
    }

    componentDidUpdate() {
        if (this.props.id >= 0) { 
            if (this.state.post === null || (this.state.post.id !== this.props.id)){
                Axios.get('/posts/' + this.props.id)
                    .then(response => { this.setState({ post: response.data }) })
                    .catch(error => {console.log("Error occured") })
            }
        }
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

export default FullPost;