import React, { Component } from 'react'
import {withRouter} from  'react-router-dom';
import axios from 'axios'
import { TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';

class PlaceEvent extends Component {

    state = {
        countries: [],
        country: null,
        cities: []
    }

    componentDidMount = async () => {
        try {
            let response = await axios.get(`https://countriesnow.space/api/v0.1/countries`)
            await this.setState ({
                countries: response.data.data
            })
        }
        catch (err) {
            console.log('Countries fetch failed', err)
        }
    }

    handleCountry = async (country) => {
        this.props.onChange('country')(country)

        await this.setState({
            country: country.target.value
        })

        const countryTarget = this.state.countries.find((elem) => {
           return  elem.country == this.state.country
        })
        const cities = countryTarget.cities
        await this.setState({
            cities: cities
        })
        console.log('cities', this.state.cities)
    }

    handleCity = async (city) => {

        this.props.onChange('city')(city)
    }

    render() {
        const { onPreview, onNext, onChange, error} = this.props
        const {countries, cities} = this.state
        return (
            <div>
                <p>Where the event is going to happen?</p>
                <TextField id="outlined-basic" label="Address" variant="outlined" type="text" required onChange={onChange('address')}/>
                {/* country */}
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.country}
                    onChange={this.handleCountry}
                    label="Country"
                    >
                    {countries.map((option, i) => (
                        <MenuItem key={i} value={option.country}>
                        {option.country}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                {/* city */}

                    {
                      this.state.country !== null && <FormControl variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
                      <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={this.handleCity}
                      label="City"
                      >
                      {cities.map((option, i) => (
                          <MenuItem key={i} value={option}>
                          {option}
                          </MenuItem>
                      ))}
                      </Select>
                  </FormControl> 
                    }
                {/* buttons */}
                <Button variant="contained" color="primary" onClick={onPreview}>BACK</Button>
                <Button variant="contained" color="primary" onClick={onNext}>NEXT</Button>
                {
                    error && <p>{error}</p> 
                }
            </div>
        )
    }
}

export default withRouter(PlaceEvent);
