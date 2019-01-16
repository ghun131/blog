import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

const CommentCard = (props) => {
    let {_id, author, comment, time, avaUrl} = props;
    let firstLetter = author.charAt(0).toUpperCase();
    let displayTime = new Date(parseInt(time)).toString();
    return (
        <div style={{marginTop: "30px"}}>
            <Card>
                <CardHeader
                    avatar={ avaUrl? 
                        <Avatar src={avaUrl}/>
                        : <Avatar>{firstLetter}</Avatar>
                    } 
                    title={
                        <Link to={`/profile/${author}`} >
                            {author}
                        </Link>
                        }
                    subheader={displayTime}
                    action={
                        author === localStorage.getItem("author") ?
                        <Button size="small" onClick={() => props.commentDeleted(_id)}>
                            <i className="fas fa-trash-alt fa-lg"></i>
                        </Button> : ""
                    }
                />
                <Divider />
                <CardContent style={{whiteSpace: "pre-line"}}>
                    {comment}
                </CardContent>
            </Card>
        </div>
    )
}

export default CommentCard;