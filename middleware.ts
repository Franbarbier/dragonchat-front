import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const authCookie = req.cookies.get(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME || "");

  if (!req.nextUrl.pathname.startsWith('/login') && !authCookie) {
    const newUrl = req.nextUrl.clone()
    newUrl.pathname = '/login'
    return NextResponse.redirect(newUrl);
  }

  if (req.nextUrl.pathname.startsWith('/login') && authCookie) {
    const newUrl = req.nextUrl.clone()
    newUrl.pathname = '/dash'
    return NextResponse.redirect(newUrl);
  }

  if (authCookie) {
    const accessToken = JSON.parse(authCookie!.value).access_token;

    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_USER_URL}/ws`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      }
    );
    const { data } = await apiResponse.json();

    if (!data?.connected_whatsapp && !req.nextUrl.pathname.startsWith('/qr') && !req.nextUrl.pathname.startsWith('/user/edit')) {
      const newUrl = req.nextUrl.clone()
      newUrl.pathname = '/qr'
      return NextResponse.redirect(newUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dash", "/qr", "/premium", "/login", "/user/edit"],
};
