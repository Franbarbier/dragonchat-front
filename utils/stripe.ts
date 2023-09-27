import apiUserController from "../api/apiUserController";
import { decrypt } from "./crypto";

export async function fetchStripeData(req) {
  const authCookie = req.cookies?.dragonchat_login;
  const stripeCookie = req.cookies?.stripe_session;

  if (stripeCookie && authCookie) {
    console.log('stripe session cookie exists', stripeCookie)
    const cookies_response = await apiUserController.updatePlan(authCookie, decrypt(JSON.parse(req.cookies?.stripe_session)));

    // Si es 200 Y se ejecuta el await api.ChangePlan (que no esta hecho aun el endpoint)
    if (cookies_response === 200) {
      return cookies_response;
    }
  }

  return 0;
}