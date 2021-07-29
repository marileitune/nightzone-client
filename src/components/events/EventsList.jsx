import React, { Component } from 'react'
import axios from 'axios';
import { Link, Redirect, withRouter} from "react-router-dom";
import {API_URL} from '../../config.js'
import { Tooltip, CardActionArea, Card, CardMedia, IconButton, CardContent, CardActions, Typography, Divider, AppBar, Tab, LinearProgress, Avatar, Collapse} from '@material-ui/core'
import { Grid, Button } from '@material-ui/core';
import { TabList, TabPanel, TabContext, Alert} from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Filter from './Filter.jsx'
import FilterListIcon from '@material-ui/icons/FilterList';
import EventIcon from '@material-ui/icons/Event';
import PlaceIcon from '@material-ui/icons/Place';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import PoolIcon from '@material-ui/icons/Pool';//Swimming Pool category
import LocalBarIcon from '@material-ui/icons/LocalBar'; //Drinks category
import DeckIcon from '@material-ui/icons/Deck';//Outdoor party category
import AudiotrackIcon from '@material-ui/icons/Audiotrack';//Music category
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';//Costume category
import SportsEsportsIcon from '@material-ui/icons/SportsEsports'; //Game party category
import MicIcon from '@material-ui/icons/Mic';//karaoke category
import HouseIcon from '@material-ui/icons/House';//house party category
import {BorderLinearProgress, BorderLinearProgressMid, BorderLinearProgressRock} from '../../DefaultTheme'


class EventsList extends Component {

    state = {
        events:[],
        hotzone: [],
        value: "1",
        progress: 0,
        expandedId: -1,
        showFilter: false,
        filteredEvents: [],
        searchText: '',
        startDate: null,
        ticketType: null,
        cities: [],
        city: null
    }

