import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config()

const { USER_NAME, PASSWORD } = process.env;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false}));

// Basic ass authentication
server.post("/auth", (req: Request, res: Response)=> {
    if (!req.body.username || !req.body.password) {
        return res.sendStatus(400);
    }

    const { username, password }: { username: string, password: string} = req.body;

    if (username === USER_NAME && password === PASSWORD) {
        res.sendStatus(200);
    } else {
        res.sendStatus(409);
    }
});

server.listen(1523);
