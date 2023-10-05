import { NextRequest, NextResponse } from "next/server";
import { LOGIN_COOKIE, STRIPE_COOKIE } from "./constants/index";
import { ROUTES } from "./enums";

const handleRedirect = (req: NextRequest, route: ROUTES) => {
  const newUrl = req.nextUrl.clone();
  newUrl.pathname = route;
  return NextResponse.redirect(newUrl);
};

export async function fetchStripeData(req) {

  const authCookie = req.cookies?.dragonchat_login
  const stripeCookie = req.cookies?.stripe_session
  

  if (stripeCookie && authCookie) {
    // const cookies_response = await apiUserController.updatePlan(authCookie, stripeCookie);

    // // Si es 200 Y se ejecuta el await api.ChangePlan (que no esta hecho aun el endpoint)
    // if (cookies_response === 200) {
    //   return cookies_response;
    // }
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
    // const stripe_response = await handleStripeSession(stripe_session)

    
    // // if it is a string and is not empty -> Si la sesion esta ok y existe
    // if (typeof stripe_response?.stripe_session == 'string' && stripe_response?.stripe_session.length > 0) {
    //   // Habria q encodearla y guardarla en la cookie
    //   req.cookies.set(STRIPE_COOKIE, JSON.stringify(stripe_response))
    // }
    
  }
  

  if (authCookie) {
    const accessToken = JSON.parse(authCookie.value || '{}').access_token || '';

    
    // Si esta logeado.. y tambien existe la cookie de stripe. Trigger update plan from api
    if ( req.cookies.get(STRIPE_COOKIE || "STRIPE_COOKIE") ) {
      // traer, desencodearla, y decirle a la api que le pegue al gateway de update plan.
      console.log('stripe session cookie exists')
    }

    
    if (req.nextUrl.pathname.includes(ROUTES.LOGIN)) {
      
      // Cuando caes al login pero existe el authToken, redirigir a dash (sacarle el parametro a la url de stripe)
      // return handleRedirect(req, ROUTES.DASH);
      return NextResponse.next();
    }
    const validateQR = false;

    

    // Esto va si es necesario la conexion antes, pero creo que no.
    // const dataConnection = await fetch(`https://gateway-test.dragonchat.io/api/whatsapp/connect`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`,
    //   },
    // });

    // // if (!dataConnection.ok) {
    // //   throw new Error(`HTTP error! Status: ${dataConnection.status}`);
    // // }

    // // Parse the response as JSON
    // const responseBody = await dataConnection.json();
    
    // if (responseBody.id) {
      //  Le saque el validate QR porque no neceesito la url (me lo sigue trayendo)
      const dataConnection = await fetch(`https://gateway-test.dragonchat.io/api/whatsapp/check-user-conected`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      var resDataQr = { phoneConnected: false }
      
      try {
        resDataQr = await dataConnection.json();
      } catch (error) {
      
      }

      console.log("check user connection", resDataQr)
    // }

    if (resDataQr.phoneConnected && (req.nextUrl.pathname.startsWith(ROUTES.QR) || req.nextUrl.pathname.startsWith(ROUTES.LOGIN))) {
      return handleRedirect(req, ROUTES.DASH);
    }

    if (!resDataQr.phoneConnected && (req.nextUrl.pathname.startsWith(ROUTES.DASH) || req.nextUrl.pathname.startsWith(ROUTES.LOGIN))) {
      return handleRedirect(req, ROUTES.QR);
    }
  }

  return NextResponse.next();
}

export const config = {
  // matcher: [""],
  matcher: ["/dash", "/qr", "/premium", "/login", "/user/edit"],
};
