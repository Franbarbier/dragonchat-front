import { NextRequest, NextResponse } from "next/server";
import { API_SENDER_URL, LOGIN_COOKIE } from "./constants/index";
import { API_PARAMS, API_RESPONSES, API_ROUTES, HTTP_HEADERS_KEYS, HTTP_HEADERS_VALUES, ROUTES } from "./enums";

const handleRedirect = (req: NextRequest, route: ROUTES) => {
  const newUrl = req.nextUrl.clone();
  newUrl.pathname = route;
  return NextResponse.redirect(newUrl);
};

export async function middleware(req: NextRequest) {
  const authCookie = req.cookies.get(LOGIN_COOKIE);
  // const authCookie = {
  //   value: `{"access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOjEwLCJpYXQiOjE2MzIwNjY0NzMsImV4cCI6"}`
  // }

  if (!req.nextUrl.pathname.startsWith(ROUTES.LOGIN) && !authCookie) {
    return handleRedirect(req, ROUTES.LOGIN);
  }

  // if (req.nextUrl.pathname.startsWith(ROUTES.LOGIN) && req.nextUrl.searchParams.get(STRIPE_COOKIE)) {
  //   const stripeResponse = await handleStripeSession(req.nextUrl.searchParams.get(STRIPE_COOKIE))

  //   if (stripeResponse) {
  //     req.cookies.set(STRIPE_COOKIE, JSON.stringify(encrypt(stripeResponse)))
  //   }
  // }

  if (authCookie) {
    const accessToken = JSON.parse(authCookie.value || '{}').access_token || '';

    if (req.nextUrl.pathname.includes(ROUTES.LOGIN)) {
      // Cuando caes al login pero existe el authToken, redirigir a dash (sacarle el parametro a la url de stripe)
      return handleRedirect(req, `${ROUTES.DASH}/` as ROUTES);
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