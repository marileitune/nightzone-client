import React, { Component } from 'react'
import {withRouter} from  'react-router-dom';
import axios from 'axios'
import { Grid, Button, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {CssTextField, Subtitle, CustomSelect, CustomCheckbox} from '../../../DefaultTheme'

class PlaceEvent extends Component {

    state = {
        countries: [],
        country: this.props.country,
        cities: [],
        city: null
    }

    componentDidMount = async () => {
        try {
            let response = await axios.get(`https://countriesnow.space/api/v0.1/countries`)
            await this.setState ({
                countries: response.data.data
            })

            if (this.props.country) {
                const countryTarget = this.state.countries.find((elem) => {
                    return  elem.country == this.props.country 
                })

                await this.setState({
                    cities: countryTarget.cities, 
                    city: this.props.city
                })
            }
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
    }

    handleCity = async (city) => {
        this.props.onChange('city')(city)

        await this.setState({
            city: city.target.value
        })
    }

    render() {
        const { onPreview, onNext, onChange, error, city, country, address} = this.props
        const {countries, cities} = this.state
        return (
            <Grid className="both-centered">
                <Subtitle>Where the event is going to happen?</Subtitle>
                <CssTextField id="outlined-basic" label="Address" variant="outlined" type="text" value={address} required onChange={onChange('address')}/>
                {/* country */}

                <Grid container>
                    <Grid item>
                    <CustomSelect variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={country}
                        onChange={this.handleCountry}
                        label="Country"
                        >
                        {countries.map((option, i) => (
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
                         {cities.map((option, i) => (
                          <MenuItem key={i} value={option}>
                          {option}
                          </MenuItem>
                      ))}
                        </Select>
                    </CustomSelect>
                    }
                    </Grid>
                </Grid>
                    
                {/* buttons */}
                <Button variant="contained" color="primary" onClick={onPreview}>BACK</Button>
                <Button variant="contained" color="primary" onClick={onNext}>NEXT</Button>
                {
                    error && <Alert severity="error">{error}</Alert>
                }
            </Grid>
        )
    }
}

export default withRouter(PlaceEvent);
