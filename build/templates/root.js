"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootLoggedOutTemplate = exports.rootLoggedInTemplate = void 0;
exports.rootLoggedInTemplate = `
    <div>
        <div>You are logged in</div>
        <a href="/auth/logout">Logout</a>
    </div>
`;
exports.rootLoggedOutTemplate = `
    <div>
        <div>You are logged out</div>
        <a href="/auth/login">Login</a>
    </div>
`;
