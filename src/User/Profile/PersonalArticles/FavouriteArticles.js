import React from 'react';
import Article from './Article';
import axios from 'axios';

class FavouriteArticles extends React.Component {
    state={
        articles: [],
        isLove: false
    }

    componentDidMount = () => {
        let loveArticles = localStorage.getItem("loveArticles").split(",");
        let path = `/profile/${localStorage.getItem("author")}/love`;
        axios.post(path, {loveArticles: loveArticles})
            .then( res => {
                console.log('Love Articles', res.data);
                if (!res.data[0]) {
                    this.setState({ isLove: false });
                } else {
                    this.setState({ articles: res.data, isLove: true });
                }
            }).catch(error => console.log(error));
    }
    

    render() {
            if (!this.state.isLove) {
                return <div>Nothing's here yet... Love something!!!</div>
            } else {
            return (
                <div>
                    {this.state.articles.map(a => {
                        return (
                            <Article
                                key={a._id} 
                                isLove={this.state.isLove}
                                {...a}/>
                        )
                    })}
                </div>
            )
        }
    }
}

export default FavouriteArticles;