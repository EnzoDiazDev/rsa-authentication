import { Request, Response, NextFunction } from "express";
import users from "./UsersRepository";
import NodeRSA from "node-rsa";

const server_rsa = new NodeRSA(process.env.PRIVATE_KEY as string, "pkcs8-private");

export default function rsa_validation(req:Request, res:Response, next:NextFunction):void {
    const {id, data} = req.body;
    if(!id || !data){
        res.status(400).json({ message: "Bad Request" });
        return;
    }

    const user = users.get_user(id);
    if(!user) {
        res.status(401).json({ message: "You need to register this id" });
        return;
    }

    //TODO: add key and data format validations

    const buffer = Buffer.from(data, "base64"); //data must be in base64
    req.body.data = server_rsa.decrypt(buffer, "utf8");

    next();
}
