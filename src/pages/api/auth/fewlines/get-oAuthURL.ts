import { NextApiRequest, NextApiResponse } from "next";
import OAuth2Client, { OAuth2ClientConstructor, OAuth2Tokens } from "@fwl/oauth2";

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  const oauthClientConstructorProps: OAuth2ClientConstructor = {
    openIDConfigurationURL: process.env.CONNECT_OPEN_ID || "",
    clientID: process.env.CONNECT_CLIENT_ID || "",
    clientSecret: process.env.CONNECT_CLIENT_SECRET || "",
    redirectURI: process.env.CONNECT_REDIRECT_URI || "",
    scopes: ["openid", "email", "phone"],
    audience: "sharepay",
  };

  const oauth2_FConnect_Client = new OAuth2Client(oauthClientConstructorProps);

  const url = await oauth2_FConnect_Client.getAuthorizationURL().then((authUrl) => authUrl.href);

  response.json(JSON.stringify(url));
};
