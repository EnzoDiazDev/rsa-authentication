import {Request, Response} from "express";
import { decorators } from "@enzodiazdev/lepp";
import User from "./User";
import users from "./UsersRepository";
const {Controller, Post} = decorators;

@Controller("/authentication")
export default class Authentication {
    @Post("/register")
    public register(req:Request, res:Response):void {
        const {id, public_key} = req.body;
        if(!id || !public_key) {
            res.status(400).json({ message: "Bad Request" });
            return;
        }

        const new_user = new User(id, public_key);
        try {
            users.add_user(new_user);

            res.status(201).json({
                message: "Registration completed",
                data: {
                    public_key: "-----BEGIN PUBLIC KEY-----\nMFswDQYJKoZIhvcNAQEBBQADSgAwRwJAf/URz0L5C/UQx5U7f9hQsKg0oyjbyfOi\nwW+nw7uVPuEvQEpXcoZxUFT3CowenIZPTqE55r3urlz/qny/plUlJQIDAQAB\n-----END PUBLIC KEY-----"
                }
            });

        } catch {
            res.status(409).json({ message: "This id is already in use"});
        }
    }
}


