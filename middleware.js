// export default async function middleware(req, res) {
//   const body = req.headers.get("token");
//   //   console.log(body);

//   //   return NextResponse.next();
// }

// to apply authentication to all next pages
// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/dashboard"] };

import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req, event) {
  const token = await getToken({ req });
  //   console.log("in");
  //   console.log(token);
  //   console.log(token.user.adminLevel === 1);
  //   if (req.nextUrl.pathname.startsWith("/login") && !!token) {
  //     return NextResponse.redirect(new URL("/dashboard", req.url));
  //   }
  const authMiddleware = withAuth({
    callbacks: {
      authorized: async () => {
        if (req.nextUrl.pathname.startsWith("/dashboard/admin")) {
          if (token && token.user && token.user.adminLevel === 1) {
            return true;
          } else {
            return false;
          }
          // return token && token.user && token.user.adminLevel === 1;
        }
        return !!token;
      },
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}
export const config = { matcher: ["/dashboard/:path*"] };

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log(req.nextauth.token);
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token?.role === "admin",
//     },
//   }
// );

// export const config = { matcher: ["/dashboard"] };
