import { NextRequest, NextResponse } from "next/server";
import { API_GATEWAY_URL, LOGIN_COOKIE } from "./constants/index";
import { API_ROUTES, ROUTES } from "./enums";

const handleRedirect = (req: NextRequest, route: ROUTES) => {
  const newUrl = req.nextUrl.clone();
  newUrl.pathname = route;
  return NextResponse.redirect(newUrl);
};



export async function middleware(req: NextRequest, res) {

  const authCookie = req.cookies.get(LOGIN_COOKIE || "");

  console.log("ejecutoide--------------------------------------------------------------", authCookie)

  if (!req.nextUrl.pathname.startsWith(ROUTES.LOGIN) && !authCookie && !req.nextUrl.pathname.startsWith(ROUTES.SIGN_UP)) {
    return handleRedirect(req, ROUTES.LOGIN);
  }
  
  if (authCookie) {
    const accessToken = JSON.parse(authCookie.value || '{}').access_token || '';
    

    // console.log(req.nextUrl.pathname.includes(ROUTES.SIGN_UP), req.nextUrl.pathname)
    if (req.nextUrl.pathname.includes(ROUTES.SIGN_UP) ) {
      return handleRedirect(req, ROUTES.DASH);
    }

    if (req.nextUrl.pathname.includes(ROUTES.LOGIN) ) {
      // Cuando caes al login pero existe el authToken, redirigir a dash (sacarle el parametro a la url de stripe)
      return handleRedirect(req, `${ROUTES.DASH}/` as ROUTES);
    }
    const validateQR = false;
    
    // Esto va si es necesario la conexion antes, pero creo que no.
    const dataConnection = await fetch(`${API_GATEWAY_URL}${API_ROUTES.CONNECT}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    // Parse the response as JSON
    const responseBody = await dataConnection.json();
    
    var resDataQr = { phoneConnected: false }


    if (responseBody.id) {
      //  Hay que sacarle el validate QR porque no neceesito la url (me lo sigue trayendo)
      const dataConnection = await fetch(`${API_GATEWAY_URL}${API_ROUTES.IS_CONNECTED}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      try {
        resDataQr = await dataConnection.json();
        console.log("ejecutoide--------------------------------------------------------------", resDataQr)
      } catch (error) {}
    }


    if (resDataQr.phoneConnected && (req.nextUrl.pathname.startsWith(ROUTES.QR) || req.nextUrl.pathname.startsWith(ROUTES.LOGIN))) {
      return handleRedirect(req, ROUTES.DASH);
    }

    if (!resDataQr.phoneConnected && (req.nextUrl.pathname.startsWith(ROUTES.DASH) || req.nextUrl.pathname.startsWith(ROUTES.LOGIN))) {
      return handleRedirect(req, ROUTES.QR);
    }


    // if(req.nextUrl.pathname.includes(ROUTES.SIGN_UP)){ return handleRedirect(req, `${ROUTES.DASH}/` as ROUTES); }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dash", "/qr", "/premium", "/login", "/user/edit", "/signup"],
};