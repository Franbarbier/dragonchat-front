import { NextRequest, NextResponse } from "next/server";
import { API_SENDER_URL, LOGIN_COOKIE } from "./constants/ index";
import { API_ROUTES, ROUTES } from "./enums";

const handleRedirect = (req: NextRequest, route: ROUTES) => {
  const newUrl = req.nextUrl.clone();
  newUrl.pathname = route;
  return NextResponse.redirect(newUrl);
}

export async function middleware(req: NextRequest) {
  const authCookie = req.cookies.get(LOGIN_COOKIE || "");

  if (!req.nextUrl.pathname.startsWith(ROUTES.LOGIN) && !authCookie) {
    return handleRedirect(req, ROUTES.LOGIN);
  }

  if (req.nextUrl.pathname.startsWith(ROUTES.LOGIN) && authCookie) {
    return handleRedirect(req, ROUTES.DASH);
  }

  if (authCookie) {
    const accessToken = JSON.parse(authCookie.value).access_token;
    const apiResponse = await fetch(
      `${API_SENDER_URL}${API_ROUTES.IS_CONNECTED}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        }
      }
    );
    const response = await apiResponse.json();

    if (req.nextUrl.pathname.startsWith(ROUTES.QR) && (response?.phoneConnected || response?.userData)) {
      return handleRedirect(req, ROUTES.DASH);
    }

    if(!req.nextUrl.pathname.startsWith(ROUTES.QR) && !(response?.phoneConnected || response?.userData)) {
      return handleRedirect(req, ROUTES.QR);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dash", "/qr", "/premium", "/login", "/user/edit"],
};
