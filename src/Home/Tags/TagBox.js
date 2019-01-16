import React from 'react';
import TagCard from './TagCard';

const TagBox = (props) => {
    return (
        <div>
            {
                props.popularTags.map(t => {
                    return <TagCard key={t._id} {...t}/>
                })
            }
        </div>
    )
}

export default TagBox;