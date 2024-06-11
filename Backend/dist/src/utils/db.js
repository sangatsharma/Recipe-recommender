"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
/*
  CONNECT TO DB: EXECUTE QUERIES
*/
const postgres_js_1 = require("drizzle-orm/postgres-js");
const postgres_1 = __importDefault(require("postgres"));
const config_1 = require("../utils/config");
const pg = (0, postgres_1.default)({
    host: config_1.DB_HOST,
    port: Number(config_1.DB_PORT),
    database: config_1.DB_DATABASE,
    username: config_1.DB_USERNAME,
    password: config_1.DB_PASSWORD,
});
exports.db = (0, postgres_js_1.drizzle)(pg);
