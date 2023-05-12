"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const AppRouter_1 = require("./AppRouter");
require("./controllers/loginController");
require("./controllers/RootController");
const app = (0, express_1.default)(); // init express
// tell express app to use middlewares
app.use(body_parser_1.default.urlencoded({ extended: true })); // parse and add body property to request objects
app.use((0, cookie_session_1.default)({ keys: ['abcd'] })); // cookie encryption key
app.use(AppRouter_1.AppRouter.getInstance()); // use the controller router middleware
app.listen(3000); // listen on port 3000
