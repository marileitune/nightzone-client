import React, { Component } from 'react'
import {withRouter, Redirect} from  'react-router-dom';
import {API_URL} from '../../config.js'
import axios from 'axios';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, TextareaAutosize, Checkbox, FormControlLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

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

            let cities = await axios.get(`https://countriesnow.space/api/v0.1/countries`)
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
            <div>
                <TextField 
                    id="outlined-basic" 
                    label="Name" 
                    variant="outlined" 
                    type="text"
                    value={name}
                    onChange={this.handleChange('name')}
                    required />
                <TextField
                    id="datetime-local"
                    label="Start date and time"
                    type="datetime-local"
                    value={start}
                    onChange={this.handleChange('start')}
                    required
                />
                <TextField
                    id="datetime-local"
                    label="End date and time"
                    type="datetime-local"
                    value={end}
                    onChange={this.handleChange('end')}
                    required
                />
                <TextField 
                    id="outlined-basic" 
                    label="Address" 
                    variant="outlined" 
                    type="text"
                    value={address}
                    onChange={this.handleChange('address')}
                    required />
                {/* country */}
                <FormControl variant="outlined" width="100px">
                    <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={country}
                    onChange={this.handleCountry}
                    label="Country"
                    >
                    {this.state.countriesOptions.map((option, i) => (
                        <MenuItem key={i} value={option.country}>
                        {option.country}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                {/* city */}
                    {
                      this.state.CountrySelected!== null && <FormControl variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
                      <Select 
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={city}
                      onChange={this.handleCity}
                      label="City"
                      >
                      {this.state.citiesOptions.map((option, i) => (
                          <MenuItem key={i} value={option}>
                          {option}
                          </MenuItem>
                      ))}
                      </Select>
                  </FormControl> 
                    }
                <FormControlLabel control={
                    <Checkbox 
                    checked = {isPaid}
                        name="isPaid"   

                            onChange={this.handleCheck}/>}
                        label="The event is going to be paid."
                    />
                {
                    
                    isPaid && <><p>How much is the ticket?</p> <TextField id="outlined-basic" label="ticketsPrice" variant="outlined" type="number" value={ticketsPrice}required onChange={this.handleChange('ticketsPrice')}/> </> 
                }
                <p>Which is the party capacity?</p>
                <TextField id="outlined-basic" label="capacity" variant="outlined" type="number" value={capacity} required onChange={this.handleChange('capacity')}/>

                <TextField
                    id="outlined-textarea"
                    label="Multiline"
                    placeholder="Description "
                    multiline
                    value={description}
                    rows={4}
                    onChange={this.handleChange('description')}
                    variant="outlined"
                />  
                                
                <Button
                    variant="contained"
                    component="label"
                    >
                        Add an image
                    <input
                        type="file"
                        name="imageEvent"
                        accept="image/png, image/jpg"
                        onChange={this.handleImage}
                        hidden
                    />
                </Button>
                <FormControlLabel control={<Checkbox name="categories" checked={categories.includes("houseParty")} onChange={() => this.handleCategories('houseParty')}/>}label="House party"/>
                <FormControlLabel control={<Checkbox name="categories" checked={categories.includes("outdoorParty")} onChange={() => this.handleCategories('outdoorParty')}/>}label="Outdoor party"/>
                <FormControlLabel control={<Checkbox name="categories" checked={categories.includes("music")} onChange={() => this.handleCategories('music')}/>}label="Music"/>
                <FormControlLabel control={<Checkbox name="categories" checked={categories.includes("karaoke")} onChange={() => this.handleCategories('karaoke')}/>}label="Karaoke"/>
                <FormControlLabel control={<Checkbox name="categories" checked={categories.includes("gameParty")} onChange={() => this.handleCategories('gameParty')}/>}label="Game party"/>
                <FormControlLabel control={<Checkbox name="categories" checked={categories.includes("drinks")} onChange={() => this.handleCategories('drinks')}/>}label="Drinks"/>
                <FormControlLabel control={<Checkbox name="categories" checked={categories.includes("costumeParty")} onChange={() => this.handleCategories('costumeParty')}/>}label="Costume party"/>
                <FormControlLabel control={<Checkbox name="categories" checked={categories.includes("swimmingPool")} onChange={() => this.handleCategories('swimmingPool')}/>}label="Swimming pool"/>
                <Button variant="contained" color="primary" onClick={this.handleEditEvent}>EDIT</Button>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen} >DELETE</Button>

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
                    <Button onClick={this.handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={this.handleDeleteEvent} color="primary" autoFocus>
                        Yes
                    </Button>
                    </DialogActions>
                </Dialog>

                {/* {
                    this.state.error && <Alert severity="error">{this.state.error}</Alert>
                } */}
            </div>
        )
    }
}

export default withRouter(EditEvent);