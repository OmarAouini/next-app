import { PrismaClient } from ".prisma/client";
import { hash, compare } from "bcrypt";
import {sign} from 'jsonwebtoken'
import { createLoginCookie } from "./cookies";

export default async function login(req, res) {
  
  if (req.method !== "POST") {
    res.status(405).send("only POST allowed!");
  }

  ///// this section is where you get the user info, needed to match the password from request
  if (!req.body) {
    res.status(400).send("error getting request body");
  }

  const prisma = new PrismaClient();

  //getting user
  const user = await prisma.user.findUnique({
      where: {
          email : req.body.email
      }
  });

  if (!user) {
      return res.status(404).send("user not found!")
  }
  ///////////

  //check hashed password
  compare(req.body.password, user.password, function(err, result) {
    if (!err && result) {
        
        //return claims
        const claims = {
            username: user.username,
            email : user.email
        }
 
        //sign token 1 hour access token
        const jwt_token = sign(claims, process.env.JWT_SECRET, {expiresIn : process.env.ACCESS_TOKEN_DURATION, subject: 'user_access'})
        
        //sign token refresh 4 h
        const jwt_token_refresh = sign(claims, process.env.JWT_SECRET, {expiresIn : process.env.REFRESH_TOKEN_DURATION, subject: 'user_refresh'})

        //apply cookies with jwt
        createLoginCookie(res, jwt_token, jwt_token_refresh)
        
        return res.status(200).json(user)

    } else {
        console.log(err);
        return res.status(500).json("something went wrong compare hash password")
    }
  });
}
