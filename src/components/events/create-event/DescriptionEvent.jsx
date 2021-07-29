import React, { Component } from 'react'
import { TextField, Button, Grid } from '@material-ui/core';
import {withRouter} from  'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {CssTextField, Subtitle} from '../../../DefaultTheme'

class DescriptionEvent extends Component {
    render() {
        const { onPreview, onChange, onNext, error, onAddImage} = this.props
        return (
            <Grid container className="both-centered">
                <Subtitle>How would you describe your event?</Subtitle>
                <CssTextField
                    id="outlined-textarea"
                    label="Description"
                    placeholder="Description "
                    multiline
                    rows={4}
                    onChange={onChange('description')}
                    variant="outlined"
                />            
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
                <Button variant="contained" className="CustomButton" onClick={onPreview}>BACK</Button>
                <Button variant="contained" className="CustomButton" onClick={onNext}>NEXT</Button>
                {
                    error && <Alert severity="error">{error}</Alert>
                }
            </Grid>
        )
    }
}

export default withRouter(DescriptionEvent);