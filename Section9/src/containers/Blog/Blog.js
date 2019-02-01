import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import Axios from 'axios';

class Blog extends Component {

    state = {
        allPosts: [],
        allUsers: [],
        selectedPostIndex: -1
    }

    receivePostsHandler = (responsePosts) => {
        this.setState({allPosts: responsePosts.data.slice(0, 4)})
    }

    receiveUsersHandler = (responseUser) => {
        this.setState({allUsers: responseUser.data})
    }

    componentDidMount(){
        Axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(this.receivePostsHandler);

        Axios.get('https://jsonplaceholder.typicode.com/users')
            .then(this.receiveUsersHandler)
    }

    postSelectedHandler = (id) => {
        let index = this.state.allPosts.findIndex((el) => {
            return(el.id === id)
        });
        this.setState({selectedPostIndex: index});
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

        let title = "Please select a Post!"
        let content = ""
        if(this.state.allPosts.length > 0 && this.state.selectedPostIndex >= 0) {
            title = this.state.allPosts[this.state.selectedPostIndex].title
            content = this.state.allPosts[this.state.selectedPostIndex].body
        }

        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost 
                        title={title}
                        content={content}
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