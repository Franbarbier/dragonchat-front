import { withIronSession } from "next-iron-session";

export default function withSession(handler: any) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME as string,
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: false // TODO should be set as process.env.NODE_ENV === "production" when SSL certificates are installed
    },
  });
}