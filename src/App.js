import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import RoutePath from './Route';
import NavBar from './NavBar';
import axios from 'axios';
import './App.css';

export default class App extends Component {
    state={
        loading: false,
        articles: [],
        isUser: false,
        isLogIn: false,
        isNewPost: false
    }
    
    componentDidMount = () => {
        let user = {};

        //get data from localStorage for not losing data after refreshing page
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        const token = localStorage.getItem('token');
        if( email && password) {
            user.email = email;
            user.password = password;

            axios.post('/api/log-in', {user})
                .then(res => {
                    console.log(this.props)
                    let post = {...this.state.post};
                    let articles = [...this.state.articles];
                    console.log(res.data);
                    if (res.data.success) {
                        post.author = res.data.package.username;
                        post.email = res.data.package.email;
                        articles = res.data.package.collection.reverse();
                        this.setState({ token: token,
                                        articles: articles,
                                        isLogIn: true, 
                                        isUser: true,
                                        post: post,
                                        loading: false });
                    }                         
                }).catch(error => console.log(error));
        }

        axios.get('/api/posts')
            .then( res => {
                if ( email && password ) {
                    this.setState({ isLogIn: true,
                                    isUser: true })
                }
            }).catch(error => console.log(error));
    }

    handleLogOut = () => {
        let payload = {
            user: '',
            token: ''
        };
        this.setState({ isUser: false, 
                        isLogIn: false, 
                        token: '',
                        isNewPost: false,
                        articles: [] });
        window.localStorage.clear();
        axios.post('/api/log-out', payload)
    }

    handleClickNewPost = () => {
        this.setState({ isNewPost: false });
    }

    render() {
        return (
            <div className="App">
            <header className="Nav">
                <nav>
                    <NavBar isLogIn={this.state.isLogIn}
                            isUser={this.state.isUser}
                            logOut={this.handleLogOut}
                            newPost={this.handleClickNewPost}/>
                </nav>
            </header>
                <RoutePath  isUser={this.state.isUser}
                            isLogIn={this.state.isLogIn}
                            articlesList={this.state.articles}
                            isNewPost={this.state.isNewPost}/>
            </div>
        )
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
, document.getElementById('root'));