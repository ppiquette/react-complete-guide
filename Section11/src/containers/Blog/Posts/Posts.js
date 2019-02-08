import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import Axios from '../../../axios';
import { Route, Switch } from 'react-router-dom'
import FullPost from '../FullPost/FullPost'

import './Posts.css';


class Posts extends Component {
    
    state = {
        allPosts: [],
        allUsers: []
    }

    postSelectedHandler = (id) => {
        // Here we do the change of page programmatically but we could have simply 
        // use a <Link> element arount <Post> . This could also be used to redirect.
        this.props.history.push('/posts/' + id);
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

    render() {

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

        console.log(this.props);

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                {/* Adding the this.props.match.url make the Route relative so it can 
                    be used from anywhere */}
                <Switch>
                    <Route path={this.props.match.url + '/:id'} component={FullPost}/>
                    <Route path={this.props.match.url} component={FullPost}/>
                </Switch>
            </div>
        );
    }
}

export default Posts;