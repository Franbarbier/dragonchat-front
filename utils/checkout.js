import Cookies from 'js-cookie';
import Stripe from 'stripe';
import { STRIPE_COOKIE } from '../constants/index';


export async function handleStripeSession(id) {

  
  try {
    if (process.env.STRIPE_KEY) {
      const stripe = new Stripe(process.env.STRIPE_KEY, { apiVersion: '2023-08-16' })
      const session = await stripe.checkout.sessions.retrieve(id);

      // check if session has id
      if (session.id) {
        const stripe_session_storage = {
          stripe_session : session.id,
          product_id : 0
        }
        return stripe_session_storage
      }
    }
    
  } catch (error) {
    return ""
  }

};

export async function removeStripeCookie() {
  Cookies.remove(STRIPE_COOKIE)
}

