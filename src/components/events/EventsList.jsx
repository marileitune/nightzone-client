import React, { Component } from 'react'
import axios from 'axios';
import { Link, Redirect} from "react-router-dom";
import {API_URL} from '../../config.js'
import { Tooltip, CardActionArea, Card, CardMedia, IconButton, CardContent, CardActions, Typography, Divider, AppBar, Tab, LinearProgress, Avatar, Collapse} from '@material-ui/core'
import { TextareaAutosize, Button } from '@material-ui/core';
import { TabList, TabPanel, TabContext, Alert} from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Filter from './Filter.jsx'

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

   a11yProps(index) {
        return {
          id: `scrollable-auto-tab-${index}`,
          "aria-controls": `scrollable-auto-tabpanel-${index}`
        };
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

    filterCategories = async () => {
        try {

        }
        catch (err) {

        }
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
                    <AppBar color="transparent" position="static">
                        <TabList onChange={this.handleChange} aria-label="simple tabs example" value={value}>
                            <Tab label="Next events" value="1" style={{color: '#DEEEEA', fontWeight: 700}} {...this.a11yProps(0)} />
                            <Tab label="Hot zone" value="2" style={{color: '#DEEEEA', fontWeight: 700}} {...this.a11yProps(1)}/>
                        </TabList>
                    </AppBar>
                    <TabPanel value="1">
                    <Button variant="contained" color="primary" onClick={this.handleShowFilters}>FILTERS</Button>
                    {
                        showFilter && <Filter onSearch={this.handleSearchName} text={searchText} city={city} startDate={startDate} ticketType={ticketType} onDate={this.filterDate} onTicketType={this.filterTicketType} cities={cities} onCity={this.filterCity} onClean={this.handleClean}/>
                    }
                        {
                        filteredEvents.map((event, i) => {
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
                                                    return  <Link to={`${`/account/${user._id}`}`}> 
                                                                <Tooltip title={`${user.name}`} >
                                                                    <Avatar alt="user photo" src={`${user.imageAccount}`} />
                                                                </Tooltip>
                                                            </Link>
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


