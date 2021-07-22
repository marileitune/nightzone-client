
import React from 'react'
import { withRouter} from  'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

function FacebookButton(props) {

    const {onFacebookResponse} = props

    return (
        <div>
           <FacebookLogin
                appId="543857930139115"
                autoLoad={false}
                fields="name,email,picture"
                callback={onFacebookResponse} 
            />
        </div>
    )
}

export default withRouter(FacebookButton);