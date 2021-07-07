import {Request, Response} from "express";
import { decorators } from "@enzodiazdev/lepp";
import rsa_validation from "./rsa_validation";
import users from "./UsersRepository";
import User from "./User";
import NodeRSA from "node-rsa";
const {Controller, Post, Use} = decorators;

/* Simulate data processing and important logic */
function is_secret(str:string):boolean {
    return str.split(" ").includes("secret");
}

@Controller("/foo")
export default class FooBar {
    //represents any private route
    @Post("/bar")
    @Use(rsa_validation)
    public bar(req:Request, res:Response):void {
        const {id, data} = req.body as {id:string, data:string};

        if(is_secret(data)){
            //generate super secret response
            const secret_response = "this is a secret response";

            const user = users.get_user(id) as User;
            const pub_key = new NodeRSA(user.public_key, "pkcs8-public");

            //encrypt with user public key
            const encrypted_response = pub_key.encrypt(secret_response, "base64");

            res.status(200).json({message: encrypted_response});
        }

        //Because if not secret is not important.
        res.status(204);
    }
}
