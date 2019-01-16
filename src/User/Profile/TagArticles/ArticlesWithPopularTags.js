import React from 'react';
import TagArticlesList from './TagArticlesList';
import axios from 'axios';

class ArticlesWithPopularTags extends React.Component {
    state={
        data: [],
        tagName: ''
    }

    componentDidMount() {
        const pathnameArr = this.props.location.pathname.split("/");
        const tagName = pathnameArr[pathnameArr.length - 1];
        axios.get(`/tag/${tagName}`)
            .then(res => {
                console.log(res.data)
                this.setState({ data: res.data, tagName })
            }).catch(err => console.log(err.message));
    }

    render() {
        return (
            <div style={{width: '80%',
                    margin: '10px auto',
                    padding: '10px',
                    textAlign: 'left'}}>
                <TagArticlesList 
                    tagArticlesList={this.state.data}
                    tag={this.state.tagName}/>
            </div>
        )
    }
}

export default ArticlesWithPopularTags;
