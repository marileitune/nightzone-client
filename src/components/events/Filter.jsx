import React, { Component } from 'react'
import { Grid, Button, InputLabel, Select, MenuItem} from '@material-ui/core';
import {CssTextField, CustomDateInput, CustomSelect} from '../../DefaultTheme'


class Filter extends Component {

    render() {
        return (
            <Grid direction="row"> 
                <CssTextField style={{marginRight: '1%', marginTop:'2%'}} id="outlined-basic" label="Search for a party" variant="outlined" type="text" value={this.props.text} onChange={this.props.onSearch}/>
                <CustomDateInput
                    style={{marginRight: '1%', marginTop:'2%'}} 
                    variant="outlined"
                    id="date"
                    label="Start date"
                    type="date"
                    defaultValue={new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear()}
                    value={this.props.startDate}
                    onChange={this.props.onDate}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <CustomSelect variant="outlined" style={{marginRight: '1%', marginTop:'2%'}} >
                    <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={this.props.onCity}
                    label="City"
                    value={this.props.city}
                    >
                    {this.props.cities.map((option, i) => (
                        <MenuItem key={i} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                    </Select>
                </CustomSelect>
                <CustomSelect variant="outlined" style={{marginRight: '1%', marginTop:'2%'}} >
                    <InputLabel id="demo-simple-select-outlined-label">Ticket type</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Ticket type"
                    value={this.props.ticketType}
                    onChange={this.props.onTicketType}
                    >
                        <MenuItem value="free">Free</MenuItem>
                        <MenuItem value="paid"> Paid</MenuItem>
                    </Select>
                </CustomSelect>
                <Grid>
                    <Button variant="outlined" style={{marginTop: '2%'}} className="CustomStrokeButton"onClick={this.props.onClean}>CLEAR</Button>
                </Grid>
            </Grid>
            
        )
    }
}

export default Filter;