import React from 'react';
import { Link } from 'react-router-dom';
import LoveButton from './LoveButton';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';


const Article = (props) => {
    const {_id, title, author, content, time, avaUrl} = {...props};
    let displayTime = new Date(parseInt(time)).toString();
    let firstLetter = author.charAt(0).toUpperCase();

    return (
        <div style={{
            width: '80%',
            margin: '10px auto',
            padding: '10px',
            textAlign: 'left'
        }}>
            <Link to={`/article/${_id}`}><h1>{title}</h1></Link>
                <CardHeader
                    avatar={ avaUrl ? 
                        <Avatar alt="user avatar" src={avaUrl}></Avatar>
                        : <Avatar>{firstLetter}</Avatar>}
                    title={
                        <Link to={`/profile/${author}`} >
                            {author}
                        </Link>
                    }
                    subheader={displayTime}
                    action={<LoveButton 
                        loveClicked={() => props.clickedHeart(_id)}
                        isLove={props.isLove}
                        {...props}/>}
                />
            <p style={{
                height: '2rem',
                textAlign: 'left',
                marginLeft: "16px",
                overflow: 'hidden',
                whiteSpace: 'pre-line'}}>{content}</p>
            <Link to={`/article/${_id}`}>Read more...</Link>  <br/>          
            {props.tags.map(t => 
                <Link 
                    key={t}
                    to={`/tag/${t}`} 
                    style={{display: "inline-flex"}}>
                        <Chip 
                            style={{marginRight: "5px"}}
                            label={t}
                            component="span"
                            variant="outlined"
                            clickable/>
                </Link>
            )}
            <Divider style={{marginTop: "10px"}}/>
        </div>
    )
}

export default Article;