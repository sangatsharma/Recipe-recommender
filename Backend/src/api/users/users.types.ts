export type RegisterForm = {
  name: string,
  email: string,
  password: string,
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
};

export type JsonResponse = {
  success: boolean;
  body: {
    [message: string]: any
  };
};

export type JwtPayload = {
  id: number
  email: string,
};