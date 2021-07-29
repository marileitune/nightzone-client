import React, { Component } from 'react'
import {withRouter, Redirect} from  'react-router-dom';
import {API_URL} from '../../config.js'
import axios from 'axios';
import { TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid, FormControlLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {CssTextField, CustomCheckbox, CustomSelect, CustomDateInput} from '../../DefaultTheme'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class EditEvent extends Component {

    state = {
        eventDetail: null,
        name: '',
        start: '',
        end: '',
        address: '',
        country: '',
        city: '',
        isPaid: false,
        ticketsPrice: 0,
        capacity: 0,
        categories: [],
        description: '',
        imageEvent: '',
        imageFile: '',
        countriesOptions: [],
        citiesOptions: [],
        open: false, 
        user: this.props.user,
        fetchingUser: true
        // error: null
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
            await this.setState({
                eventDetail: response.data.event,
                name: response.data.event.name,
                start: response.data.event.start,
                end: response.data.event.end,
                address: response.data.event.address,
                country: response.data.event.country,
                city: response.data.event.city,
                isPaid: response.data.event.isPaid,
                ticketsPrice:response.data.event.ticketsPrice,
                capacity:response.data.event.capacity,
                categories: response.data.event.categories,
                description: response.data.event.description,
                imageEvent: response.data.event.imageEvent,
            })

            let countries = await axios.get(`https://countriesnow.space/api/v0.1/countries`)
            await this.setState ({
                countriesOptions: countries.data.data
            })

            const countryTarget = this.state.countriesOptions.find((elem) => {
                return  elem.country == this.state.country
             })
            await this.setState({
                 citiesOptions: countryTarget.cities
            })
        }  
        catch(err){
            console.log('Event fetch failed', err)
        }
    }
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    handleImage = async (e) => {
        this.setState({ imageFile: e.target.files[0] });
    }

    handleCheck = () => {
        const {isPaid} = this.state
        if (isPaid === false) {
            this.setState({isPaid: true})
        } else {
            this.setState({isPaid: false})
        }
    } 

    handleCategories = async (category) => {
        console.log(category)
        try {
            const {categories} = this.state
            if(categories.includes(category)) {
               const index = categories.indexOf(category)
               console.log('index', index)
               categories.splice(index, 1)
               await this.setState({categories: categories})
            } 
            else {
                const newCategories = categories.concat(category)
                await this.setState({
                    categories: newCategories
               })
            }
            console.log(this.state.categories)
        }
        catch (err) {
            console.log('Categories failed', err)
        }
    } 

    handleCountry = async (country) => {

        await this.setState({
            country: country
        })

        const countryTarget = this.state.countriesOptions.find((elem) => {
           return  elem.country == this.state.country
        })

        const cities = countryTarget.cities
        await this.setState({
            citiesOptions: cities
        })
    }

    handleCity = async (city) => {
        this.handleChange('city')(city)
    }

    handleEditEvent = async () => {
        try {
            
            let formData = new FormData()
            if (this.state.imageFile) {
                formData.append('imageUrl', this.state.imageFile)
                let imgResponse = await axios.post(`${API_URL}/api/upload`, formData)
                await this.setState({
                    imageEvent: imgResponse.data.image
                })
            }

            const {name, start, end, address, country, city, isPaid, ticketsPrice, capacity, categories, description, imageEvent} = this.state
            let editedEvent = { 
                name: name, 
                start: start,
                end: end, 
                address: address, 
                country: country, 
                city: city, 
                isPaid: isPaid,
                ticketsPrice: isPaid == false ?  0 :  ticketsPrice,
                capacity: capacity, 
                categories: categories, 
                description: description, 
                imageEvent: imageEvent
            }


            // pass a second parameter to the patch for sending info to your server inside req.body
            let eventId = this.props.match.params.eventId
            let response = await axios.patch(`${API_URL}/api/events/${eventId}`, editedEvent)

            // if (response.data.event.errorMessage) {
            //     await this.setState({...this.state, error: response.data.event.errorMessage})
            //     return
            //  }

            let user = this.state.user
            this.props.history.push(`/account/${user._id}`)

        }
        catch (err) {
            console.log('Edit failed', err)
        }
        
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

    handleDeleteEvent = async () => {
        try {
            let eventId = this.props.match.params.eventId
            await axios.delete(`${API_URL}/api/events/${eventId}`)
            this.props.history.push(`/events`)

        }
        catch (err) {
            console.log('Delete failed', err)
        }
    }

    render() {
        const {name, start, end, address, country, city, description, isPaid, ticketsPrice, capacity, categories, imageEvent} = this.state
        {
            if (!this.state.user) {
                //redirect to auth page 
                return <Redirect to={'/auth'} />
            }
        }
        return (
            < Grid container direction="column" className="both-centered">
                <Grid item>
                    <CssTextField 
                        id="outlined-basic" 
                        label="Name" 
                        variant="outlined" 
                        type="text"
                        value={name}
                        onChange={this.handleChange('name')}
                        required />
                    </Grid>
                <Grid container>
                    <Grid item>
                        <CustomDateInput
                            variant="outlined"
                            id="datetime-local"
                            label="Start date and time"
                            type="datetime-local"
                            value={start}
                            onChange={this.handleChange('start')}
                            required
                        />
                    </Grid>
                    <Grid item >
                        <CustomDateInput
                            variant="outlined"
                            id="datetime-local"
                            label="End date and time"
                            type="datetime-local"
                            value={end}
                            onChange={this.handleChange('end')}
                            required
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <CssTextField 
                        id="outlined-basic" 
                        label="Address" 
                        variant="outlined" 
                        type="text"
                        value={address}
                        onChange={this.handleChange('address')}
                        required />
                </Grid>
                <Grid container>
                    <Grid item>
                    <CustomSelect variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={this.handleCountry}
                        label="Country"
                        value={country}
                        >
                        {this.state.countriesOptions.map((option, i) => (
                            <MenuItem key={i} value={option.country}>
                            {option.country}
                            </MenuItem>
                        ))}
                        </Select>
                    </CustomSelect>
                    </Grid>
                    <Grid item xs>
                    {   this.state.CountrySelected!== null && <CustomSelect variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={this.handleCity}
                        label="City"
                        value={city}
                        >
                        {this.state.citiesOptions.map((option, i) => (
                            <MenuItem key={i} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </Select>
                    </CustomSelect>
                    }
                    </Grid>
                </Grid>
                <Grid item>
                    <FormControlLabel control={
                        <CustomCheckbox 
                        checked = {isPaid}
                            name="isPaid"   

                                onChange={this.handleCheck}/>}
                            label="The event is going to be paid."
                        />
                </Grid>
                {
                    
                    isPaid && <><Typography>How much is the ticket?</Typography> <CssTextField id="outlined-basic" label="ticketsPrice" variant="outlined" type="number" value={ticketsPrice}required onChange={this.handleChange('ticketsPrice')}/> </> 
                }
                <Grid item>
                    <Typography>Which is the party capacity?</Typography>
                    <CssTextField id="outlined-basic" label="capacity" variant="outlined" type="number" value={capacity} required onChange={this.handleChange('capacity')}/>
                </Grid>
                <Grid item>
                    <CssTextField
                        id="outlined-textarea"
                        label="Multiline"
                        placeholder="Description "
                        multiline
                        value={description}
                        rows={4}
                        onChange={this.handleChange('description')}
                        variant="outlined"
                    />  
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="default"
                        className="CustomButton"
                        type="file"
                        name="imageEvent"
                        accept="image/png, image/jpg"
                        onChange={this.handleImage}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload
                    </Button>
                </Grid>
                <Grid container spacing={5} direction="row">
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4} spacing={5} direction="column">
                        <FormControlLabel control={<CustomCheckbox name="categories" checked={categories.includes("houseParty")} onChange={() => this.handleCategories('houseParty')}/>}label={<Typography variant="body1" style={{color: '#DEEEEA'}}>House party</Typography>}/>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4} spacing={5} direction="column">
                        <FormControlLabel control={<CustomCheckbox name="categories" checked={categories.includes("outdoorParty")} onChange={() => this.handleCategories('outdoorParty')}/>}label={<Typography variant="body1" style={{color: '#DEEEEA'}}>Outdoor party</Typography>}/>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4} spacing={5} direction="column">
                        <FormControlLabel control={<CustomCheckbox name="categories" checked={categories.includes("music")} onChange={() => this.handleCategories('music')}/>}label={<Typography variant="body1" style={{color: '#DEEEEA'}}>Music</Typography>}/>   
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4} spacing={5} direction="column">
                        <FormControlLabel control={<CustomCheckbox name="categories" checked={categories.includes("karaoke")} onChange={() => this.handleCategories('karaoke')}/>}label={<Typography variant="body1" style={{color: '#DEEEEA'}}>Karaoke</Typography>}/> 
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4} spacing={5} direction="column">
                        <FormControlLabel control={<CustomCheckbox name="categories" checked={categories.includes("gameParty")} onChange={() => this.handleCategories('gameParty')}/>}label={<Typography variant="body1" style={{color: '#DEEEEA'}}>Game party</Typography>}/>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4} spacing={5} direction="column">
                        <FormControlLabel control={<CustomCheckbox name="categories" checked={categories.includes("drinks")} onChange={() => this.handleCategories('drinks')}/>}label={<Typography variant="body1" style={{color: '#DEEEEA'}}>Drinks</Typography>}/>    
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4} spacing={5} direction="column">
                        <FormControlLabel control={<CustomCheckbox name="categories" checked={categories.includes("costumeParty")} onChange={() => this.handleCategories('costumeParty')}/>}label={<Typography variant="body1" style={{color: '#DEEEEA'}}>Costume party</Typography>}/>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4} spacing={5} direction="column">
                        <FormControlLabel control={<CustomCheckbox name="categories" checked={categories.includes("swimmingPool")} onChange={() => this.handleCategories('swimmingPool')}/>}label={<Typography variant="body1" style={{color: '#DEEEEA'}}>Swimming pool</Typography>}/> 
                    </Grid>
                </Grid>
                <Grid container direction="column" spacing={24}>
                    <Grid>
                        <Button variant="contained" className="CustomButton" onClick={this.handleEditEvent}>EDIT</Button>
                    </Grid>
                    <Grid>
                        <Button className="CustomStrokeButton" onClick={this.handleClickOpen} >DELETE</Button>
                    </Grid>
                </Grid>

                {/* dialog */}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this event?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action cannot be undone.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleDeleteEvent} variant="outlined" className="CustomStrokeButton"  >
                        Yes
                    </Button>
                    <Button onClick={this.handleClose} variant="contained" autoFocus className="CustomButton" >
                        No
                    </Button>
                    </DialogActions>
                </Dialog>

            </Grid>
        )
    }
}

export default withRouter(EditEvent);