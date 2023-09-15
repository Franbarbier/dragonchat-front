import { NextRequest, NextResponse } from "next/server";
import apiUserController from "./api/apiUserController";
import { API_SENDER_URL, LOGIN_COOKIE } from "./constants/index";
import { API_PARAMS, API_RESPONSES, API_ROUTES, HTTP_HEADERS_KEYS, HTTP_HEADERS_VALUES, ROUTES } from "./enums";

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

    if (cookies_response === 200) {
      return cookies_response;
    }
  }

  return 0;
}

export async function middleware(req: NextRequest) {

  const authCookie = req.cookies.get(LOGIN_COOKIE || "");

  if (!req.nextUrl.pathname.startsWith(ROUTES.LOGIN) && !authCookie) {
    return handleRedirect(req, ROUTES.LOGIN);
  }

  if (authCookie) {
    const accessToken = JSON.parse(authCookie.value || '{}').access_token || '';

    if (req.nextUrl.pathname.includes(ROUTES.LOGIN)) {
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
  matcher: ["/dash", "/qr", "/premium", "/login", "/user/edit"],
};
