import React, { Component } from 'react'
import axios from 'axios';
import { Link, withRouter } from "react-router-dom";
import {API_URL} from '../../config.js'
import {CardActionArea, Card, CardMedia, Button, CardContent, Typography, Divider, AppBar, Tab} from '@material-ui/core'
import { TabList, TabPanel, TabContext} from '@material-ui/lab'
class Account extends Component {

    state = {
        value: 1,
        ticketsBought: [],
        eventsCreated: [],
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

            let userId = this.props.match.params.userId
            let response = await axios.get(`${API_URL}/api/account/${userId}`, {withCredentials: true})
            await this.setState({
                ticketsBought: response.data.ticketsBought,
                eventsCreated: response.data.eventsCreated
            })
        }
        catch (err) {
            console.log('User events fetch failed', err)
        }
    }

    handleCheckIn = async (eventId) => {
        await axios.get(`${API_URL}/api/events/${eventId}/checkIn`, {withCredentials: true})
        this.props.history.push('/events')
    }

    handleChange = async (e, newValue) => {
        await this.setState({
            value: newValue
        })
    }


    render() {
        const {value, ticketsBought, eventsCreated, user} = this.state
        console.log(eventsCreated)
        return (
            <div>
                { user !== null && this.props.match.params.userId !== user._id &&  <Link to={`/chat/${this.props.match.params.userId }`}><Button variant="contained" color="primary">CHAT</Button></Link>}
                <TabContext value={value}>
                    <AppBar position="static">
                        <TabList onChange={this.handleChange} aria-label="simple tabs example">
                            <Tab label="My tickets" value="1" />
                            <Tab label="My events" value="2" />
                        </TabList>
                    </AppBar>
                    <TabPanel value="1">
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
                    </TabPanel>
                    <TabPanel value="2">
                        {
                            eventsCreated.map((event, i) => {
                                return <Card key={i} style={{ backgroundColor: 'transparent' }}>
                                    <CardActionArea>
                                        <Link to={`/events/${event._id}`} style={{ textDecoration: 'none' }}>
                                            <CardMedia
                                            component="img"
                                            alt="image-event"
                                            height="140"
                                            image={`${event.imageEvent}`}
                                            title="image-event"
                                            />
                                        </Link>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2" >
                                                {event.name}
                                            </Typography>
                                            <Divider light />
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {event.ticketsSold.length} tickets sold
                                            </Typography>
                                            <Divider light />
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {event.checkIn.length} people checked in
                                            </Typography>
                                            <Divider light />
                                            <Link to={`/events/${event._id}/edit`}>
                                                <Button variant="contained" color="primary">EDIT</Button>
                                            </Link>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            })
                        }
                    </TabPanel>
                </TabContext>
            </div>
        )
    }
}


export default withRouter(Account);



