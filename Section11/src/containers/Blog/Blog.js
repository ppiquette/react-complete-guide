import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
// import Axios from 'axios';
import Axios from '../../axios'

class Blog extends Component {

    state = {
        allPosts: [],
        allUsers: [],
        selectedPostId: -1
    }

    receivePostsHandler = (responsePosts) => {
        this.setState({allPosts: responsePosts.data.slice(0, 4)})
    }

    receiveUsersHandler = (responseUser) => {
        this.setState({allUsers: responseUser.data})
    }

    componentDidMount(){
        Axios.get('/posts')
            .then(this.receivePostsHandler);

        Axios.get('/users')
            .then(this.receiveUsersHandler)
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
        const posts = this.state.allPosts.map(post => {

            let author = "Unknown" 
            if(this.state.allUsers.length > 0){
                const index = this.state.allUsers.findIndex((el) => {return(el.id === post.userId)});
                author = this.state.allUsers[index].name;
            }

            return(
                <Post
                    key={post.id}
                    title={post.title}
                    author={author}
                    postClicked={() => this.postSelectedHandler(post.id)}
                />
            )
        })

        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost 
                        id={this.state.selectedPostId}
                    />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;