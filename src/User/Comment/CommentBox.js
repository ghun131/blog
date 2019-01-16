import React from 'react';
import Button from '@material-ui/core/Button';
import './CommentBox.css';

const CommentBox = (props) => {
    return (
        <div>
            <form onSubmit={props.submitted}>
                <div>
                    <textarea   name="comment"
                                cols="30" rows="10" 
                                onChange={props.changed}
                                placeholder="Your comment..."></textarea>

                    <Button variant="contained"
                        color="secondary"
                        style={{margin: "0 auto", display: "block"}}
                        type="submit"
                        value="POST"> <strong>POST</strong> </Button>
                </div>
            </form>
        </div>
    )
}

export default CommentBox;