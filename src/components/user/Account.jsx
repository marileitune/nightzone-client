import React, { Component } from 'react'
import axios from 'axios';
import { Link, withRouter } from "react-router-dom";
import {API_URL} from '../../config.js'
import {CardActionArea, Grid, Card, CardMedia, Button, CardContent, Typography, Divider, AppBar, Tab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'
import { TabList, TabPanel, TabContext} from '@material-ui/lab'
import EventIcon from '@material-ui/icons/Event';
import PlaceIcon from '@material-ui/icons/Place';

class Account extends Component {

    state = {
        value: "1",
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

    handleClickOpen = async  () => {
        await this.setState({
            open: true
        })
    };
    
    handleClose = async () => {
        await this.setState({
            open: false
        })
    };

    render() {
        const {value, ticketsBought, eventsCreated, user} = this.state
        return (
            <div style={{marginTop: '60px'}}>
                
                <TabContext value={value}>
                    <AppBar color="#231E23" position="static">
                        <TabList onChange={this.handleChange} aria-label="simple tabs example" value={value} >
                            <Tab label="My tickets" value="1" style={{color: '#DEEEEA', fontWeight: 700}} />
                            <Tab label="My events" value="2" style={{color: '#DEEEEA', fontWeight: 700}} />
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
                                        <Link to={`/events/${event.event._id}`} style={{ textDecoration: 'none', color:"#DEEEEA" }}>
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
                                            <Grid container  wrap="nowrap" spacing={2} direction="column">
                                                {/* NAME */}
                                                <Grid>
                                                    <Typography gutterBottom variant="h5" component="h2" style={{fontWeight: 700}}>
                                                        {event.event.name}
                                                    </Typography>
                                                <Divider light />
                                                </Grid>                                       
                                                {/* START */}
                                                <Grid container wrap="nowrap" spacing={2}>
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
                                                <Grid container wrap="nowrap" spacing={2}>
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
                                        {/* CHECK IN */}
                                        <Grid container wrap="nowrap" spacing={2} direction="column">
                                                {
                                                    event.canCheckIn ? (<>
                                                    <Grid item>
                                                        <Typography style={{fontWeight: 700}}>Please, only click this button when the receptionist order to.</Typography>
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Button variant="contained" className="CustomButton" onClick={this.handleClickOpen}>CHECK IN</Button>
                                                    </Grid>
                                                    </>)  :
                                                    (<>
                                                        <Grid item xs>
                                                            <Button variant="outlined" className="CustomDisableButton" >CANNOT CHECK IN</Button>
                                                        </Grid>
                                                    </>) 
                                                            
                                                }
                                        </Grid>
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
                                            <Grid container direction="column">
                                                {/* NAME */}
                                                <Grid>
                                                    <Typography gutterBottom variant="h5" component="h2" style={{fontWeight: 700}}>
                                                        {event.name}
                                                    </Typography>
                                                <Divider light />
                                                </Grid>                                       
                                                {/* TICKETS SOLD */}
                                                <Grid container wrap="nowrap" spacing={2}>
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
                                                {/* CHECK IN */}
                                                <Grid container wrap="nowrap" spacing={2}>
                                                    <Grid item>
                                                        <Typography style={{fontWeight: 700}}>{event.checkIn.length}</Typography>
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Typography variant="body2" component="p">
                                                            people checked in
                                                        </Typography>
                                                    </Grid> 
                                                </Grid>
                                                <Divider light />
                                               <Link to={`/events/${event._id}/edit`} style={{ textDecoration: 'none', color:"#DEEEEA" }}>
                                                    <Button variant="contained" className="CustomButton">EDIT</Button>
                                                </Link>
                                            </Grid>
                                        </CardContent>
                                    </CardActionArea>
                                </Link>

                            </Card>
                            </Grid>
                             {/* dialog */}
                                <Dialog
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to check in?"}</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        This is your unique ticket for the event and this action cannot be undone.
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button variant="outlined" className="CustomStrokeButton" onClick={() => this.handleCheckIn(event.event._id)} >
                                        Yes
                                    </Button>
                                    <Button onClick={this.handleClose} variant="contained" autoFocus className="CustomButton" >
                                        No
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </>
                            })
                            }
                            </Grid>
                    </TabPanel>
                </TabContext>
            </div>
        )
    }
}


export default withRouter(Account);



