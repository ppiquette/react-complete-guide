import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import Axios from '../../../axios';
// import {Link} from 'react-router-dom';
import { Route } from 'react-router-dom'
import FullPost from '../FullPost/FullPost'

import './Posts.css';


class Posts extends Component {
    
    state = {
        allPosts: [],
        allUsers: []
    }

    postSelectedHandler = (id) => {
        // Here we do the change of page programmatically but we could have simply 
        // use a <Link> element arount <Post> (see below)
        this.props.history.push('/' + id);
    }

    receivePostsHandler = (responsePosts) => {
        this.setState({allPosts: responsePosts.data.slice(0, 4)})
    }

    receiveUsersHandler = (responseUser) => {
        this.setState({allUsers: responseUser.data})
    }

    componentDidMount(){
    console.log(this.props);

        Axios.get('/posts')
            .then(this.receivePostsHandler);

        Axios.get('/users')
            .then(this.receiveUsersHandler)
    }

    render() {

        const posts = this.state.allPosts.map(post => {
            let author = "Unknown" 
            if(this.state.allUsers.length > 0){
                const index = this.state.allUsers.findIndex((el) => {return(el.id === post.userId)});
                author = this.state.allUsers[index].name;
            }

            return(
                // <Link 
                //     to={'/post/' + post.id}
                //     key={post.id}
                // >
                    <Post
                        key={post.id}
                        title={post.title}
                        author={author}
                        postClicked={() => this.postSelectedHandler(post.id)}
                    />
                // </Link>
            )
        })

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                {/* Adding the this.props.match.url make the Route relative so it can 
                    be used from anywhere */}
                <Route path={this.props.match.url + ':id'} component={FullPost}/>
            </div>
        );
    }
}

export default Posts;