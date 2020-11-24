import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { NextApiHandler } from "next";
import Adapters from "next-auth/adapters";

import OAuth2Client, { OAuth2ClientConstructor, OAuth2Tokens } from "@fwl/oauth2";

const oauthClientConstructorProps: OAuth2ClientConstructor = {
  openIDConfigurationURL: process.env.CONNECT_OPEN_ID || "",
  clientID: process.env.CONNECT_CLIENT_ID || "",
  clientSecret: process.env.CONNECT_CLIENT_SECRET || "",
  redirectURI: process.env.CONNECT_REDIRECT_URI || "",
  scopes: ["openid", "profile", "email", "phone"],
  audience: "sharepay",
};

const oauth2_FConnect_Client = new OAuth2Client(oauthClientConstructorProps);

const url = await oauth2_FConnect_Client.getAuthorizationURL().then((authUrl) => authUrl.href);

const options = {
  site: process.env.SITE || "http://localhost:3000",

  // Configure one or more authentication providers
  providers: [
    {
      id: "connect",
      name: "Fewlines",
      type: "oauth",
      version: "2.0",
      clientId: process.env.CONNECT_CLIENT_ID,
      clientSecret: process.env.CONNECT_CLIENT_SECRET,
      scope: ["openid", "email", "phone"],
      params: { grant_type: "authorization_code" },
      authorizationUrl: "https://fewlines.connect.prod.fewlines.tech/oauth/authorize",
      accessTokenUrl: "https://fewlines.connect.prod.fewlines.tech/oauth/token",
      redirectUri: "http://localhost:3000/api/auth/callback/connect",
      idToken: true,
    },

    Providers.Google({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
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

  callbacks: {
    redirect: async (url, baseUrl) => {
      console.log("Callback redirect", url, baseUrl);
    },

    signIn: async (user, account, metadata) => {
      console.log("Callback fewlines : ", metadata, account);
      if (account.provider === "connect") {
        // const connect_user = {
        //   id: metadata.id,
        //   login: metadata.login,
        //   name: metadata.name,
        //   avatar: user.image,
        // };

        return true;
      }

      return false;
    },

    jwt: async function jwt(token, user) {
      console.log("jwt");
      if (user) {
        token = { accessToken: user.accessToken };
      }

      return token;
    },
    session: async function session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
