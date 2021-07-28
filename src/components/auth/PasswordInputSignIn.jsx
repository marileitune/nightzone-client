import React, { Component } from 'react'
import {Link, withRouter} from  'react-router-dom';
import { TextField, Button, Typography, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { withStyles, makeStyles } from '@material-ui/styles';
import {CssTextField} from '../../DefaultTheme'
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
  
//   const CssTextField = withStyles({
//       root: {
//           "& label.Mui-focused": {
//               color: "#39A6A3"
//           },
//           "& .MuiOutlinedInput-root": {
//               "& fieldset": {
//                   borderColor: "#DEEEEA"
//               },
//               "&:hover fieldset": {
//                   borderColor: "#BF1363"
//               },
//               "&.Mui-focused fieldset": {
//                   borderColor: "#39A6A3"
//               }
//           }
//       }
//   })(TextField);
  
  
  
  //COMPONENT
class PasswordInputSignIn extends Component {
    render() {
        const {onLogin, onPreview, onChange, error} = this.props
        return (
            <div className="both-centered">
                <Brand variant="h1" > <Link to="/" style={{ textDecoration: 'inherit', color:'linear-gradient(90deg, #39A6A3 30%, #BF1363 90%)'}}>NIGHTZONE</Link></Brand>
                <Subtitle variant="h5">What is your password?</Subtitle>
                <CssTextField id="outlined-basic" className="CustomInput"label="Password" variant="outlined" type="password" required onChange={onChange('password')} InputLabelProps={{style: { color: '#DEEEEA' },}} />
                <Grid container spacing={24} direction="row" justifyContent='center' alignItems="center" >
                    <Button variant="contained" className="CustomButton" onClick={onPreview}>BACK</Button>
                    <Button variant="contained" className="CustomButton" onClick={onLogin}>NEXT</Button>
                </Grid>                 
                {
                    error && <Alert severity="error">{error}</Alert>
                }

            </div>
        )
    }
}

export default withRouter(PasswordInputSignIn)