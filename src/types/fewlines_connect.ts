export type Tokens = {
  provider: string;
  type: string;
  id: string;
  refreshToken: string;
  accessToken: string;
  accessTokenExpires: string;
};

export type Profile = {
  id: string;
  name: string;
  aud: string[];
  email: string;
  email_verified: boolean;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
};

export type User = {
  name: string;
  email: string;
  image: string;
  accessToken?: string;
};
