import React from 'react'
import GoogleLogin from 'react-google-login';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import {Fab} from '@material-ui/core';

function GoogleButton(props) {
    const {onGoogleResponse} = props
   
    return (
        <div>
             <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_ID}
                render={renderProps => (
                    <Fab onClick={renderProps.onClick} color="primary" aria-label="add">
                    <GTranslateIcon color="#DEEEEA"/>
                </Fab>
                )}
                buttonText="Login"
                onSuccess={onGoogleResponse}
                cookiePolicy={'single_host_origin'}
  />,
        </div>
    )
}

export default GoogleButton