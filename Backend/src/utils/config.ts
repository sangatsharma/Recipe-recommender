import "dotenv/config";

const PORT: string = process.env.PORT as string;
const DB_HOST: string = process.env.DB_HOST as string;
const DB_PORT: string = process.env.DB_PORT as string;
const DB_DATABASE: string = process.env.DB_DATABASE as string;
const DB_USERNAME: string = process.env.DB_USERNAME as string;
const DB_PASSWORD: string = process.env.DB_PASSWORD as string;
const SECRET: string = process.env.SECRET as string;

export {
  PORT, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, SECRET
};