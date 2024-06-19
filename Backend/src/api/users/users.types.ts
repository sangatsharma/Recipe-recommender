export type RegisterForm = {
  name: string,
  email: string,
  password?: string,
  verified?: number,
};

export type LoginForm = {
  email: string,
  password: string,
};

export type UserDataDB = {
  id: number;
  name: string;
  email: string;
  password: string | null;
  joinedOn: Date;
  followers: number;
  following: number;
  verified: number,
};

export type JsonResponse = {
  success: boolean;
  body: {
    [message: string]: string | number | Date
  };
};

export type JwtPayload = {
  id: number
  email: string,
  verified: number,
};


// GOOGLE OAUTH
export type AccessTokenData = {
  access_token: string,
  expires_in: number,
  scope: string,
  token_type: string,
  id_token: string
};

export type TokenInfoResponse = {
  name: string;
  email: string;
};