import React from 'react';
import './Home.css';
import ArticlesList from './PublicArticles/ArticlesList';
import TagBox from './Tags/TagBox';
import PageNumber from './Pagination/PageNumber';
import Banner from './Banner';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

class Home extends React.Component {
    state={
        data: [],
        tags: [],
        pageNums: [],
    }  

    componentDidMount() {
        axios.get("/api/posts")
            .then( res => {
                console.log('Home posts', res.data)
                let totalDocs = res.data.totalDocuments[0].posts;
                let pageNums = [...this.state.pageNums];
                for (let i = 1; i < totalDocs / 13 + 1; i++) {
                    pageNums.push(i);
                }
                this.setState({ 
                    data: res.data.posts, 
                    tags: res.data.tags,
                    pageNums
                });
            }).catch(error => console.log(error));
    }

    // pagination
    handleClickPageNumber = (num) => {
        let path = `/api/posts/${num}`;
        axios.get(path)
            .then( res => {
                this.setState({ 
                    data: res.data.posts, 
                    tags: res.data.tags,
                });
            }).catch(error => console.log(error));
    }

    // click heart symbol
    handleClickLove = (id) => {
        let data = [...this.state.data];

        // get index of one article in the data array
        let postArr = data.filter(p => p._id === id)
        const index = data.indexOf(postArr[0]);
        let payload = {
            author: localStorage.getItem("author"),
            title: data[index].title
        }
        axios.put(`/article/${id}`, {payload})
            .then( res => {
                console.log(res.data)
                data[index].love = res.data.post.love;
                localStorage.setItem("loveArticles", res.data.user.loveArticles);
                this.setState({ data })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="Home">
                <Banner />
                <Grid container spacing={24}>
                    <Grid item xs={9}>
                        <ArticlesList 
                            posts={this.state.data}
                            isLove={this.state.isLove}
                            clickedLove={this.handleClickLove}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Card style={{marginTop: "10px"}}>
                            <h3>Popular Tags</h3>
                            <TagBox popularTags={this.state.tags} />
                        </Card>
                    </Grid>
                </Grid>
                <PageNumber 
                    clicked={this.handleClickPageNumber}
                    pageNumbers={this.state.pageNums}/>
            </div> 
        )
    }
}

export default Home;
