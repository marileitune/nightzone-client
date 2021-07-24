import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import CloseIcon from '@material-ui/icons/Close';

class Payment extends Component {


    render() {
        const promise = loadStripe("pk_test_51JFxmQGLw6mfE9JvfuXfSeVyUAiedGg0atoexZN0VMTrvtdSsIqfWycGgvcym3tSYV8eElXrGlHobUphaJe5z8ko00MEIHTnt7")
        const {eventId, onClose, user} = this.props
        return (
            <div>
                <CloseIcon onClick={onClose}/>
                <Elements stripe={promise}>
                    <CheckoutForm eventId={eventId}
                    user={user}/>
                </Elements>
            </div>
        )
    }
}

export default withRouter(Payment);