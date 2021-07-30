
import React, { Component } from "react";
import {withRouter, Link } from "react-router-dom";
import axios from 'axios';
import {API_URL} from '../../config.js'
import {CardActionArea, Grid, Card, CardMedia, Button, CardContent, Typography, Divider, AppBar, Tab, Avatar} from '@material-ui/core'
import {CssTextField, Subtitle, Brand} from '../../DefaultTheme'
import { TabList, TabPanel, TabContext} from '@material-ui/lab'
import EventIcon from '@material-ui/icons/Event';
import PlaceIcon from '@material-ui/icons/Place';

class Profile extends Component {
    state = {
        user: this.props.user,
        fetchingUser: true,
        userFriend: '',
        ticketsBought: [],
        eventsCreated: [],
        value: "1"
    }

    componentDidMount = async () => {
        try {
            let userResponse = await axios.get(`${API_URL}/api/user`, {withCredentials: true})
            await this.setState({
              user: userResponse.data,
              fetchingUser: false,
            })

            let userId = this.props.match.params.userId
            let userIdResponse = await axios.get(`${API_URL}/api/account/${userId}`, {withCredentials: true})
            console.log(userIdResponse)
            await this.setState({
                userFriend: userIdResponse.data,
                ticketsBought: userIdResponse.data.ticketsBought,
                eventsCreated: userIdResponse.data.eventsCreated
            })
        }
        catch (err) {
            console.log('User events fetch failed', err)
        }
    }

    handleChange = async (e, newValue) => {
        await this.setState({
            value: newValue
        })
    }


    render() {
        const {userFriend, ticketsBought, eventsCreated, value} = this.state
        return (
            <div>
                <Grid container direction="column" style={{color:"#DEEEEA"}}>
                <Grid container direction="column" style={{marginTop:"7%"}} 
                spacing={0}
                    align="left"
                    justify="center"
                    alignItems="center"
                    direction="column" >
                 <img src={`${userFriend.imageAccount}`} style={{width: '10%', borderRadius: '50%', marginBottom:"1%"}}  />
                 <Grid item wrap="nowrap" spacing={2} style={{marginBottom:"1%"}}>
                    <Grid item >
                    <Typography style={{fontWeight: 700}}>
                        {userFriend.firstName} {userFriend.lastName} 
                    </Typography>
                    </Grid>
                </Grid>
                <Link to={`/chat/${this.props.match.params.userId }`} style={{ textDecoration: 'none', color:"#DEEEEA", marginBottom: '2%' }}><Button variant="contained" className="CustomButton"  >CHAT</Button></Link>
                </Grid>                              
                {/* NAME */}
                
                <Divider light />
                <TabContext value={value}>
                    <AppBar color="#231E23" position="static">
                        <TabList onChange={this.handleChange} aria-label="simple tabs example" value={value} >
                            <Tab label="Tickets bought" value="1" style={{color: '#DEEEEA', fontWeight: 700}} />
                            <Tab label="Events hosted" value="2" style={{color: '#DEEEEA', fontWeight: 700}} />
                        </TabList>
                    </AppBar>
                    <TabPanel value="1">
                            <Grid container spacing={3} direction="row">
                            {
                            ticketsBought.map((event, i) => {
                            return <>
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} spacing={5}>
                                <Card key={i} style={{ backgroundColor: 'transparent' }}>
                                    <CardActionArea>
                                        <Link to={`/events/${event._id}`} style={{ textDecoration: 'none', color:"#DEEEEA" }}>
                                        <CardMedia
                                        component="img"
                                        alt="image-event"
                                        height="300px"
                                        image={`${event.event.imageEvent}`}
                                        title="image-event"
                                        />
                                        <CardContent>
                                        <Grid container wrap="nowrap" spacing={2}>     
                                        </Grid>
                                            <Grid container  wrap="nowrap" spacing={2} direction="column" style={{paddingBottom: '2%'}}>
                                                {/* NAME */}
                                                <Grid>
                                                    <Typography gutterBottom variant="h5" component="h2" style={{fontWeight: 700}}>
                                                        {event.event.name}
                                                    </Typography>
                                                <Divider light />
                                                </Grid>                                       
                                                {/* START */}
                                                <Grid container wrap="nowrap" spacing={2} style={{paddingBottom: '2%'}}>
                                                    <Grid item>
                                                        <EventIcon/>
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Typography variant="body2" component="p">
                                                            {event.event.start} 
                                                        </Typography>
                                                    </Grid>
                                                   
                                                </Grid>
                                                <Divider light />
                                                {/* ADDRESS */}
                                                <Grid container wrap="nowrap" spacing={2} style={{paddingBottom: '2%'}}>
                                                    <Grid item>
                                                        <PlaceIcon/>
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Typography variant="body2" component="p">
                                                            {event.event.address} 
                                                        </Typography>
                                                    </Grid>                                                 
                                                </Grid>
                                                <Divider light />
                                             
                                            </Grid>
                                        </CardContent>
                                        </Link>     
                                    </CardActionArea>
                            </Card>
                                </Grid>
                            </>
                            })
                        }
                            </Grid>
                    </TabPanel>
                    <TabPanel value="2">
                        <Grid container spacing={3} flexPosition="row">
                            {
                            eventsCreated.map((event, i) => {
                            return <>
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} spacing={5} >
                                <Card key={i} style={{ backgroundColor: 'transparent' }}>
                                <Link to={`/events/${event._id}`} style={{ textDecoration: 'none', color:"#DEEEEA" }}>
                                    <CardActionArea>
                                        <CardMedia
                                        component="img"
                                        alt="image-event"
                                        height="300px"
                                        image={`${event.imageEvent}`}
                                        title="image-event"
                                        />
                                        <CardContent>
                                            <Grid container direction="column" style={{paddingBottom: '2%'}}>
                                                {/* NAME */}
                                                <Grid>
                                                    <Typography gutterBottom variant="h5" component="h2" style={{fontWeight: 700}}>
                                                        {event.name}
                                                    </Typography>
                                                <Divider light />
                                                </Grid>                                       
                                                {/* TICKETS SOLD */}
                                                <Grid container wrap="nowrap" spacing={2} style={{paddingBottom: '2%'}}>
                                                    <Grid item>
                                                        <Typography style={{fontWeight: 700}}>{event.ticketsSold.length}</Typography>
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Typography variant="body2" component="p">
                                                            tickets sold
                                                        </Typography>
                                                    </Grid> 
                                                </Grid>
                                                <Divider light />
                                            </Grid>
                                        </CardContent>
                                    </CardActionArea>
                                </Link>

                            </Card>
                            </Grid>
                            </>
                            })
                             }
                            </Grid>
                    </TabPanel>
                    </TabContext>
            </Grid>
        </div>
        )
    }
}

export default withRouter(Profile);