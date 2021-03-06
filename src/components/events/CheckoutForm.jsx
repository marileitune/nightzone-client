import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {API_URL} from '../../config.js'
import axios from 'axios';
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import Styles from './CheckoutForm.css'


function CheckoutForm(props) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const {eventId, user} = props

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch(`${API_URL}/api/create-payment-intent`, {
        method: "POST",
        credentials: 'include', //needed this line, because without it is not getting the user (user = undefined). Because how we are not using axios, we can't pass "withCredentials".
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ eventId }) //eventId = eventId that we passed as a props in the EventDetail
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      //if the payment is successful, we need to call our payment route
      try {
        await axios.get(`${API_URL}/api/events/${eventId}/buy`, {withCredentials: true})
        props.history.push(`/account/${user._id}`)
      }
      catch(err) {
          console.log('Event fetch failed', err)
      }
    }
  };

  return (
    <div>
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
      className="stripe-button"
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
    </form>
    </div>
    
  );
}

export default withRouter(CheckoutForm);