import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';

const TagCard = (props) => {
    return (
        <Link to={`/tag/${props._id}`} 
            style={{display: "inline-flex", padding: "5px"}}>
            <Chip style={{padding: "0"}}
                    label={props._id}
                    href={"#" + props._id}
                    variant="outlined"
                    clickable/>
        </Link>
    )
}

export default TagCard;