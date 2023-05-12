"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authRoutes_1 = require("./routes/authRoutes");
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var app = (0, express_1.default)(); // init express
// tell express app to use middlewares
app.use(body_parser_1.default.urlencoded({ extended: true })); // parse and add body property to request objects
app.use((0, cookie_session_1.default)({ keys: ['abcd'] })); // cookie encryption key
app.use(authRoutes_1.router); // use the router middleware we created (holds our routes)
app.listen(3000); // listen on port 3000
