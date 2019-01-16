import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import "./Setting.css";

class Setting extends React.Component {
    avatarUrlRef = React.createRef();
    userNameRef = React.createRef();
    bioRef = React.createRef();
    passwordRef = React.createRef();
    passwordConfRef = React.createRef();

    handleUpdateUser = (e) => {
        e.preventDefault();

        const data = {
            avaUrl: this.avatarUrlRef.current.value,
            biography: this.bioRef.current.value,
            email: localStorage.getItem("email"),
            password: this.passwordRef.current.value,
            passwordConf: this.passwordConfRef.current.value
        }

        localStorage.setItem("picUrl", data.avaUrl)
        localStorage.setItem("bio", data.biography)

        axios.put(`/profile/setting/${localStorage.getItem("author")}`, {data})
            .then (res => {
                console.log(res.data);
                this.props.history.push("/");
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="Setting">
                <form onSubmit={this.handleUpdateUser}>
                    <div className="SettingWrapper">
                        <h1>Your Setting</h1>
                        <input  type="url"
                                className="Avatar"
                                ref={this.avatarUrlRef}
                                placeholder="URL of profile picture"/>

                        <input  type="text"
                                className="UserName"
                                ref={this.userNameRef}
                                defaultValue={localStorage.getItem("author")}
                                placeholder="Your Username"/>

                        <textarea   name="bio"
                                    cols="30" rows="10" 
                                    ref={this.bioRef}
                                    placeholder="Short bio about you">{localStorage.getItem("bio")}</textarea>

                        <input  type="email"
                                className="Email"
                                ref={this.emailRef}
                                defaultValue={localStorage.getItem("email")}
                                placeholder="Email" />

                        <input  type="password"
                                className="Password"
                                ref={this.passwordRef}
                                defaultValue={localStorage.getItem("password")}
                                placeholder="Password"/>

                        <input  type="password"
                                className="PasswordConf"
                                ref={this.passwordConfRef}
                                defaultValue={localStorage.getItem("password")}
                                placeholder="Password Confirm"/>

                        <Button variant="contained"
                            color="secondary"
                            type="submit"
                            value="POST"> <strong>UPDATE SETTING</strong> </Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Setting;