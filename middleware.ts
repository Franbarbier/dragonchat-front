import { NextRequest, NextResponse } from "next/server";
import apiUserController from "./api/apiUserController";
import { API_SENDER_URL, LOGIN_COOKIE, STRIPE_COOKIE } from "./constants/index";
import { API_PARAMS, API_RESPONSES, API_ROUTES, HTTP_HEADERS_KEYS, HTTP_HEADERS_VALUES, ROUTES } from "./enums";
import { handleStripeSession } from "./utils/checkout";

const handleRedirect = (req: NextRequest, route: ROUTES) => {
  const newUrl = req.nextUrl.clone();
  newUrl.pathname = route;
  return NextResponse.redirect(newUrl);
};

export async function fetchStripeData(req) {

  const authCookie = req.cookies?.dragonchat_login
  const stripeCookie = req.cookies?.stripe_session
  

  if (stripeCookie && authCookie) {
    const cookies_response = await apiUserController.updatePlan(authCookie, stripeCookie);

    // Si es 200 Y se ejecuta el await api.ChangePlan (que no esta hecho aun el endpoint)
    if (cookies_response === 200) {
      return cookies_response;
    }
  }

  return 0;
}


export async function middleware(req: NextRequest) {

  const authCookie = req.cookies.get(LOGIN_COOKIE || "");
  // const authCookie = {
  //   value: `{"access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOjEwLCJpYXQiOjE2MzIwNjY0NzMsImV4cCI6"}`
  // }

  if (!req.nextUrl.pathname.startsWith(ROUTES.LOGIN) && !authCookie) {
    return handleRedirect(req, ROUTES.LOGIN);
  }
  
  
  // Si hay un parametro session_id (stripe) en la url
  if (req.nextUrl.searchParams.get('session_id')) {
    const stripe_session = req.nextUrl.searchParams.get('session_id')
    const stripe_response = await handleStripeSession(stripe_session)

    // if it is a string and is not empty
    if (typeof stripe_response?.stripe_session == 'string' && stripe_response?.stripe_session.length > 0) {
      req.cookies.set(STRIPE_COOKIE || "STRIPE_COOKIE", JSON.stringify(stripe_response))
    }
    
  }
  

  if (authCookie) {
    const accessToken = JSON.parse(authCookie.value || '{}').access_token || '';

    
    // Si esta logeado.. y tambien existe la cookie de stripe. Trigger update plan from api
    if ( req.cookies.get(STRIPE_COOKIE || "STRIPE_COOKIE")) {
      console.log('stripe session cookie exists')
    }
    console.log('stripe session cookie exists?????')

    
    if (req.nextUrl.pathname.includes(ROUTES.LOGIN)) {
      // Cuando caes al login pero existe el authToken, redirigir a dash
      // return handleRedirect(req, ROUTES.DASH);
      return NextResponse.next();
    }
    const validateQR = false;

    const apiResponse = await fetch(
      `${API_SENDER_URL}${API_ROUTES.IS_CONNECTED}?${API_PARAMS.VALIDATE_QR}=${validateQR}`,
      {
        headers: {
          [HTTP_HEADERS_KEYS.CONTENT_TYPE]: HTTP_HEADERS_VALUES.APLICATION_JSON,
          [HTTP_HEADERS_KEYS.AUTHORIZATION]: `${HTTP_HEADERS_VALUES.BEARER} ${accessToken}`,
        }
      }
    );

    const response = await apiResponse.json();

    if (response.error && response.error.toLowerCase() === API_RESPONSES.UNAUTHORIZED) {
      if (process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME) {
        req.cookies.delete(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME);
      }
      req.cookies.clear();
      return handleRedirect(req, ROUTES.LOGIN);
    }

    if (!response) {
      return NextResponse.error();
    }

    if (response.phoneConnected && (req.nextUrl.pathname.startsWith(ROUTES.QR) || req.nextUrl.pathname.startsWith(ROUTES.LOGIN))) {
      return handleRedirect(req, ROUTES.DASH);
    }

    if (!response.phoneConnected && (req.nextUrl.pathname.startsWith(ROUTES.DASH) || req.nextUrl.pathname.startsWith(ROUTES.LOGIN))) {
      return handleRedirect(req, ROUTES.QR);
    }
  }

  return NextResponse.next();
}

export const config = {
  // matcher: [""],
  matcher: ["/dash", "/qr", "/premium", "/login", "/user/edit"],
};
