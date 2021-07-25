import React, { Component } from 'react'
import {withRouter} from  'react-router-dom';
import { TextField, Button} from '@material-ui/core';

class TitleEvent extends Component {
    render() {
        const {onNext, onChange, error} = this.props
        return (
            <div>
                <p>What is the name of your event?</p>
                <TextField id="outlined-basic" label="Name" variant="outlined" type="text" required onChange={onChange('name')}/>
                <Button variant="contained" color="primary" onClick={onNext}>NEXT</Button>
                {
                    error && <p>{error}</p> 
                }
            </div>
        )
    }
}

export default withRouter(TitleEvent);