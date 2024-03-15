import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);
import {
  DEFAULT_LOGIN_REDIRECT,
  apiPrefix,
  authRoutes,
  publicRoutes,
} from "./Allroutes";
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiprefix = nextUrl.pathname.startsWith(apiPrefix);
  const isPublic = publicRoutes.includes(req.nextUrl.pathname);
  const isauthRoutes = authRoutes.includes(req.nextUrl.pathname);

  if (isApiprefix) {
    return;
  }
  // console.log(isLoggedIn)
  if(isauthRoutes){
    if(isLoggedIn){
      console.log("faba")
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl));
    }
    return;
  }
  if(!isLoggedIn && !isPublic){
      return Response.redirect(new URL("/auth/login",nextUrl));
  }
  return;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
