import { NextRequest, NextResponse } from "next/server";
import { API_GATEWAY_URL, LOGIN_COOKIE, MAINTENANCE } from "./constants/index";
import { ROUTES } from "./enums";

const handleRedirect = (req: NextRequest, route: ROUTES) => {
  const newUrl = req.nextUrl.clone();
  newUrl.pathname = route;
  return NextResponse.redirect(newUrl);
};

export async function middleware(req: NextRequest, _) {
  const authCookie = req.cookies.get(LOGIN_COOKIE || "");

  // Si esta en mantenimiento y no es la pagina de login, redirigir a login
  if (MAINTENANCE && !req.nextUrl.pathname.startsWith(ROUTES.LOGIN)) {
    return handleRedirect(req, ROUTES.LOGIN);
  }

  if (MAINTENANCE) {
    return req.nextUrl.pathname.startsWith(ROUTES.LOGIN) ? NextResponse.next() : handleRedirect(req, ROUTES.LOGIN);
  }

  // Las paginas que podes acceder sin estar logeado: login, signup, recover pass, new pass y checkout (esta no está dentro del middleware)
  if (!req.nextUrl.pathname.startsWith(ROUTES.LOGIN) && !authCookie && !req.nextUrl.pathname.startsWith(ROUTES.SIGN_UP) && !req.nextUrl.pathname.startsWith(ROUTES.RECOVER) && !req.nextUrl.pathname.startsWith(ROUTES.NEW_PASS)) {
    return handleRedirect(req, ROUTES.LOGIN);
  }

  if (authCookie) {
    const accessToken = JSON.parse(authCookie.value || '{}').access_token || '';

    if (req.nextUrl.pathname.includes(ROUTES.SIGN_UP)) {
      return handleRedirect(req, ROUTES.DASH);
    }

    if (req.nextUrl.pathname.includes(ROUTES.LOGIN)) {
      // Cuando caes al login pero existe el authToken, redirigir a dash (sacarle el parametro a la url de stripe)
      return handleRedirect(req, `${ROUTES.DASH}/` as ROUTES);
    }
    const validateQR = false;


    var resDataQr = { phoneConnected: false }


    //  Hay que sacarle el validate QR porque no neceesito la url (me lo sigue trayendo)
    try {
      const dataConnection = await fetch(`${API_GATEWAY_URL}/api/whatsapp/check-user-conected?validateqr=false`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      resDataQr = await dataConnection.json();
    } catch (error) {
      // Si es 412 conexion no establecida, cualquier otro: error
      console.log(error)
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
  matcher: ["/dash", "/qr", "/premium", "/login", "/user/edit", "/signup", "/recover_password", "/new_password"],
};