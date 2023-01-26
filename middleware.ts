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

  if (!isAuthenticated) {
    if (requestedPage !== "/login" && requestedPage !== "/signup" && requestedPage !== "/new_password" && requestedPage !== "/recover_password") {
      url.pathname = "/login";
      response = NextResponse.redirect(url);
    }
  } else if (isAuthenticated) {
    if (requestedPage == "/login" || requestedPage == "/signup" || requestedPage == "/new_password" || requestedPage == "/recover_password") {
      url.pathname = "/dash";
      response = NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: ["/dash", "/qr", "/premium", "/login", "/signup", "/new_password", "/recover_password"],
};
