import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import {withRouter} from  'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class DescriptionEvent extends Component {
    render() {
        const { onPreview, onChange, onNext, error, onAddImage} = this.props
        return (
            <div>
                <TextField
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
                <Button variant="contained" color="primary" onClick={onPreview}>BACK</Button>
                <Button variant="contained" color="primary" onClick={onNext}>NEXT</Button>
                {
                    error && <Alert severity="error">{error}</Alert>
                }
            </div>
        )
    }
}

export default withRouter(DescriptionEvent);