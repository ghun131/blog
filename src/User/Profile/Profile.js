import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import ArticlesList from './PersonalArticles/ArticlesList';
import Heading from './Heading';
import ProfileNavBar from './ProfileNavBar';
import FollowerFollowing from './FollowerFollowing';
import FavouriteArticles from './PersonalArticles/FavouriteArticles';
import { withRouter} from 'react-router-dom';
import axios from 'axios';
import PageNumber from './Pagination/PageNumber';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

class Profile extends React.Component {
    state={
        title: '',
        content: '',
        articles: [],
        pageNums: [],
        isLove: true
    }

    componentDidMount() {
        axios.get(`/profile/${localStorage.getItem("author")}`)
            .then( res => {
                console.log('Profile', res.data)
                let totalDocs = res.data.totalDocuments[0].posts;
                let pageNums = [...this.state.pageNums];
                for (let i = 1; i < totalDocs / 13 + 1; i++) {
                    pageNums.push(i);
                }
                this.setState({ 
                    articles: res.data.posts,
                    pageNums
                });
            }).catch(error => console.log(error));
    }

    handleEdit = (id) => {
        this.props.history.push(`/profile/edit/${id} `);
    }

    handleDelete = (id) => {
        let articles = [...this.state.articles];
        let post = articles.filter(p => p._id === id);
        let index = articles.indexOf(post[0]);
        articles.splice(index, 1);
        this.setState({ articles });
        axios.delete(`/profile/delete/${id}`, post[0])
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err.message))
    }

    deleteAlert = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delele this post.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.handleDelete(id)
              },
              {
                label: 'No',
                onClick: () => console.log('No')
              }
            ]
        })
    };

    handleClickPageNum = (num) => {
        let path = `/profile/${localStorage.getItem("author") + "/posts/" + num}`;
        axios.get(path)
            .then( res => {
                this.setState({ articles: res.data.posts });
            }).catch(error => console.log(error));
    }

    render() {        
        return (
            <div style={{
                width: '80%',
                margin: '10px auto',
                padding: '10px',
                textAlign: 'left'
            }}>
                <Heading />
                <FollowerFollowing />
                <ProfileNavBar />
                    <Switch>
                        <Route path="/profile/:username/love" 
                            render={() => <FavouriteArticles/>}/>
                        <Route path="/"
                            render={() => 
                                <ArticlesList 
                                    edited={this.handleEdit}
                                    deleted={this.deleteAlert}
                                    articlesList={this.state.articles}/>}/>
                    </Switch>
                <PageNumber 
                    clicked={this.handleClickPageNum}
                    pageNumbers={this.state.pageNums}/>
            </div>
        )
    }
}

export default withRouter(Profile);

Profile.propTypes = {
    articlesUpdate: PropTypes.arrayOf(PropTypes.object)
}