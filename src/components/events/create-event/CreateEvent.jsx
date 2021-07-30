import React, { Component } from 'react'
import {withRouter, Redirect} from  'react-router-dom';
import {API_URL} from '../../../config.js'
import axios from 'axios';
import TitleEvent from './TitleEvent'
import DateEvent from './DateEvent'
import PlaceEvent from './PlaceEvent'
import PriceEvent from './PriceEvent'
import DescriptionEvent from './DescriptionEvent'
import CategoriesEvent from './CategoriesEvent'

/*
step == 1 // TitleEvent
step == 2 // DateEvent
step == 3 // PlaceEvent 
step == 4 // PriceEvent 
step == 5 // DescriptionEvent
step == 6 // CategoriesEvent
*/

class CreateEvent extends Component {
    state = {
        user: this.props.user, 
        step: 1,
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
        error: null
    }

    componentDidMount = async () => {
        try {
            let userResponse = await axios.get(`${API_URL}/api/user`, {withCredentials: true})
            this.setState({
              user: userResponse.data,
              fetchingUser: false,
            })
        }  
        catch(err){
            console.log('User fetch failed', err)
        }
    }

    prevStep = () => {
        const {step} = this.state
        this.setState({ step: step -1})
    }

    nextStep = async () => {
        const {step} = this.state
        let today = new Date().getTime(); 

        switch (step) {
            case 1:
                if (this.state.name){
                    await this.setState({ step: step +1, error: null})
                } else {
                    await this.setState({ error: "Please fill in all the fields"})
                }
                break;
            case 2:
                if (this.state.start && this.state.end && Date.parse(this.state.start) < Date.parse(this.state.end) && Date.parse(this.state.start) > today){
                    await this.setState({ step: step +1, error: null})
                } else {
                    await this.setState({ error: "Please fill in all the fields and make sure the start date of your event is before the end date. And it is only possible to add future events"})
                }
                break;
            case 3:
                if (this.state.address && this.state.country && this.state.city){
                    await this.setState({ step: step +1, error: null})
                } else {
                    await this.setState({ error: "Please fill in all the fields"})
                }
                break;
            case 4:
                if (this.state.capacity){
                    await this.setState({ step: step +1, error: null})
                } else {
                    await this.setState({ error: "Please fill in the capacity"})
                }
                break;
            case 5:
                if (this.state.description && this.state.imageEvent){
                    await this.setState({ step: step +1, error: null})
                } else {
                    await this.setState({ error: "Please fill in the description and add an image"})
                }
                break;
            case 6:
                if (this.state.categories.length>0 && this.state.categories.length<4){
                    await this.setState({ step: step +1, error: null})
                } else {
                    await this.setState({ error: "Please choose at least one and a maximum of 3 categories"})
                }
                break;
        }

        
    }

    //here we are saving the things typed by the user in the state, to grab the information later on handleLogin or handleRegister
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    handleImage = (e) => {
        this.setState({ imageEvent: e.target.files[0] });

    }

    handleCheck = async () => {  
        await this.setState({isPaid: !this.state.isPaid})
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
        }
        catch (err) {
            console.log('Categories failed', err)
        }
    } 

    handleCreate = async (e) => {
        try {
            let formData = new FormData()
            formData.append('imageUrl', this.state.imageEvent)

            let imgResponse = await axios.post(`${API_URL}/api/upload`, formData)
            console.log(imgResponse)
            const {name, start, end, address, country, city, isPaid, ticketsPrice, capacity, categories, description, imageEvent} = this.state
            let newEvent = { 
                name: name, 
                start: start,
                end: end, 
                address: address, 
                country: country, 
                city: city, 
                isPaid: isPaid, 
                ticketsPrice: ticketsPrice, 
                capacity: capacity, 
                categories: categories, 
                description: description, 
                imageEvent: imgResponse.data.image
            }
            console.log(newEvent)
            const response = await axios.post(`${API_URL}/api/create`, newEvent, {withCredentials: true})
            //if inside the response we have an error, grab the error from backend
            if (response.data.errorMessage) {
               await this.setState({...this.state, error: response.data.errorMessage})
               return
            }
            //this is for changing the state of the user (from null to the response.data):
            this.props.history.push('/events')
        }
        catch (err) {
            console.log('Creation failed', err)
        }
    }

    render() {
        {
            if (!this.state.user) {
                //redirect to signin page 
                return <Redirect to={'/auth'} />
            }
        }
        const { step, name, country, start, end, address, city, isPaid, ticketsPrice, capacity, description, categories, imageEvent } = this.state;
        const {error} = this.state
        switch (step) {
            case 1: 
                return (
                    <TitleEvent onNext={this.nextStep} onChange={this.handleChange} error={error} name={name}/>
                )
            case 2: 
                return (
                    <DateEvent onNext={this.nextStep} onPreview={this.prevStep} onChange={this.handleChange} start={start} end={end} error={error}/>
                )
            case 3: 
                return (
                    <PlaceEvent onLogin={this.handleLogin} onPreview={this.prevStep} onNext={this.nextStep} onChange={this.handleChange} error={error} address={address} country={country} city={city}/>
                )
                case 4:
                    return (
                        <PriceEvent onNext={this.nextStep} onPreview={this.prevStep} onChange={this.handleChange} onCheck={this.handleCheck} error={error} isPaid={isPaid} ticketsPrice={ticketsPrice} capacity={capacity}/>
                    )
            case 5:
                return (
                    <DescriptionEvent onNext={this.nextStep} onPreview={this.prevStep} onChange={this.handleChange} onAddImage={this.handleImage} error={error} description={description} imageEvent={imageEvent}/>
                )
            case 6:
                return (
                    <CategoriesEvent onCreate={this.handleCreate} onPreview={this.prevStep} onCheck={this.handleCategories} categories={categories} error={error}/>
                )
            default: 
        }
    }
}

export default withRouter(CreateEvent);
