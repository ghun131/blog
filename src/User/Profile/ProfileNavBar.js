import React from 'react'
import { Link } from 'react-router-dom';

const ProfileNavBar = (props) => {
    return (
        <div style={{ marginTop: "30px" }}>
            <Link to={`/profile/${localStorage.getItem("author")}`}>
                Your posts
            </Link>
            <Link to={`/profile/${localStorage.getItem("author")}/love`}>
                Favourite articles
            </Link>
                
            <hr/>
        </div>
    )
}

export default ProfileNavBar;