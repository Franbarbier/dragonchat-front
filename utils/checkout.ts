import Stripe from 'stripe';

const handleStripeSession = async (id) => {
  if (process.env.STRIPE_KEY) {
    const stripe = new Stripe(process.env.STRIPE_KEY, { apiVersion: '2023-08-16' })
    const session = await stripe.checkout.sessions.retrieve(id);

    if (session?.customer_details?.email) {
      // apiSubscriptionsController.subscribe(token, session.customer_details.email);
    }
  }
};

export default handleStripeSession;