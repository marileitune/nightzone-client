import React, { Component } from 'react'
import {withRouter} from  'react-router-dom';
import {API_URL} from '../../config.js'
import axios from 'axios';
import { Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {CssTextField} from '../../DefaultTheme'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class EditAccount extends Component {

    state = {
        user: this.props.user,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        imageAccount: "",
        imageFile: null,
        open: false,
        error: null
    }

    componentDidMount = async () => {
        try {
            let response = await axios.get(`${API_URL}/api/user`, {withCredentials: true})
            await this.setState({ 
                user: response.data,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                password: response.data.password,
                confirmPassword: response.data.password,
                imageAccount: response.data.imageAccount
            })



        }
        catch (err) {
            console.log('User fetch failed', err)
        }
    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    handleImage = (e) => {
      
        this.setState({ imageFile: e.target.files[0] });
    }
    
    handleEditAccount = async () => {
        try {


            let formData = new FormData()
            if (this.state.imageFile) {
                formData.append('imageUrl', this.state.imageFile)
                let imgResponse = await axios.post(`${API_URL}/api/upload`, formData)
                await this.setState({
                    imageAccount: imgResponse.data.image
                })
            }
           


            const {firstName, lastName, email, password, confirmPassword, imageAccount} = this.state

            let editedAccount = { 
                firstName: firstName, 
                lastName: lastName,
                email: email, 
                password: password, 
                confirmPassword: confirmPassword,
                imageAccount: imageAccount
            }
          



            // pass a second parameter to the patch for sending info to your server inside req.body
            let userId = this.props.match.params.userId
            let response = await axios.patch(`${API_URL}/api/account/${userId}`, editedAccount, {withCredentials: true})

            if (response.data.errorMessage) {
                await this.setState({...this.state, error: response.data.errorMessage})
                return
             }

            this.props.history.push(`/account/${userId}`)

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

    handleDeleteAccount = async () => {
        try {
            let userId = this.props.match.params.userId
            await axios.delete(`${API_URL}/api/account/${userId}`)
            this.props.history.push(`/`)

        }
        catch (err) {
            console.log('Delete failed', err)
        }
    }

    render() {

        const {firstName, lastName, email, password, confirmPassword, imageAccount} = this.state
        return (
                <Grid container
                spacing={0}
                align="left"
                justify="center"
                alignItems="center"
                direction="column">
                <Grid item style={{marginLeft: '5%', marginTop: '13%', paddingBottom: '2%'}}>
                <CssTextField style={{marginRight: '1%', paddingBottom: '1%'}}id="outlined-basic" label="First name" variant="outlined" type="text" value={firstName} required onChange={this.handleChange('firstName')}/>
                <CssTextField style={{marginRight: '1%', paddingBottom: '1%'}} id="outlined-basic" label="Last name" variant="outlined" type="text" value={lastName} required onChange={this.handleChange('lastName')}/>
                 <CssTextField style={{marginRight: '1%', paddingBottom: '1%'}} id="outlined-basic" label="Email" variant="outlined" type="email" value={email} required onChange={this.handleChange('email')}/>
                <CssTextField style={{marginRight: '1%', paddingBottom: '1%'}} id="outlined-basic" label="Password" variant="outlined" type="password" value={password} required onChange={this.handleChange('password')}/>
                <CssTextField style={{marginRight: '1%', paddingBottom: '1%'}} id="outlined-basic" label="Confirm password" variant="outlined" type="password" value={confirmPassword} required onChange={this.handleChange('confirmPassword')}/>
                <Button
                    variant="contained"
                    component="label"
                    className="CustomButton"
                    startIcon={<CloudUploadIcon />}
                    >
                        add an image
                    <input
                        type="file"
                        name="imageAccount"
                        accept="image/png, image/jpg"
                        onChange={this.handleImage}
                        hidden
                    />
                </Button>
                <Grid container direction="column" spacing={24}>
                    <Grid>
                        <Button variant="contained" className="CustomButton" onClick={this.handleEditAccount}>EDIT</Button>
                    </Grid>
                    <Grid>
                        <Button className="CustomStrokeButton" onClick={this.handleClickOpen} >DELETE</Button>
                    </Grid>
                </Grid>
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
        
                    <Button onClick={this.handleDeleteAccount} variant="outlined" className="CustomStrokeButton"  >
                        Yes
                    </Button>
                    <Button onClick={this.handleClose} variant="contained" autoFocus className="CustomButton" >
                        No
                    </Button>
                    </DialogActions>
                </Dialog>
                    </Grid>
                   
                {/* error */}
                {
                    this.state.error && <Alert severity="error">{this.state.error}</Alert>
                } 
                </Grid> 
        )
    }
}

export default withRouter(EditAccount);
