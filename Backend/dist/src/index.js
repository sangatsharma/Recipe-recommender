"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const recipes_routes_1 = __importDefault(require("@/api/recipes/recipes.routes"));
const users_routes_1 = __importDefault(require("@/api/users/users.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const middleware_1 = require("@/utils/middleware");
const errorHandler_1 = require("@/utils/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    //Todo: remove localhost later
    origin: ["https://recipe-recommender-five.vercel.app", "http://localhost:5173"],
    credentials: true,
    optionsSuccessStatus: 200,
    maxAge: 86400,
    methods: ["GET, POST, PUT, DELETE"]
}));
app.set("view engine", "ejs");
console.log(__dirname);
app.set("views", path_1.default.join(__dirname, "views"));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
/*
ROUTES
*/
// Recipe route
app.use("/recipe", recipes_routes_1.default); //recipes
app.use("/user", users_routes_1.default); //users
// Handle unknown endpoint
app.use(middleware_1.unknownEndPoint);
// Handle errors
app.use(errorHandler_1.errorHandler);
exports.default = app;
