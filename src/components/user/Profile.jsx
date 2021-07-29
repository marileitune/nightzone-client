//<Link to={`/chat/${this.props.match.params.userId }`}><Button variant="contained" color="primary">CHAT</Button></Link>
import React, { Component } from "react";
import {withRouter } from "react-router-dom";
import axios from 'axios';
import {API_URL} from '../../config.js'
import { Grid, Button, Typography, Avatar} from '@material-ui/core';

class Profile extends Component {
    state = {
        user: this.props.user,
        fetchingUser: true,
        userFriend: ''
    }

    componentDidMount = async () => {
        try {
            let userResponse = await axios.get(`${API_URL}/api/user`, {withCredentials: true})
            await this.setState({
              user: userResponse.data,
              fetchingUser: false,
            })

            let userId = this.props.match.params.userId
            let userIdResponse = await axios.get(`${API_URL}/api/account/${userId}`, {withCredentials: true})
            console.log(userIdResponse)
            await this.setState({
                userFriend: userIdResponse.data
            })
        }
        catch (err) {
            console.log('User events fetch failed', err)
        }
    }

    render() {
        const {userFriend} = this.state
        return (
            <div>
                <Grid>
                    <Grid>
                    <Avatar src={`${userFriend.imageAccount}`}></Avatar>
                    </Grid>
                    <Grid>
                       <Typography>{userFriend.firstName}</Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withRouter(Profile);