import React, { Component } from 'react'
import axios from 'axios';
import { Link} from "react-router-dom";
import {API_URL} from '../../config.js'
import {CardActionArea, Card, CardMedia, IconButton, CardContent, CardActions, Typography, Divider, AppBar, Tab, LinearProgress, Avatar, Collapse} from '@material-ui/core'
import { TabList, TabPanel, TabContext} from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class EventsList extends Component {
    state = {
        events:[],
        hotzone: [],
        value: 1,
        progress: 0,
        expandedId: -1 
    }

    componentDidMount = async () => {
        try {
            let response = await axios.get(`${API_URL}/api/events`, {withCredentials: true})
            this.setState({
                events: response.data
        })
            let eventsFiltered = await axios.get(`${API_URL}/api/events/hotzone`, {withCredentials: true})
            this.setState({
                hotzone: eventsFiltered.data.eventsFiltered,
                progress: eventsFiltered.data.progress
        })

        }
        catch (err) {
            console.log('Event fetch failed', err)
        }
    }

    handleChange = async (e, newValue) => {
        this.setState({
            value: newValue
        })
    }

    handleExpandedId = async (i) => {
        this.setState({
            expandedId: this.state.expandedId === i ? -1 : i
        })
        
    }

    render() {
        const {events, value, hotzone, progress} = this.state
        return (
            <div>
                <TabContext value={value}>
                    <AppBar position="static">
                        <TabList onChange={this.handleChange} aria-label="simple tabs example">
                            <Tab label="Next events" value="1" />
                            <Tab label="Hot zone" value="2" />
                        </TabList>
                    </AppBar>
                    <TabPanel value="1">
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
                                                {event.start} 
                                            </Typography>
                                            <Divider light />
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            {event.address}
                                            </Typography>
                                            <Divider light />
                                            {
                                                event.categories.map((category) => {
                                                    return <p>{category}</p>
                                                })
                                            }
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            {event.category}
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
                    </TabPanel>
                    <TabPanel value="2">{
                        hotzone.map((zoneEvent, i) => {
                            return <Card key={i} style={{ backgroundColor: 'transparent' }}>
                                        <CardActionArea>
                                            <Link to={`/events/${zoneEvent._id}`} style={{ textDecoration: 'none' }}>
                                                <CardMedia
                                                component="img"
                                                alt="image-event"
                                                height="140"
                                                image={`${zoneEvent.imageEvent}`}
                                                title="image-event"
                                                />
                                            </Link>
                                            <CardContent>
                                                <LinearProgress variant="determinate" value={progress} />
                                                <Typography gutterBottom variant="h5" component="h2" >
                                                    {zoneEvent.name}
                                                </Typography>
                                                <Divider light />
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {zoneEvent.start} 
                                                </Typography>
                                                <Divider light />
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                {zoneEvent.address}
                                                </Typography>
                                                <Divider light />
                                                {
                                                    zoneEvent.categories.map((category) => {
                                                        return <p>{category}</p>
                                                    })
                                                }
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                {zoneEvent.category}
                                                </Typography>
                                                <Divider light />
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                {zoneEvent.capacity - zoneEvent.ticketsSold.length}
                                                </Typography>
                                            </CardContent>
                                                <Typography>
                                                    {zoneEvent.checkIn.length}  people checkedIn
                                                </Typography>
                                        </CardActionArea>
                                        <CardActions disableSpacing>
                                            <IconButton
                                            onClick={() => this.handleExpandedId(i)}
                                            aria-expanded={this.state.expandedId === i}
                                            aria-label="show more"
                                            >
                                            <ExpandMoreIcon />
                                            </IconButton>
                                        </CardActions>
                                        <Collapse in={this.state.expandedId === i} timeout="auto" unmountOnExit>
                                            <CardContent>
                                            {
                                                zoneEvent.checkIn.map((user) => {
                                                    return <Avatar alt="Remy Sharp" src={`${user.imageAccount}`} />
                                                })
                                            }
                                            </CardContent>
                                        </Collapse>
                                    </Card>
                        })
                    }
                    </TabPanel>
                </TabContext>
            </div>
        )
    }
    
}

export default EventsList;


