export type UserData = {
  password: string;
  id: number;
  name: string;
  email: string;
  joinedOn: Date | null;
  followers: number;
  following: number;
};

export interface JwtPayload {
  id: number
  email: string,
}