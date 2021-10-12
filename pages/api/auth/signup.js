import { PrismaClient } from '.prisma/client';
import {hash} from 'bcrypt'
import { prisma } from '../lib/prisma';

export default function signup(req, res) {
    if (req.method !== "POST") {
        return res.status(405).send("only POST allowed!")
    }

    if (!req.body) {
        return res.status(400).send("error getting request body")
    }

    //hash password
    hash(req.body.password, parseInt(process.env.PASSWORD_HASH_SALTROUNDS), async (err, hash) => {
        console.log(hash);
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
