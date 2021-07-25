import React, { Component } from 'react'
import axios from 'axios';
import { Link, withRouter } from "react-router-dom";
import {API_URL} from '../../config.js'
import {CircularProgress, Button} from '@material-ui/core'
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
import Payment from "./Payment";

class EventDetail extends Component {

    state = {
        eventDetail: null,
        showPayment: false,
        canBuy: true,
    }

    async componentDidMount(){
        try {
            //check the `<Routes>` in App.js. That's where the params `eventId` comes from
            let eventId = this.props.match.params.eventId
            let response = await axios.get(`${API_URL}/api/events/${eventId}`, {withCredentials: true})
            this.setState({
                eventDetail: response.data.event,
                canBuy: response.data.canBuy
            })
        }  
        catch(err){
            console.log('Event fetch failed', err)
        }
    }

    handleShowPayment = async() => {
        await this.setState({
            ...this.state, showPayment: true
        })
    }

    handleClosePayment = async () => {
        await this.setState({
            showPayment: false
        })
    }

    render() {
        if (!this.state.eventDetail) {
            return <CircularProgress color="secondary" />
        } 
        
        const {eventDetail, showPayment, canBuy} = this.state
        const {user} = this.props
        // const promise = loadStripe("pk_test_51JFxmQGLw6mfE9JvfuXfSeVyUAiedGg0atoexZN0VMTrvtdSsIqfWycGgvcym3tSYV8eElXrGlHobUphaJe5z8ko00MEIHTnt7")
        return (
            <div>
                <p>{eventDetail.name}</p>
                <p>{eventDetail.start}</p>
                <p>{eventDetail.address}</p>
                <p>{eventDetail.city}</p>
                <p>{eventDetail.country}</p>
                <p>{eventDetail.host.firstName} {eventDetail.host.lastName}</p>
                <p>{eventDetail.ticketsSold.length} people will join</p>
                <p>{eventDetail.capacity - eventDetail.ticketsSold.length} tickets available</p>
                <p>{eventDetail.ticketsPrice}</p>
                {
                    //if there is ticket available and the state showPayment is true, show the Payment form. If not, check if the canBuy is true, and if yes show the button to BUY a ticket. If not, show nothing.
                    eventDetail.capacity - eventDetail.ticketsSold.length > 0 && canBuy ? (showPayment) ? (<Payment eventId={eventDetail._id} onClose={this.handleClosePayment} user={user} />) : (<Button variant="contained" color="primary" onClick={this.handleShowPayment}>BUY</Button>) : ""   
                } 
                <p>{eventDetail.description}</p>
                {
                    eventDetail.categories.map((category) => {
                        return <p>{category}</p>
                    })
                }
                {
                    eventDetail.comments.map((comment) => {
                        console.log(comment)
                        return <>
                        <p>{comment.comment}</p>
                        <p>{comment.authorId.firstName} {comment.authorId.lastName}</p>
                        </>
                    })
                }
            </div>
        )
    }
}

export default withRouter(EventDetail);
