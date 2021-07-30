import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../../config.js'
import io from "socket.io-client";
import { withRouter } from "react-router-dom";
import {Button, Typography, Grid} from '@material-ui/core'
import {CssTextField} from '../../DefaultTheme'

let socket = ''

class ChatPage extends Component {
    // Assing a ref to the messages div
    messagesEnd = React.createRef()
    state = {
        user: this.props.user,
        loading: true, 
        messageList: [],
        currentMessage: '',
        conversationId: ''
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount = async () => {

        //setup your socket connection with the server
        socket = io(`${API_URL}`);

        let userResponse = await axios.get(`${API_URL}/api/user`, {withCredentials: true})
         this.setState({
           user: userResponse.data
         })

        let participants = [this.state.user._id, this.props.match.params.userId ]
        let conversation = await axios.post(`${API_URL}/api/conversation`, {participants}, {withCredentials: true})    

        let conversationId = conversation.data._id
        let response = await axios.get(`${API_URL}/api/messages/${conversationId}`)

        await this.setState({
            loading: false, 
            messageList: response.data,
            conversationId: conversationId
        }, () => {
            this.scrollToBottom();
        })

        // ensure that the user is connected to a specific chat via webSocket    
        socket.emit("join_chat", conversationId);

        //Handle incoming messages from webSocket
        socket.on("receive_message", (data) => {
            console.log('Got data', data)
            this.setState({
                messageList: [...this.state.messageList, data]
            }, () => {
                this.scrollToBottom();
            })
        });    
    }

    handleMessageInput = async (e) => {
        await this.setState({
            currentMessage: e.target.value
        })
    }

    sendMessage = async () => {
        // Create the object structure
        let messageContent = {
            chatId: this.state.conversationId,
            content: {
              sender: this.state.user._id,
              message: this.state.currentMessage,
            },
          };          
          // emit it so that everyone connected to the same chat receives the message
        await socket.emit("send_message", messageContent);

        messageContent.content.sender = this.state.user

        await this.setState({
            messageList: [...this.state.messageList, messageContent.content],
            currentMessage: ''
        }, () => {
            this.scrollToBottom();
        })
    }


    render() {
        const { loading , messageList} = this.state
        const { user } = this.state

        if (loading) {
            <p>Loading all messages . . .</p>
        }

        return (
            <>
                <Grid
                    container
                    className="chatContainer"
                    spacing={0}
                    align="left"
                    justify="center"
                    alignItems="center"
                    direction="column"
                    style={{ color: '#DEEEEA', marginTop: '12%'}}
            >
                    <Grid item >
                        <Grid className="messages" style={{ marginBottom: '5%'}}>
                            {
                                messageList.map((val) => {
                                    return (
                                        <Grid style={{ marginBottom: '2.5%'}} key={val._id} className="messageContainer" id={val.sender._id == user._id ? "You" : "Other"}>
                                            <Typography color="secondary" className="messageIndividual">
                                                {val.sender._id == user._id?  "You" : val.sender.firstName }: {val.message}
                                            </Typography>
                                        </Grid>
                                    );
                                })
                            }
                            <div style={{ float:"left", clear: "both" }}
                                ref={(el) => { this.messagesEnd = el; }}>
                            </div>
                        </Grid>
                        <Grid className="messageInputs" >
                            <CssTextField style={{ marginBottom: '3%'}}  id="outlined-basic" variant="outlined" value={this.state.currentMessage} type="text" placeholder="Write a message"
                                onChange={this.handleMessageInput}
                            />
                            <Grid>
                                <Button variant="contained" className="CustomButton" onClick={this.sendMessage}>Send</Button>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            
          
                    
           
            </>
        )
    }
}

export default withRouter(ChatPage)