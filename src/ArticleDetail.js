import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import Spinner from './Spinner';
import CommentsList from './User/Comment/CommentsList';
import CommentBox from './User/Comment/CommentBox';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

class ArticleDetail extends React.Component {
    state={
        article: {},
        comments: [],
        comment: '',
        loading: false
    }

    componentDidMount() {
        // get a single article
        console.log('component did mount before request')
        this.setState({ loading: true });
        axios.get(this.props.history.location.pathname)
            .then( res => {
                console.log('component did mount after request', res.data)
                this.setState({ 
                    article: res.data.article,
                    comments: res.data.comments,
                    loading: false
                });
            })
            .catch (error => console.log(error))
    }

    handleCommentChange = (e) => {
        this.setState({ comment: e.target.value })
    }

    handleSubmitComment = (e) => {
        e.preventDefault();

        this.setState({ loading: true });
        const data = {
            author: localStorage.getItem("author"),
            avaUrl: localStorage.getItem("picUrl"),
            articleTitle: this.state.article.title,
            comment: this.state.comment
        }
        axios.post(this.props.history.location.pathname, {data})
            .then (res => {
                let comments = [...this.state.comments];
                comments.unshift(res.data);
                this.setState({ 
                    loading: false,
                    comment: '',
                    comments
                })
            })
            .catch (error => console.log(error))
    }

    handleDeleteComment = (id) => {
        let comments = [...this.state.comments];
        let comment = comments.filter(p => p._id === id);
        let index = comments.indexOf(comment[0]);
        comments.splice(index, 1);
        this.setState({ comments });
        axios.delete(`/article/comment/delete/${id}`, comment[0])
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err.message))
    }

    deleteAlert = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delele this comment permanently.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.handleDeleteComment(id)
              },
              {
                label: 'No',
                onClick: () => console.log('No')
              }
            ]
        })
    };

    render() {
        const { author, content, title, time, tags} = {...this.state.article}
        let displayTime = new Date(parseInt(time)).toString();
        if (this.state.loading) {
            return <Spinner />
        }
            return (
                <div style={{
                    width: '80%',
                    margin: '10px auto',
                    padding: '10px',
                    textAlign: 'left'
                }}>
                    <h1>{title}</h1>
                    <h4>{author}</h4>
                    <p><em>{displayTime}</em></p>
                    <p style={{
                        textAlign: 'left',
                        whiteSpace: 'pre-line'}}>{content}</p>
                    <p>{author ? tags.map (t =>
                        <Link key={t}
                            to={`/tag/${t}`} 
                            style={{display: "inline-flex"}}>
                                <Chip 
                                    style={{marginRight: "5px"}}
                                    label={t}
                                    component="span"
                                    variant="outlined"
                                    clickable/>
                        </Link>) : ""}
                    </p>
                    {
                        localStorage.getItem("author") ? 
                        <CommentBox changed={this.handleCommentChange}
                            submitted={this.handleSubmitComment}/>
                        :
                        <p>
                            <Link to="/register">Sign in</Link> or <Link to="/log-in">sign up</Link>
                            to add comment on this article
                        </p> 
                    }
                    
                        
                    {
                        author ? <CommentsList 
                                    comments={this.state.comments}
                                    deleted={this.deleteAlert}/>
                        : ""
                    }
                </div>
        )
    }
}

export default ArticleDetail;