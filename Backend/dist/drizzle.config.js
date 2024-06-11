"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drizzle_kit_1 = require("drizzle-kit");
var config_1 = require("../src/utils/config");
exports.default = (0, drizzle_kit_1.defineConfig)({
    dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
    schema: [
        "./src/api/recipes/recipes.models.ts",
        "./src/api/users/users.models.ts"
    ],
    out: "./drizzle",
    dbCredentials: {
        url: config_1.DB_URL,
    }
});
