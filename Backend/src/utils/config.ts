import "dotenv/config";

const PORT:string | undefined = process.env.PORT;
const DB_HOST:string | undefined = process.env.DB_HOST;
const DB_PORT:string | undefined = process.env.DB_PORT;
const DB_DATABASE:string | undefined = process.env.DB_DATABASE;
const DB_USERNAME:string | undefined = process.env.DB_USERNAME;
const DB_PASSWORD:string | undefined = process.env.DB_PASSWORD;
const SECRET:string | undefined = process.env.SECRET;

export {
  PORT, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, SECRET
};