import React, { Component } from 'react'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Chip, Checkbox, FormControlLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

class Filter extends Component {

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.props.onClean}>CLEAN FILTER</Button>
                <TextField id="outlined-basic" label="Search" variant="outlined" type="text" value={this.props.text} onChange={this.props.onSearch}/>
                <TextField
                    id="date"
                    label="Start date"
                    type="date"
                    defaultValue={new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear()}
                    value={this.props.startDate}
                    onChange={this.props.onDate}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <FormControl variant="outlined">
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
                </FormControl>
                <FormControl variant="outlined">
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
                </FormControl>
            </div>
        )
    }
}

export default Filter;