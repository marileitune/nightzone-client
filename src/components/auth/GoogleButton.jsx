import React from 'react'
import GoogleLogin from 'react-google-login';

function GoogleButton(props) {
    const {onGoogleResponse} = props
   
    return (
        <div>
            <GoogleLogin
                clientId="349209439921-2mhqo18g2dlid0kn3sfq0o2qbgftbl5f.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={onGoogleResponse}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleButton