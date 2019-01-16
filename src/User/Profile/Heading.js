import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom';

class Heading extends React.Component {
    render() {
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={9}
                        style={{display: "flex", alignItems: "center"}}>
                        <h1 style={{marginRight: "20px"}}>
                            {localStorage.getItem('author')}
                        </h1>
                        <Link to="/setting">
                            <Button 
                                variant="outlined"
                                style={{width: "100px", height: "30px", 
                                    padding: "0 8px", textTransform: "none"}}>
                                        Edit profile
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={3}>
                        <div>
                            <Avatar alt="your avatar" 
                                style={{width: "120px", 
                                    height: "120px", 
                                    display: "block", 
                                    margin: "0 auto",
                                    marginTop: "2em"}}
                                src={localStorage.getItem("picUrl")} />
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Heading;