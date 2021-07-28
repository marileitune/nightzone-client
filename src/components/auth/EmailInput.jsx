import React, { Component } from 'react'
import {Link} from  'react-router-dom';
import { TextField, Button, Typography, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { withStyles, makeStyles } from '@material-ui/styles';

// STYLES

const Brand = withStyles({
  root: {
    fontFamily:'Monoton',
    background: "-webkit-linear-gradient(45deg, #39A6A3 30%, #BF1363 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }
})(Typography);

const Subtitle = withStyles({
  root: {
    fontFamily:'Montserrat',
    background: "#DEEEEA",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }

})(Typography);

const CssTextField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "#39A6A3"
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#DEEEEA"
            },
            "&:hover fieldset": {
                borderColor: "#BF1363"
            },
            "&.Mui-focused fieldset": {
                borderColor: "#39A6A3"
            }
        }
    }
})(TextField);



//COMPONENT
class EmailInput extends Component {
    render() {
        const {onChange, onPreview, onNext, error, classes} = this.props


        return (
            <div className="both-centered">
                <Brand variant="h1" > <Link to="/" style={{ textDecoration: 'inherit', color:'linear-gradient(90deg, #39A6A3 30%, #BF1363 90%)'}}>NIGHTZONE</Link></Brand>
                <Subtitle variant="h5">What is your email address?</Subtitle>
                <CssTextField id="outlined-basic" color="#DEEEEA" label="Email" variant="outlined" type="email" required onChange={onChange('email')}    InputLabelProps={{style: { color: '#DEEEEA' },}} />
                <Grid container spacing={24} direction="row" justifyContent='center' alignItems="center" >
                    <Button variant="contained" color="primary" onClick={onPreview}>BACK</Button>
                    <Button variant="contained" color="primary" onClick={onNext}>NEXT</Button>
                </Grid> 

                {
                    error && <Alert severity="error">{error}</Alert>
                }
            </div>
        )
    }
}

 export default withStyles(makeStyles)(EmailInput)