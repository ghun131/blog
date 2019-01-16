import React from 'react';
import IconButton from '@material-ui/core/IconButton';

const LoveButton = (props) => {
    let loveArt = [];
    let loveArticles = localStorage.getItem("loveArticles");
    if (loveArticles != 'undefined' && loveArticles != undefined) { 
        loveArt = loveArticles.split(",").filter(art => art === props.title);
    }
    
    return (
        <div>
            <IconButton onClick={props.loveClicked}>
                {props.love}
                { loveArt[0] ? 
                    <i className="fas fa-heart"></i> 
                    : <i className="far fa-heart"></i>}
            </IconButton>
        </div>
    )
}

export default LoveButton;