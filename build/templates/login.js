"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginTemplate = void 0;
exports.loginTemplate = `
    <form method="POST">
        <div>
            <label>Email</label>
            <input name="email" />
        </div>
        <div>
            <label>Password</label>
            <input name="password" type="password" />
        </div>
        <button>Submit</button>
    </form>
`;
