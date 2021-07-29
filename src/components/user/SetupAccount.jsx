import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from 'axios';
import {API_URL} from '../../config.js'
import Profile from './Profile'
import Account from './Account'
import {CircularProgress} from '@material-ui/core';

class SetupAccount extends Component {
    state = {
        user: this.props.user,
        fetchingUser: true
    }
    
    componentDidMount = async () => {
        try {
            let userResponse = await axios.get(`${API_URL}/api/user`, {withCredentials: true})
            await this.setState({
              user: userResponse.data,
              fetchingUser: false,
            })
        }
        catch (err) {
            console.log('User events fetch failed', err)
        }
    }
    render() {
        if (this.state.fetchingUser){
            return <CircularProgress color="secondary" />
          }
        const {user} = this.state
        return (
            <div>
                { user !== null && this.props.match.params.userId == user._id ? <Account user={user}/> : <Profile user={user}/> }
            </div>
        )
    }
}

export default SetupAccount