import React, { Component } from 'react'
import axios from 'axios';
import { Link, withRouter } from "react-router-dom";
import {API_URL} from '../../config.js'
import {CardActionArea, Card, Button, CardMedia, CardContent, Typography, Divider} from '@material-ui/core'

class Account extends Component {

    state ={
        ticketsBought: [],
        eventsCreated: [],
    }
    
    componentDidMount = async () => {
        try {
            let userId = this.props.match.params.userId
            let response = await axios.get(`${API_URL}/api/account/${userId}`, {withCredentials: true})
            await this.setState({
                ticketsBought: response.data.ticketsBought,
                eventsCreated: response.data.eventsCreated
            })
        console.log('her',this.state.ticketsBought)

        }
        catch (err) {
            console.log('User events fetch failed', err)
        }
    }

    handleCheckIn = async (eventId) => {
        let response = await axios.get(`${API_URL}/api/events/${eventId}/checkIn`, {withCredentials: true})
        this.props.history.push('/events')
    }
    render() {
        const {ticketsBought} = this.state

        return (
            <div>
                {
                    ticketsBought.map((event, i) => {
                        return <Card key={i} style={{ backgroundColor: 'transparent' }}>
                            <CardActionArea>
                                <Link to={`/events/${event.event._id}`} style={{ textDecoration: 'none' }}>
                                    <CardMedia
                                    component="img"
                                    alt="image-event"
                                    height="140"
                                    image={`${event.event.imageEvent}`}
                                    title="image-event"
                                    />
                                </Link>
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" >
                                        {event.event.name}
                                    </Typography>
                                    <Divider light />
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {event.event.start} 
                                    </Typography>
                                    <Divider light />
                                    <Typography variant="body2" color="textSecondary" component="p">
                                       {event.event.address}
                                    </Typography>
                                    <Divider light />
                                    {
                                        event.canCheckIn && (<>
                                        <p>Please, only click this button when the receptionist order to.</p>
                                        <Button variant="contained" color="primary" onClick={() => this.handleCheckIn(event.event._id)}>CHECK IN</Button>
                                        </>)
                                    }
                                    </CardContent>
                                </CardActionArea>
                                
                            </Card>
                    })
                }
            </div>
        )
    }
}


export default withRouter(Account);