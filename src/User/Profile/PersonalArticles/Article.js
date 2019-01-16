import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const Article = (props) => {
    const {_id, author, content, title, time, avaUrl} = {...props}
    let displayTime = new Date(parseInt(time)).toString();
    let firstLetter = author.charAt(0).toUpperCase();

    return (
        <div style={{ textAlign: 'left'}}>
            <Grid container spacing={24}>
                <Grid item xs={9}>
                    <Link to={`/article/${_id}`}><h1>{title}</h1></Link>
                </Grid>
                <Grid 
                    item xs={3} 
                    style={{ margin: '25px 0px', cursor: "pointer" }}>
                    { 
                    props.isLove ? "" :
                    <span>
                        <Button size="small" onClick={() => props.edit(_id)}>
                            <i className="fas fa-edit fa-lg" ></i>
                        </Button>
                        <Button size="small" onClick={() => props.alert(_id)}>
                            <i className="fas fa-trash-alt fa-lg"></i>
                        </Button>
                    </span>
                    }
                    
                </Grid>
            </Grid>
            <Link to={`/profile/${author}`} >
                <CardHeader
                    avatar={ avaUrl ? 
                        <Avatar alt="user avatar" src={avaUrl}></Avatar>
                        : <Avatar>{firstLetter}</Avatar>}
                    title={author}
                    subheader={displayTime}
                />
            </Link>
            <p style={{
                textAlign: 'left',
                height: '2rem',
                overflow: 'hidden',
                whiteSpace: 'pre-line'}}>{content}</p>
            <Link to={`/article/${_id}`}>Read more...</Link> <br/>
            {props.tags
                .map(t => 
                    <Link 
                        key={t}
                        to={`/profile/${localStorage.getItem("author") + "/" + t}`} 
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

Article.propTypes = {
    articlesUpdate: PropTypes.arrayOf(PropTypes.object),
    author: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    _id: PropTypes.string
}