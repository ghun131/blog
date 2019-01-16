import React from 'react';
import Article from './Article';

const ArticlesList = (props) => {
    return (
        <div>
            {props.articlesList.map(a => {
                return (
                    <Article
                        key={a._id} 
                        edit={props.edited}
                        alert={props.deleted}
                        isLove={props.isLove}
                        {...a}/>
                )
            })}
        </div>
    )
}

export default ArticlesList;