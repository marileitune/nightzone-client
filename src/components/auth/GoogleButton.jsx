import React from 'react'
import GoogleLogin from 'react-google-login';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import {Button} from '@material-ui/core';

function GoogleButton(props) {
    const {onGoogleResponse} = props
   
    return (
        <div>
             <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_ID}
                render={renderProps => (
                    <Button onClick={renderProps.onClick} className="CustomFab" >
                    <GTranslateIcon color="#DEEEEA"/>
                </Button>
                )}
                buttonText="Login"
                onSuccess={onGoogleResponse}
                cookiePolicy={'single_host_origin'}
  />,
        </div>
    )
}

export default GoogleButton