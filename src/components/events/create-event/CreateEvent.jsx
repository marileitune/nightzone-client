import React, { Component } from 'react'
import {withRouter} from  'react-router-dom';
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
    prevStep = () => {
        const {step} = this.state
        this.setState({ step: step -1})
    }

    nextStep = () => {
        console.log('mariana')
        const {step} = this.state
        this.setState({ step: step +1})
    }

    //here we are saving the things typed by the user in the state, to grab the information later on handleLogin or handleRegister
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    handleCheck = () => {
        const {isPaid} = this.state
        if (isPaid === true) {
            this.setState({isPaid: true})
        } else {
            this.setState({isPaid: false})
        }
    } 

    handleCreate = async () => {
        try {
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
                imageEvent: imageEvent
            }
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
        const { step } = this.state;
        const {error} = this.state
        switch (step) {
            case 1: 
                return (
                    <TitleEvent onNext={this.nextStep} onChange={this.handleChange} error={error}/>
                )
            case 2: 
                return (
                    <DateEvent onNext={this.nextStep} onPreview={this.prevStep} onChange={this.handleChange} error={error}/>
                )
            case 3: 
                return (
                    <PlaceEvent onLogin={this.handleLogin} onPreview={this.prevStep} onNext={this.nextStep} onChange={this.handleChange} error={error}/>
                )
                case 4:
                    return (
                        <PriceEvent onNext={this.nextStep} onPreview={this.prevStep} onChange={this.handleChange} onCheck={this.handleCheck} error={error}/>
                    )
            case 5:
                return (
                    <DescriptionEvent onNext={this.nextStep} onPreview={this.prevStep} onChange={this.handleChange} error={error}/>
                )
            case 6:
                return (
                    <CategoriesEvent onRegister={this.handleRegister} onPreview={this.prevStep} onCheck={this.handleCheck} onChange={this.handleChange} error={error}/>
                )
            default: 
        }
    }
}

export default withRouter(CreateEvent);
