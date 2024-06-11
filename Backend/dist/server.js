"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./src/index"));
const config_1 = require("./src/utils/config");
index_1.default.listen(config_1.PORT, () => {
    console.log("Done");
});
