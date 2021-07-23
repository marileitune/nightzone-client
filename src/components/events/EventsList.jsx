import React, { Component } from 'react'
import axios from 'axios';
import { Link} from "react-router-dom";
import {API_URL} from '../../config.js'
import {CardActionArea, Card, CardMedia, CardContent, Typography, Divider} from '@material-ui/core'

class EventsList extends Component {
    state = {
        events:[]
    }

    componentDidMount = async () => {
        try {
            let response = await axios.get(`${API_URL}/api/events`, {withCredentials: true})
            this.setState({
                events: response.data
        })

        }
        catch (err) {
            console.log('Event fetch failed', err)
        }
    }

    render() {

        const {events} = this.state
        return (
            <div>
                {
                    events.map((event, i) => {
                        return <Card key={i} style={{ backgroundColor: 'transparent' }}>
                                <Link to={`/events/${event._id}`} style={{ textDecoration: 'none' }}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    alt="image-event"
                                    height="140"
                                    image={`${event.imageEvent}`}
                                    title="image-event"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" >
                                        {event.name}
                                    </Typography>
                                    <Divider light />
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {event.startDate} às {event.startTime}
                                    </Typography>
                                    <Divider light />
                                    <Typography variant="body2" color="textSecondary" component="p">
                                       {event.address}
                                    </Typography>
                                    <Divider light />
                                    <Typography variant="body2" color="textSecondary" component="p">
                                       {event.categories}
                                    </Typography>
                                    <Divider light />
                                    <Typography variant="body2" color="textSecondary" component="p">
                                       {event.capacity - event.ticketsSold.length}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                </Link>
                            </Card>
                    })
                }
            </div>
        )
    }
}

export default EventsList;
