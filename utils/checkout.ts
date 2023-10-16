import Cookies from 'js-cookie';
import Stripe from 'stripe';
import { STRIPE_COOKIE, STRIPE_KEY } from '../constants/index';


export async function handleStripeSession(id) {
  try {
    if (STRIPE_KEY) {
      const stripe = new Stripe(STRIPE_KEY, { apiVersion: '2023-08-16' })
      const session = await stripe.checkout.sessions.retrieve(id);

      return session.id ? {
        session_id: session.id,
        product_id: "venom"
      } : null;
    }

    return null;
  } catch (error) {
    return null
  }
};

export async function removeStripeCookie() {
  Cookies.remove(STRIPE_COOKIE)
}

