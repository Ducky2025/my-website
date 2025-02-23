require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.post('/create-subscription', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1999, // $19.99
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        plan: 'pro_monthly'
      }
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
