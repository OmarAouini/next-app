import { PrismaClient } from ".prisma/client";
import { hash, compare } from "bcrypt";
import {sign} from 'jsonwebtoken'

export default async function login(req, res) {
  
  if (req.method !== "POST") {
    res.status(405).send("only POST allowed!");
  }

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

  //check hashed password
  compare(req.body.password, user.password, function(err, result) {
    if (!err && result) {
        
        //return claims
        const claims = {
            username: user.username,
            email : user.email
        }
 
        //sign token 1 hour
        const jwt_token = sign(claims, 'secret', {expiresIn : '1h', subject: 'user'})
        
        return res.status(200).json({token: jwt_token})
    } else {
        return res.status(500).json("something went wrong compare hash password")
    }
  });
}
