import React, { Component } from 'react'
import axios from 'axios';
import { Redirect, withRouter } from "react-router-dom";
import {API_URL} from '../../config.js'
import {CircularProgress, Grid, Button, Avatar, Typography, Divider, TextField} from '@material-ui/core'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
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
import Payment from "./Payment";
import {CssTextField, Subtitle, Brand} from '../../DefaultTheme'
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import EuroIcon from '@material-ui/icons/Euro';

class EventDetail extends Component {

    state = {
        eventDetail: null,
        showPayment: false,
        canBuy: true,
        user: null,
        fetchingUser: true, 
        comment: "",
        comments: []
    }

    componentDidMount = async () => {
        try {
            let userResponse = await axios.get(`${API_URL}/api/user`, {withCredentials: true})
            await this.setState({
              user: userResponse.data,
              fetchingUser: false,
            })
            //check the `<Routes>` in App.js. That's where the params `eventId` comes from
            let eventId = this.props.match.params.eventId
            let response = await axios.get(`${API_URL}/api/events/${eventId}`, {withCredentials: true})
            this.setState({
                eventDetail: response.data.event,
                comments: response.data.event.comments,
                canBuy: response.data.canBuy
            })

        }  
        catch(err){
            console.log('Event fetch failed', err)
        }
    }


    handleShowPayment = async() => {
        const {eventDetail} = this.state

        if (eventDetail.isPaid) {
            await this.setState({
                ...this.state, showPayment: true
            }) 
        } else {
            try {
                await axios.get(`${API_URL}/api/events/${eventDetail._id}/buy`, {withCredentials: true})
                this.props.history.push(`/account/${this.state.user._id}`)
              }
              catch(err) {
                  console.log('Event fetch failed', err)
              }
        }
    }

