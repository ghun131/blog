import React from 'react';
import "./NavBar.css";
import Avatar from '@material-ui/core/Avatar';

import { Link } from 'react-router-dom';

const NavBar = (props) => {
    const refreshPage = () => {
        window.location.reload()
    }

    return (
        <div>
            <ul style={{ color: "#3F3F3F", position: "relative"}}>
                <li className="Logo">
                    <Link to="/" 
                        style={{color: "#292929"}}
                        onClick={refreshPage}>BB Blog</Link>
                </li>
                <div style={{   display: "flex", 
                                alignItems: "center",
                                right: "0", 
                                position: "absolute", 
                                top:"50%", 
                                transform: "translate(0, -50%)" }}>
                    <li><Link to="/" onClick={refreshPage}>HOME</Link> </li>
                    { props.isUser ? 
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                        }}>
                            <Link to="/new-post" className="NewPost">
                                <i className="far fa-edit"></i>
                                New Post
                            </Link>
                            <Link className="Setting" to={`/profile/setting/${localStorage.getItem("author")}`}>
                                Setting
                            </Link>
                            <li className="Profile">
                                <Avatar alt="your avatar" src={localStorage.getItem("picUrl")} />
                                <ul className="ProfileDropDown">
                                    { !props.isUser?
                                        <li><Link to="/register">Sign up</Link></li>
                                    : '' }
                                    { props.isLogIn? 
                                        <li><Link to="/" onClick={props.logOut}>Log out</Link></li>
                                    : <li><Link to="/log-in">Log in</Link></li> }
                                    { props.isUser && props.isLogIn?
                                        <div>
                                            <li>
                                                <Link to={`/profile/${localStorage.getItem("author")}`}>
                                                    Profile
                                                </Link>
                                            </li>
                                            <li><Link to="/new-post" onClick={props.newPost}>New Post</Link></li>
                                            <li>
                                                <Link className="Setting" to={`/profile/setting/${localStorage.getItem("author")}`}>
                                                    Setting
                                                </Link>
                                            </li>
                                        </div>
                                    : ''}
                                </ul>
                            </li>
                        </div>
                        :
                        <div>
                            <Link to="/register">Sign up</Link>
                            <Link to="/log-in">Log in</Link>
                        </div>    
                    }
                    
                    
                </div>
            </ul>
        </div>
    )
}

export default NavBar;