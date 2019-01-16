import React from 'react';
import PropTypes from 'prop-types';
import './NewPost.css';
import Spinner from '../Spinner';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button'

class NewPost extends React.Component {
    titleRef = React.createRef();
    contentRef = React.createRef();
    tagsRef = React.createRef();

    state = {
        message: '',
        loading: false
    }

    clearMessage = () => {
        setTimeout(() => {
            this.setState({ message: ''})
        }, 4000)
    }

    handleSubmitPost = (e) => {
        e.preventDefault();
        const title = this.titleRef.current.value;
        const content = this.contentRef.current.value;
        let tagsString = this.tagsRef.current.value;
        tagsString = tagsString.replace(/\s/g, "");
        const tags = tagsString.split(",");

        const token = localStorage.getItem('token');
        const post = {
            author: localStorage.getItem('author'),
            email: localStorage.getItem('email'),
            title: title,
            avaUrl: localStorage.getItem('picUrl'),
            content: content,
            tags: tags
        }

        this.setState({ loading: true });
        if ( !title || !content || !tagsString) {
            this.setState({ 
                message: 'Please don\'t leave anything empty!',
                loading: false
            })
            this.clearMessage();
        }
        else {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            axios.post('/api/new-post', {post})
                .then(res => {
                    console.log(res.data);
                    if (res.data.message) {
                        this.setState({ message: res.data.message })
                        this.clearMessage()
                    } else {
                        this.setState({ loading: false });
                    }
                }).catch(error => console.log(error));
            this.props.history.push('/');
            window.location.reload();
        }
    }

    render() {
        let content;
        if (this.state.loading) { content = <Spinner /> } 
        else {
            content = 
            <div className="NewPost">
                <form onSubmit={this.handleSubmitPost}>
                    <div className="NewPostWrapper">
                        <h1 style={{textAlign: 'left', 
                                    paddingLeft: '5px',
                                    fontStyle: 'italic'}}>{sessionStorage.getItem('author')}</h1>
                        
                        <input  type="text"
                                className="Title"
                                ref={this.titleRef}
                                placeholder="Title..."/>

                        <textarea   name="content"
                                    cols="30" rows="10" 
                                    ref={this.contentRef}
                                    placeholder="What do you think...?"></textarea>

                        <input  type="text"
                                className="Tags"
                                style={{fontWeight: "300"}}
                                ref={this.tagsRef}
                                placeholder="Separate different tags with semi-colon."/>

                        <div className="Message">{this.state.message}</div>

                        <Button variant="contained"
                            color="secondary"
                            type="submit"
                            value="POST"> <strong>NEW POST</strong> </Button>
                    </div>
                </form>
            </div>
        }

        return <div>{content}</div>
    }
}

export default withRouter(NewPost);

NewPost.propTypes = {
    postInfo: PropTypes.objectOf(PropTypes.string),
}