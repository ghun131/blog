import React from 'react';
import TagArticle from './TagArticle';

const TagArticlesList = (props) => {
    return (
        <div>
            <h2 style={{textAlign: "center"}}>
                #{props.tag}
            </h2>
            {props.tagArticlesList.map(a => {
                return <TagArticle key={a._id} {...a}/>
            })}
        </div>
    )
}

export default TagArticlesList;