    componentDidMount = async () => {
        try {
            let response = await axios.get(`${API_URL}/api/events`, {withCredentials: true})
            this.setState({
                events: response.data,
                filteredEvents: response.data
        })

            response.data.forEach((elem) => {
                !this.state.cities.includes(elem.city) && this.state.cities.push(elem.city)
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

    getCategoryIcon = (category) => {
        switch(category) {
            case 'houseParty':
                return <HouseIcon/>
                break;
            case 'outdoorParty':
                return <DeckIcon/>
                break;
            case 'music':
                return <AudiotrackIcon/>
                break;
            case 'karaoke':
                return <MicIcon/>
                break;
            case 'gameParty':
                return <SportsEsportsIcon/>
                break;
            case 'drinks':
                return <LocalBarIcon/>
                break;
            case 'costumeParty':
                return <EmojiNatureIcon/>
                break;
            case 'swimmingPool':
                return <PoolIcon/>
                break;
            default: 
          }
    }

    handleExpandedId = async (i) => {
        this.setState({
            expandedId: this.state.expandedId === i ? -1 : i
        })
        
    }

    handleProgress = (progress) => {
        const progressInt = Math.round(progress)
        if (progressInt<20){
            return <Tooltip title={"This party could be better"} >
                        <BorderLinearProgress variant="determinate" value={progress}/> 
                    </Tooltip>
        } else if (progressInt>=20 && progressInt<50){
            return <Tooltip title={"Maybe this party get better. You should try."} >
                        <BorderLinearProgressMid variant="determinate" value={progress}/> 
                    </Tooltip>
        } else {
            return <Tooltip title={"This party is rocking and you are missing. RUN!"} >
                        <BorderLinearProgressRock variant="determinate" value={progress}/> 
                    </Tooltip>
        }
    }




    handleShowFilters = async () => {
        const {showFilter} = this.state
        if (showFilter) {
            await this.setState({
                showFilter: false
            }) 
        } 
        else {
            await this.setState({
                showFilter: true
            })      
        }
    }

    handleSearchName = async (e) => {
        let searchedEvent = e.target.value
        await this.setState({searchText: searchedEvent})
        this.handleFilterGeneral()
    }

    filterDate = async (e) => {
        let searchedDate = e.target.value
        await this.setState({startDate: searchedDate})
        this.handleFilterGeneral()
    }

    filterCity = async (e) => {
        let searchedCity = e.target.value
        await this.setState({city: searchedCity})
        this.handleFilterGeneral()
    }

    filterTicketType = async (e) => {
        let searchedType = e.target.value
        await this.setState({ticketType: searchedType})
        this.handleFilterGeneral()
    }

    handleFilterGeneral = async () => {
        const {events, searchText, startDate, ticketType, city} = this.state
        let filteredEvents = events

        if(searchText !== '') {
            filteredEvents = filteredEvents.filter((event) => {
                return event.name.toLowerCase().includes(searchText.toLowerCase())
            })
        }
        
        if(startDate !== null) {
            filteredEvents= filteredEvents.filter((event) => {
                let filterDate = startDate
                let day = new Date(event.start).getDate();
                let month = new Date(event.start).getMonth() + 1;
                let year = new Date(event.start).getFullYear();
                if (day < 10) {
                    day = '0' + day;
                }
                if (month < 10) {
                    month = '0' + month;
                }
                let dateFormated = year + '-' + month + '-' + day;
                
                console.log(filterDate, 'filterdate')
                console.log(dateFormated, 'eventStartDate')
                return filterDate == dateFormated
            })
        }
        
        if (ticketType !== null) {
            filteredEvents = filteredEvents.filter((event) => {
                if (ticketType == "paid") {
                    return event.isPaid 
                } else {
                    return event.isPaid == false
                }
                
            })
        }

        if (city !== null) {
            filteredEvents = filteredEvents.filter((event) => {
                return event.city == city
            })
        }

        // update the events state to filteredEvents 
        await this.setState({
            filteredEvents: filteredEvents
        })
    }

    handleClean = async () => {
        await this.setState({
            searchText: '',
            startDate: "",
            ticketType: null,
            city: null,
            filteredEvents: this.state.events
        })
    }

    render() {
        {
            if (!this.props.user) {
                //redirect to auth page 
                return <Redirect to={'/auth'} />
            }
        }
        const {events, value, hotzone, progress, showFilter, filteredEvents, cities, searchText, city, startDate, ticketType} = this.state
        return (

            <div style={{marginTop: '60px'}}>
                <TabContext value={value}>
                    <AppBar color="#231E23" position="static">
                        <TabList onChange={this.handleChange} aria-label="simple tabs example" value={value} >
                            <Tab label="Next events" value="1" style={{color: '#DEEEEA', fontWeight: 700}} />
                            <Tab label="Hot zone" value="2" style={{color: '#DEEEEA', fontWeight: 700}} />
                        </TabList>
                    </AppBar>
                    <TabPanel value="1">
                    <Button variant="outlined" className="CustomStrokeButton" onClick={this.handleShowFilters}><FilterListIcon/>Filters</Button>
                    {
                        showFilter && <Filter onSearch={this.handleSearchName} text={searchText} city={city} startDate={startDate} ticketType={ticketType} onDate={this.filterDate} onTicketType={this.filterTicketType} cities={cities} onCity={this.filterCity} onClean={this.handleClean}/>
                    }
                        
                            <Grid container spacing={3} direction="row">
                            {
                            filteredEvents.map((event, i) => {
                            return <>
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}  direction="column" spacing={5} >
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
                                            <Grid container  wrap="nowrap" spacing={2} direction="column">
                                                {/* NAME */}
                                                <Grid>
                                                    <Typography gutterBottom variant="h5" component="h2" style={{fontWeight: 700}}>
                                                        {event.name}
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
                                                            {event.start} 
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
                                                            {event.address} 
                                                        </Typography>
                                                    </Grid>
                                                   
                                                </Grid>
                                                <Divider light />
                                                {/* TICKETS AVAILABLE */}
                                                <Grid container wrap="nowrap" spacing={2}>
                                                        <Grid item>
                                                            <ConfirmationNumberIcon/>
                                                        </Grid>
                                                        <Grid item xs>
                                                                <Typography variant="body2" component="p">
                                                                    {event.capacity - event.ticketsSold.length} tickets available
                                                                </Typography>
                                                        </Grid>         
                                                </Grid>
                                                {/* CATEGORIES*/}
                                                <Grid container wrap="nowrap" spacing={2}>
                                                {
                                                    event.categories.map((category) => {
                                                        return <div>
                                                            <Grid item xs>{
                                                                this.getCategoryIcon(category)
                                                            }
                                                            </Grid>  
                                                        </div>
                                                    })
                                                }
                                                </Grid>
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
                    <TabPanel value="2">
                        <Grid container spacing={3} direction="row">
                            {
                            hotzone.map((zoneEvent, i) => {
                            return <>
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} spacing={5} >
                                <Card key={i} style={{ backgroundColor: 'transparent' }}>
                                <Link to={`/events/${zoneEvent._id}`} style={{ textDecoration: 'none', color:"#DEEEEA" }}>
                                    <CardActionArea>
                                        <CardMedia
                                        component="img"
                                        alt="image-event"
                                        height="300px"
                                        image={`${zoneEvent.imageEvent}`}
                                        title="image-event"
                                        />
                                            {
                                            this.handleProgress(progress)
                                            }
                                        <CardContent>
                                            <Grid container direction="column">
                                                {/* NAME */}
                                                <Grid>
                                                    <Typography gutterBottom variant="h5" component="h2" style={{fontWeight: 700}}>
                                                        {zoneEvent.name}
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
                                                            {zoneEvent.start} 
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
                                                            {zoneEvent.address} 
                                                        </Typography>
                                                    </Grid>
                                                   
                                                </Grid>
                                                <Divider light />
                                                {/* TICKETS AVAILABLE */}
                                                <Grid container wrap="nowrap" spacing={2}>
                                                        <Grid item>
                                                            <ConfirmationNumberIcon/>
                                                        </Grid>
                                                        <Grid item xs>
                                                                <Typography variant="body2" component="p">
                                                                    {zoneEvent.capacity - zoneEvent.ticketsSold.length} tickets available
                                                                </Typography>
                                                        </Grid>         
                                                </Grid>
                                                {/* CATEGORIES*/}
                                                <Grid container wrap="nowrap" spacing={2}>
                                                {
                                                    zoneEvent.categories.map((category) => {
                                                        return <div>
                                                            <Grid item xs>{
                                                                this.getCategoryIcon(category)
                                                            }
                                                            </Grid>  
                                                        </div>
                                                    })
                                                }
                                                </Grid>
                                                {/* CHECK IN */}
                                                <Grid container wrap="nowrap" spacing={2}>
                                                        <Grid item>
                                                            <Typography style={{fontWeight: 700}}>{zoneEvent.checkIn.length}</Typography>
                                                        </Grid>
                                                        <Grid item xs>
                                                                <Typography variant="body2" component="p">
                                                                    people checked in
                                                                </Typography>
                                                        </Grid>         
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
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
                                            <Grid container wrap="nowrap" spacing={2}>
                                                {
                                                    zoneEvent.checkIn.map((user) => {
                                                        return <Grid item>
                                                            <Link to={`${`/account/${user._id}`}`}> 
                                                                <Tooltip title={`${user.firstName} ${user.lastName}`} >
                                                                    <Avatar alt="user photo" src={`${user.imageAccount}`} />
                                                                </Tooltip>
                                                            </Link>
                                                        </Grid>
                                                    })
                                                }
                                            </Grid>
                                                
                                        </CardContent>
                                    </Collapse>
                            </Card>
                            </Grid>
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

export default withRouter(EventsList);


