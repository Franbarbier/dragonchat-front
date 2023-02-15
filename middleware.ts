import { NextRequest, NextResponse } from "next/server";

const headers = new Headers({
  "Content-Type": "application/json",
});

export async function middleware(req: NextRequest) {
  // commons
  const requestedPage = req.nextUrl.pathname;
  const url = req.nextUrl.clone();

  // verify if dragonchat_login cookie exists
  const authenticated = req.cookies.get(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME || "");
  const isAuthenticated = authenticated !== undefined;
  const isLoginPage = requestedPage === "/login";

  let response = NextResponse.next();

  if (!isAuthenticated && !isLoginPage) {
    url.pathname = "/login";
    response = NextResponse.redirect(url);
  } else if (isAuthenticated) {
    if (isLoginPage) {
      url.pathname = "/dash";
      response = NextResponse.redirect(url);
    } else {
      const accessToken = JSON.parse(authenticated.value).access_token;
      headers.append("Authorization", `Bearer ${accessToken}`);
      const apiResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_USER_URL}/ws`,
        { headers }
      );
      const data = await apiResponse.json();
      const isWhatsAppConnected = data.data.connected_whatsapp;
      if (!isWhatsAppConnected) {
        if (requestedPage !== "/qr" && requestedPage !== "/user/edit") {
          // url.pathname = "/qr";
          // response = NextResponse.redirect(url);
        }
      }
    }
  }
  return response;
}

export const config = {
  matcher: ["/dash", "/qr", "/premium", "/login", "/user/edit"],
};
