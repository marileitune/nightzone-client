import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../../config.js'
import { withRouter, Link } from "react-router-dom";
import {List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography} from '@material-ui/core';


class Messages extends Component {
  
  state = {
    user: this.props.user,
    conversationList: []
  }

  componentDidMount = async () => {
    let userResponse = await axios.get(`${API_URL}/api/user`, {withCredentials: true})
    this.setState({
      user: userResponse.data 
    })

   let conversation = await axios.get(`${API_URL}/api/messages`, {withCredentials: true})    //messages
   console.log(conversation)
    await this.setState({
      conversationList: conversation.data
    })

   

  }
  render() {
    const {conversationList} = this.state
  return (
    <List style={{marginTop: '5%'}}>
      {
        conversationList.map((user, i) => {
          return <Link to={`/chat/${user._id}`} style={{ textDecoration: 'none', color:"#DEEEEA" }}><ListItem alignItems="center" key={i}>
          <ListItemAvatar>
            <Avatar alt="user photo" src={`${user.imageAccount}`} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography color="secondary" style={{fontWeight: 700}}>
                  {user.firstName} {user.lastName}
              </Typography>
          }
          />
          </ListItem>
          </Link>
        })
      }
      
    </List>
  );
}
}

export default withRouter(Messages);