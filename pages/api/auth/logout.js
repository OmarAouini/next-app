import { createLogoutCookie } from "./cookies"

export default function logout(req, res) {
    if (req.method !== "POST") {
        res.status(405).send("only POST allowed!")
    }

    //create logout cookies
    createLogoutCookie(res)

    res.send()
    
};
