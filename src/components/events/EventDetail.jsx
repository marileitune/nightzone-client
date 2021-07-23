import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import {API_URL} from '../../config.js'
import {CircularProgress, Button} from '@material-ui/core'

class EventDetail extends Component {

    state= {
        eventDetail: null
    }

    async componentDidMount(){
        try {
            //check the `<Routes>` in App.js. That's where the params `eventId` comes from
            let eventId = this.props.match.params.eventId
            let response = await axios.get(`${API_URL}/api/events/${eventId}`)
            this.setState({
                eventDetail: response.data
            })
        }  
        catch(err){
            console.log('Event fetch failed', err)
        }
    }
    render() {
        if (!this.state.eventDetail) {
            return <CircularProgress color="secondary" />
        } 
        const {eventDetail} = this.state
        console.log(eventDetail)
        return (
            <div>
                <p>{eventDetail.name}</p>
                <p>{eventDetail.startDate} ÀS {eventDetail.startTime}</p>
                <p>{eventDetail.address}</p>
                <p>{eventDetail.host.firstName} {eventDetail.host.lastName}</p>
                <p>{eventDetail.ticketsSold.length} people will join</p>
                <p>{eventDetail.capacity - eventDetail.ticketsSold.length} tickets available</p>
                <p>{eventDetail.ticketsPrice}</p>
                <Button variant="contained" color="primary">BUY</Button>
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

export default EventDetail;
