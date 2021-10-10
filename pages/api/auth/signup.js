import { PrismaClient } from '.prisma/client';
import {hash} from 'bcrypt'

export default function signup(req, res) {
    if (req.method !== "POST") {
        return res.status(405).send("only POST allowed!")
    }

    if (!req.body) {
        return res.status(400).send("error getting request body")
    }

    const prisma = new PrismaClient()

    //hash password
    hash(req.body.password, 10, async (err, hash) => {
        //save new user with hash password
        const user_new = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: hash
            }
        });
        return res.status(201).json(user_new)
    });
};
