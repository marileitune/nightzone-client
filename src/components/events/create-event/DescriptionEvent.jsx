import React, { Component } from 'react'
import { TextField, Button, Grid, CardMedia } from '@material-ui/core';
import {withRouter} from  'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {CssTextField, Subtitle} from '../../../DefaultTheme'

class DescriptionEvent extends Component {


    render() {
        const { onPreview, onChange, onNext, error, onAddImage, description, imageEvent} = this.props
        return (
            <Grid
            container
            spacing={0}
            align="center"
            justify="center"
            alignItems="center"
            direction="column">
                <Grid item >
                <Grid container justify="center" style={{ marginBottom: '2.5%', marginTop: '6%'}}>
                    <img 
                        component="img"
                        alt="image-event"
                        style={{maxWidth: '50%' , borderRadius: '5%'}}
                        src={ imageEvent ? URL.createObjectURL(imageEvent): null}
                        title="image-event"
                    />
                </Grid>
                <Grid item  style={{ marginBottom: '2%'}}>
                    <Button
                        variant="contained"
                        component="label"
                        className="CustomButton"
                        startIcon={<CloudUploadIcon />}
                        >
                            add an image
                        <input
                            type="file"
                            name="imageEvent"
                            accept="image/png, image/jpg"
                            onChange={onAddImage}
                            hidden
                        />
                     </Button>
                </Grid>
                <Grid item  style={{ marginBottom: '2%'}}>
                    <Subtitle variant="h5" color="secondary">How would you describe your event?</Subtitle>
                </Grid>
                <Grid item  style={{ marginBottom: '2%'}}>
                    <CssTextField
                        id="outlined-textarea"
                        label="Description"
                        placeholder="Description "
                        multiline
                        rows={4}
                        value={description}
                        onChange={onChange('description')}
                        variant="outlined"
                    />            
                </Grid>
                
                <Grid container justify="center" alignItems="center"  style={{ marginBottom: '2%'}}>
                    <Button variant="outlined" className="CustomStrokeButton" onClick={onPreview}  style={{ marginRight: '2%'}}>BACK</Button>
                    <Button variant="contained" className="CustomButton" onClick={onNext}>NEXT</Button>
                </Grid> 
               
            </Grid>
            {
                    error && <Alert severity="error" style={{ marginBottom: '2%'}}>{error}</Alert>
                }
            </Grid>
        )
    }
}

export default withRouter(DescriptionEvent);