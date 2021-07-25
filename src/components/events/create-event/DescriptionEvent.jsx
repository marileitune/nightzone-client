import React, { Component } from 'react'
import { TextareaAutosize, Button } from '@material-ui/core';
import {withRouter} from  'react-router-dom';

class DescriptionEvent extends Component {
    render() {
        const { onPreview, onChange, onNext, onCheck, error, onAddImage} = this.props
        return (
            <div>
                <TextareaAutosize
                    minRows={4}
                    aria-label="minimum height"
                    placeholder="Description "
                    onChange={onChange('description')}
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
                    error && <p>{error}</p> 
                }
            </div>
        )
    }
}

export default withRouter(DescriptionEvent);