    handleClosePayment = async () => {
        await this.setState({
            showPayment: false
        })
    }


    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    handleSubmit = async () => {
        const {comment} = this.state
        let eventId = this.props.match.params.eventId
        let commentCreated = await axios.post(`${API_URL}/api/events/${eventId}/comment`, {comment}, {withCredentials: true})
        console.log(commentCreated)
        await this.setState({
            comments: [commentCreated.data.myCommentPopulated, ...this.state.comments,],
            comment: ""
        })

        let sortedComments = this.state.comments.sort((a,b) => {
            if (a.date > b.date) {
                return -1
            } else if (a.date < b.date){
                return 1
            } else {
                return 0
            }
        })
        
        await this.setState({
            comments: sortedComments
        })

        this.props.history.push(`/events/${eventId}`)
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

    render() {
        if (!this.state.eventDetail) {
            return <CircularProgress color="secondary" />
        } 

        {
            if (!this.state.user) {
                //redirect to signin page 
                return <Redirect to={'/auth'} />
            }
        }
        
        const {eventDetail, showPayment, canBuy, comments} = this.state
        const {user} = this.props
        const promise = loadStripe(process.env.REACT_APP_STRIPE_ID)
        return (
            <Grid
            container
            spacing={0}
            align="left"
            justify="center"
            alignItems="center"
            direction="column"
            style={{ color: '#DEEEEA', width: '90%' }}
            
            
            >
            <Grid item >
            <img src={`${eventDetail.imageEvent}`} alt="event image"  style={{marginTop: '12%', width: '40%', borderRadius: '5%'}}/>
            <Subtitle style={{fontWeight: 700, fontSize: '1.8rem', paddingBottom: '1%'}}>{eventDetail.name}</Subtitle>
            {/* START */}
            <Grid container wrap="nowrap" spacing={2} style={{paddingBottom: '1%'}}>
                     <Grid item>
                        <EventIcon/>
                    </Grid>
                    <Grid item xs>
                    <Typography>
                        {eventDetail.start} 
                    </Typography>
                    </Grid>
                    </Grid>
                    <Divider light />
                    {/* ADDRESS */}
                    <Grid container wrap="nowrap" spacing={2} style={{paddingBottom: '1%'}}>
                        <Grid item>
                            <PlaceIcon/>
                        </Grid>
                        <Grid item xs>
                            <Typography>
                                {eventDetail.address} 
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider light />
                    {/* HOST */}
                    <Grid container wrap="nowrap" spacing={2} style={{paddingBottom: '1%'}}>
                        <Grid item>
                            <PersonIcon/>
                        </Grid>
                        <Grid item xs>
                            <Typography>
                                {eventDetail.host.firstName} {eventDetail.host.lastName}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider light />
                    {/* TICKETS SOLD */}
                    <Grid container wrap="nowrap" spacing={2} style={{paddingBottom: '1%'}}>
                        <Grid item>
                            <GroupIcon/>
                        </Grid>
                        <Grid item xs>
                            <Typography>
                                {eventDetail.ticketsSold.length} people will join
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider light />
                    {/* TICKETS AVAILABLE */}
                    <Grid container wrap="nowrap" spacing={2} style={{paddingBottom: '1%'}}>
                        <Grid item>
                            <ConfirmationNumberIcon/>
                        </Grid>
                        <Grid item xs>
                            <Typography >
                                {eventDetail.capacity - eventDetail.ticketsSold.length} tickets available
                            </Typography>
                        </Grid>         
                    </Grid>
                    {/* ticket price */}
                    <Grid container wrap="nowrap" spacing={2} style={{paddingBottom: '1%'}}>
                        <Grid item>
                            <EuroIcon/>
                        </Grid>
                        <Grid item xs>
                            <Typography >
                            {eventDetail.ticketsPrice}
                            </Typography>
                        </Grid>  
                         
                    </Grid>
                    <Grid item xs style={{paddingBottom: '1%'}}>
                        {
                            //if there is ticket available and the state showPayment is true, show the Payment form. If not, check if the canBuy is true, and if yes show the button to BUY a ticket. If not, show nothing.
                            eventDetail.capacity - eventDetail.ticketsSold.length > 0 && canBuy ? (showPayment) ? (<Payment eventId={eventDetail._id} onClose={this.handleClosePayment} user={user} />) : (<Button variant="contained" className="CustomButton"  onClick={this.handleShowPayment}>RESERVE SPOT</Button>) : ""   
                        } 
                        </Grid>     
                    {/* DESCRIPTION */}
                    <Grid container wrap="nowrap" spacing={2} style={{paddingBottom: '1%'}}>
                        <Grid item>
                            <Typography >
                                {eventDetail.description}
                            </Typography>
                        </Grid>

                    </Grid>       
                  
                    {/* CATEGORIES */}
                    <Grid container wrap="nowrap" spacing={2} style={{paddingBottom: '3%'}}>
                        {
                            eventDetail.categories.map((category) => {
                                return <div style={{paddingRight: '1%'}}>
                                    <Grid item xs >
                                        <Button className="CustomFab">{this.getCategoryIcon(category)}</Button>
                                    </Grid>  
                                </div>
                            })
                        }
                    </Grid>
                    {/* ADD A COMMENT */}
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs>
                            <CssTextField
                                id="outlined-textarea"
                                label="Comment"
                                placeholder="Add a comment"
                                onChange={this.handleChange('comment')}
                                value={this.state.comment}
                                multiline
                                rows={4}
                                variant="outlined"
                            />  
                        </Grid>      
                    </Grid>
                        {/* SUBMIT COMMENT */}
                        <Grid container wrap="nowrap" spacing={2} style={{paddingBottom: '3%'}}>
                            <Grid item xs>
                                <Button variant="contained" className="CustomButton" onClick={this.handleSubmit}>SUBMIT</Button>
                            </Grid> 
                        </Grid>
                    {/* COMMENTS */}
                    <Grid container wrap="nowrap" direction="column" spacing={2} >
                    {
                        comments.map((comment) => {
                            return <>
                            <Grid container wrap="nowrap" spacing={2} direction="row" alignItems="center" > 
                                <Grid item ><Avatar alt="user photo" src={`${comment.authorId.imageAccount}`}/></Grid>
                                <Grid item xs><Typography style={{fontWeight: 700}}>{comment.authorId.firstName} {comment.authorId.lastName}<Typography style={{fontSize: '0.7rem'}}>{comment.date}</Typography></Typography></Grid>
                            </Grid>                            
                            <Grid item style={{paddingLeft: '56px', paddingBottom: '2%'}}><Typography>{comment.comment}</Typography></Grid>
                  
                            </>
                        })

                    }
                    </Grid>
            </Grid>
            </Grid>
        )
    }
}

export default withRouter(EventDetail);