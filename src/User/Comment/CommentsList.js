import React from 'react';
import CommentCard from './CommentCard';

const CommentsList = (props) => {
    return (
        <div>
            {props.comments.map(c => {
                return <CommentCard key={c._id} {...c} commentDeleted={props.deleted}/>
            })
            }
        </div>
    )
}

export default CommentsList;