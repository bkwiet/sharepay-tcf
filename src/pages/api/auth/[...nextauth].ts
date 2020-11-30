import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { NextApiHandler } from "next";
import OAuth2Client, { OAuth2ClientConstructor } from "@fwl/oauth2";
import { Profile, Tokens, User } from "../../../types/fewlines_connect";

const options = {
  site: process.env.SITE || "http://localhost:3000",

  pages: {
    signIn: "/auth/signin",
    signOut: "/",
    newUser: "/auth/registration",
  },

  providers: [
    // XAV ->> Solve the issue for the "Error: Missing or invalid provider account"
    // Add the id of the provider in the profile
    // https://github.com/nextauthjs/next-auth/issues/429
    {
      id: "connect",
      name: "Fewlines",
      type: "oauth",
      version: "2.0",
      clientId: process.env.CONNECT_CLIENT_ID,
      clientSecret: process.env.CONNECT_CLIENT_SECRET,
      scope: "openid email phone",
      params: { grant_type: "authorization_code" },
      authorizationUrl:
        "https://fewlines.connect.prod.fewlines.tech/oauth/authorize?response_type=code",
      accessTokenUrl: "https://fewlines.connect.prod.fewlines.tech/oauth/token",
      profileUrl: "https://fewlines.connect.prod.fewlines.tech/oauth/userinfo",
      idToken: true,
      state: false,
      profile: (profile: Profile) => {
        return {
          id: "connect",
          name: profile.email,
          aud: profile.aud,
          email: profile.email,
          email_verified: profile.email_verified,
          exp: profile.exp,
          iat: profile.iat,
          iss: profile.iss,
          sub: profile.sub,
        };
      },
    },

    Providers.Google({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],

  callbacks: {
    signIn: async (user: User, tokens: Tokens, profile: Profile) => {
      if (tokens.provider === "connect" && tokens.accessToken) {
        const oauthClientConstructorProps: OAuth2ClientConstructor = {
          openIDConfigurationURL: process.env.CONNECT_OPEN_ID || "",
          clientID: process.env.CONNECT_CLIENT_ID || "",
          clientSecret: process.env.CONNECT_CLIENT_SECRET || "",
          redirectURI: process.env.CONNECT_REDIRECT_URI || "",
          scopes: ["openid", "profile", "email", "phone"],
          audience: "sharepay",
        };

        const oauthClient = new OAuth2Client(oauthClientConstructorProps);

        const decoded = await oauthClient.verifyJWT(
          tokens.accessToken,
          String(process.env.CONNECT_JWT_ALGORITHM)
        );

        if (decoded) {
          user.accessToken = tokens.accessToken;
          return Promise.resolve(true);
        }
      } else if (tokens.provider === "google" || tokens.provider === "github") {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    },

    jwt: async function jwt(token, user: User) {
      if (user) {
        token = {
          username: user.name,
          email: user.email,
          accessToken: user.accessToken,
        };
      }

      return Promise.resolve(token);
    },

    session: async function session(session, token) {
      session.user.name = token.username;
      session.user.email = token.email;
      session.accessToken = token.accessToken;

      return Promise.resolve(session);
    },

    redirect: async (url, baseUrl) => {
      console.log("redirect ", url, baseUrl);
      return url.startsWith(baseUrl)
        ? Promise.resolve("/")
        : Promise.resolve(baseUrl);
    },
  },

  // XAV ->> Solve the issue for :
  //[next-auth][error][adapter_connection_error] MongoServerSelectionError: getaddrinfo ENOTFOUND cluster0.wkttl.mongodb.net
  // https://github.com/nextauthjs/next-auth/issues/833
  database: process.env.MONGODB_URI_TEST,
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
