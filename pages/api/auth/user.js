import { decode } from "jsonwebtoken"


export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).send("only POST allowed!")
    }

    console.log("getting user form cookies...");

    if(req.cookies["access_token"]) {
        return res.json(decode(req.cookies["access_token"]))
    }
    
    if(req.cookies["refresh_token"]) {
        return res.json(decode(req.cookies["refresh_token"]))
    }
}