import { NextRequest, NextResponse } from "next/server";
import { API_GATEWAY_URL, LOGIN_COOKIE } from "./constants/index";
import { ROUTES } from "./enums";

const handleRedirect = (req: NextRequest, route: ROUTES) => {
  const newUrl = req.nextUrl.clone();
  newUrl.pathname = route;
  return NextResponse.redirect(newUrl);
};



export async function middleware(req: NextRequest, res) {

  const authCookie = req.cookies.get(LOGIN_COOKIE || "");


  const cookieName = 'STRIPE_COOKIE';

  // Remove the cookie by setting its value to an empty string and adjusting its expiration date
  if (req.cookies[cookieName]) {
    res.setHeader('Set-Cookie', `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`);
  }

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
    
    // // Esto va si es necesario la conexion antes, pero creo que no.
    // const dataConnection = await fetch(`${API_GATEWAY_URL}${API_ROUTES.CONNECT}`,
    // {
    //   cache: 'no-store',
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`,
    //   },
      
    // });
    // // Parse the response as JSON
    // const responseBody = await dataConnection.json();
    

    // const connection = await axios.post(`${API_GATEWAY_URL}${API_ROUTES.CONNECT}`, {}, { headers:{"Authorization": `Bearer ${accessToken}`} });
    

    
    var resDataQr = { phoneConnected: false }


    // if (responseBody.id) {
      //  Hay que sacarle el validate QR porque no neceesito la url (me lo sigue trayendo)
      const dataConnection = await fetch(`${API_GATEWAY_URL}/api/whatsapp/check-user-conected?validateqr=false`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      console.log(dataConnection)
      try {
        resDataQr = await dataConnection.json();
      
        console.log("ejecutoideWPP--------------------------------------------------------------", resDataQr)
      } catch (error) {
        
        console.log(error)
      
      }
    // }


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