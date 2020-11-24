import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { NextApiHandler } from "next";
import Adapters from "next-auth/adapters";

const options = {
  site: process.env.SITE || "http://localhost:3000",

  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID || "",
      clientSecret: process.env.FACEBOOK_SECRET || "",
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID || "",
      clientSecret: process.env.TWITTER_SECRET || "",
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

// export default (req, res) => NextAuth(req, res, options);
