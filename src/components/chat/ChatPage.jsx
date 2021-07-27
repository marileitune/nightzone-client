import axios from 'axios'
import React, { Component } from 'react'
import {API_URL} from '../../config.js'
import io from "socket.io-client";
import { withRouter } from "react-router-dom";

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

        console.log(response.data)
        console.log(this.state.user)

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
            <div>
                <h3>You're in the Chat Page </h3>
                <div className="chatContainer">
                    <div className="messages">
                        {
                            messageList.map((val) => {
                                return (
                                    <div key={val._id} className="messageContainer" id={val.sender._id == user._id ? "You" : "Other"}>
                                        <div className="messageIndividual">
                                            {val.sender._id == user._id?  "You" : val.sender.firstName }: {val.message}
                                        </div>
                                    </div>
                                );
                            })
                        }
                        <div style={{ float:"left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                    </div>
                    <div className="messageInputs">
                        <input value={this.state.currentMessage} type="text" placeholder="Message..."
                            onChange={this.handleMessageInput}
                        />
                        <button onClick={this.sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ChatPage)