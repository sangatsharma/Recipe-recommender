import "dotenv/config";

const PORT: string = process.env.PORT as string;
const SECRET: string = process.env.SECRET as string;

const ENV: string = process.env.ENV as string;

// DB
const DB_HOST: string = ENV === "PROD"
  ? process.env.DB_HOST as string
  : process.env.DB_HOST_DEV as string;

const DB_PORT: string = ENV === "PROD"
  ? process.env.DB_PORT as string
  : process.env.DB_PORT_DEV as string;

const DB_DATABASE: string = ENV === "PROD"
  ? process.env.DB_DATABASE as string
  : process.env.DB_DATABASE_DEV as string;

const DB_USERNAME: string = ENV === "PROD"
  ? process.env.DB_USERNAME as string
  : process.env.DB_USERNAME_DEV as string;

const DB_PASSWORD: string = ENV === "PROD"
  ? process.env.DB_PASSWORD as string
  : process.env.DB_PASSWORD_DEV as string;

const DB_URL: string = ENV === "PROD"
  ? process.env.DB_URL as string
  : process.env.DB_URL_DEV as string;

const ENDPOINT_ID: string = process.env.ENDPOINT_ID as string;

// OAUTH
const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET as string;
const GOOGLE_OAUTH_URL: string = process.env.GOOGLE_OAUTH_URL as string;
const GOOGLE_ACCESS_TOKEN_URL: string = process.env.GOOGLE_ACCESS_TOKEN_URL as string;
const GOOGLE_TOKEN_INFO_URL: string = process.env.GOOGLE_TOKEN_INFO_UR as string;

export {
  PORT,
  ENV,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  SECRET,
  ENDPOINT_ID,
  DB_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_OAUTH_URL,
  GOOGLE_ACCESS_TOKEN_URL,
  GOOGLE_TOKEN_INFO_URL,
};