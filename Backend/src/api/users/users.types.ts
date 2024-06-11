export type UserData = {
  id: number | null;
  name: string;
  email: string;
  password: string;
  joinedOn: Date | null;
  followers: number;
  following: number;
};

export type JwtPayload = {
  id: number
  email: string,
};