import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_stripe_public_key'); // Remplacez par votre clé publique Stripe

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
    } else {
      const { id } = paymentMethod;
      const response = await fetch('http://localhost:3000/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const paymentIntent = await response.json();

      const confirmCardPayment = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
        payment_method: id,
      });

      if (confirmCardPayment.error) {
        setError(confirmCardPayment.error.message);
      } else {
        setSuccess(true);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="credit-card w-full sm:w-auto shadow-lg mx-auto rounded-xl bg-white p-4">
      <h1 className="text-xl font-semibold text-gray-700 text-center">Card payment</h1>
      <div className="my-3">
        <label className="block text-gray-700">Cardholder Name</label>
        <input
          type="text"
          className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
          placeholder="Card holder"
        />
      </div>
      <div className="my-3">
        <label className="block text-gray-700">Card Number</label>
        <CardElement className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none" />
      </div>
      <div className="my-3 flex flex-col">
        <label className="block text-gray-700">Expiration Date</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <input
            type="text"
            className="form-select block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
            placeholder="MM/YY"
          />
          <input
            type="text"
            className="block w-full col-span-2 px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
            placeholder="Security code"
          />
        </div>
      </div>
      <div className="mt-6 p-4">
        <button
          className="submit-button px-4 py-3 rounded-full bg-blue-300 text-blue-900 focus:ring focus:outline-none w-full text-xl font-semibold transition-colors"
          disabled={!stripe}
        >
          Pay now
        </button>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {success && <div className="text-green-500 mt-4">Payment successful!</div>}
      </div>
    </form>
  );
};

const Payment = () => {
  // Montant fixe pour le paiement
  const amount = 5000; // Par exemple 50.00$

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default Payment;
