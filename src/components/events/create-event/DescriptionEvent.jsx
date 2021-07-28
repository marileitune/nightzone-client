import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import {withRouter} from  'react-router-dom';
import Alert from '@material-ui/lab/Alert';

class DescriptionEvent extends Component {
    render() {
        const { onPreview, onChange, onNext, onCheck, error, onAddImage} = this.props
        return (
            <div>
                <TextField
                    id="outlined-textarea"
                    label="Multiline"
                    placeholder="Description "
                    multiline
                    rows={4}
                    onChange={onChange('description')}
                    variant="outlined"
                />            
                <Button
                    variant="contained"
                    component="label"
                    >
                        Add an image
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