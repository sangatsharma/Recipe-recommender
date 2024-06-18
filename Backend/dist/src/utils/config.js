"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_ACCOUNT = exports.EMAIL_APP_PASS = exports.GOOGLE_TOKEN_INFO_URL = exports.GOOGLE_ACCESS_TOKEN_URL = exports.GOOGLE_OAUTH_URL = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = exports.DB_URL = exports.ENDPOINT_ID = exports.SECRET = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_DATABASE = exports.DB_PORT = exports.DB_HOST = exports.ENV = exports.PORT = void 0;
require("dotenv/config");
const PORT = process.env.PORT;
exports.PORT = PORT;
const SECRET = process.env.SECRET;
exports.SECRET = SECRET;
const ENV = process.env.ENV;
exports.ENV = ENV;
// DB
const DB_HOST = ENV === "PROD"
    ? process.env.DB_HOST
    : process.env.DB_HOST_DEV;
exports.DB_HOST = DB_HOST;
const DB_PORT = ENV === "PROD"
    ? process.env.DB_PORT
    : process.env.DB_PORT_DEV;
exports.DB_PORT = DB_PORT;
const DB_DATABASE = ENV === "PROD"
    ? process.env.DB_DATABASE
    : process.env.DB_DATABASE_DEV;
exports.DB_DATABASE = DB_DATABASE;
const DB_USERNAME = ENV === "PROD"
    ? process.env.DB_USERNAME
    : process.env.DB_USERNAME_DEV;
exports.DB_USERNAME = DB_USERNAME;
const DB_PASSWORD = ENV === "PROD"
    ? process.env.DB_PASSWORD
    : process.env.DB_PASSWORD_DEV;
exports.DB_PASSWORD = DB_PASSWORD;
const DB_URL = ENV === "PROD"
    ? process.env.DB_URL
    : process.env.DB_URL_DEV;
exports.DB_URL = DB_URL;
const ENDPOINT_ID = process.env.ENDPOINT_ID;
exports.ENDPOINT_ID = ENDPOINT_ID;
// OAUTH
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
exports.GOOGLE_CLIENT_SECRET = GOOGLE_CLIENT_SECRET;
const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;
exports.GOOGLE_OAUTH_URL = GOOGLE_OAUTH_URL;
const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL;
exports.GOOGLE_ACCESS_TOKEN_URL = GOOGLE_ACCESS_TOKEN_URL;
const GOOGLE_TOKEN_INFO_URL = process.env.GOOGLE_TOKEN_INFO_UR;
exports.GOOGLE_TOKEN_INFO_URL = GOOGLE_TOKEN_INFO_URL;
const EMAIL_APP_PASS = process.env.EMAIL_APP_PASS;
exports.EMAIL_APP_PASS = EMAIL_APP_PASS;
const EMAIL_ACCOUNT = process.env.EMAIL_ACCOUNT;
exports.EMAIL_ACCOUNT = EMAIL_ACCOUNT;
