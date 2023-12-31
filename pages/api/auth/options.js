import dbConnect from "@/lib/mongoose";
import employeeModel from "@/models/employeeModel";
// import jobUserModel from "@/models/jobUserModel";
// import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import jobUserModel from "@/models/jobUserModel";
// import dbConnect from "../../lib/mongoose";
// import GithubProvider from "next-auth/providers/github"
export const authOptions = {
  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
  },
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials, req) {
        // console.log(credentials);
        await dbConnect();
        const user = await employeeModel.findOne(
          { email: credentials.email, password: credentials.password },
          {
            password: 0,
          }
        );
        // console.log(res);
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        //   const res = await fetch("/your/endpoint", {
        //     method: 'POST',
        //     body: JSON.stringify(credentials),
        //     headers: { "Content-Type": "application/json" }
        //   })
        //   const user = await res.json()
        // If no error and we have user data, return it
        if (user && user.email) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        // token.role = user.role;
        // token.email = user.email;
        token.user = user;
        // token.accessToken = user.token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // Send properties to the client, like an access_token from a provider.
      // session.user.role = token.role;
      session.user = token.user;
      // session.accessToken = token.accessToken;
      return session;
    },
  },
};
export default authOptions;
