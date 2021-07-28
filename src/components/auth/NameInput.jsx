import React, { Component } from 'react'
import {Link} from  'react-router-dom';
import { TextField, Button, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {CssTextField, Subtitle, Brand} from '../../DefaultTheme'

class NameInput extends Component {
    render() {
        const {onNext, onPreview, onChange, error} = this.props
        return (
            <div className="both-centered">
                 <Brand variant="h1" > <Link to="/" style={{ textDecoration: 'inherit', color:'linear-gradient(90deg, #39A6A3 30%, #BF1363 90%)'}}>NIGHTZONE</Link></Brand>
                <Subtitle variant="h5">What is your name?</Subtitle>
                <CssTextField id="outlined-basic" label="First name" variant="outlined" type="text" required onChange={onChange('firstName')} InputLabelProps={{style: {color: '#DEEEEA'}}}/>
                <CssTextField id="outlined-basic" label="Last name" variant="outlined" type="text" required onChange={onChange('lastName')} InputLabelProps={{style: {color: '#DEEEEA'}}}/>
                <Grid container spacing={24} direction="row" justifyContent='center' alignItems="center" >
                    <Button variant="contained" className="CustomButton" onClick={onPreview}>BACK</Button>
                    <Button variant="contained" className="CustomButton" onClick={onNext}>NEXT</Button>
                </Grid> 
                {
                    error && <Alert severity="error">{error}</Alert>
                }
            </div>
        )
    }
}

export default NameInput;

