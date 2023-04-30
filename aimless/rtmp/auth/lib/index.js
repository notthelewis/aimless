"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { USER_NAME, PASSWORD } = process.env;
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: false }));
// Basic ass authentication
server.post("/auth", (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.sendStatus(400);
    }
    const { username, password } = req.body;
    if (username === USER_NAME && password === PASSWORD) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(409);
    }
});
server.listen(1523);
