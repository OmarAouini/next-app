import { verify } from "jsonwebtoken"

//wrapper function to protect api routes with jwt verification
export const authenticated = (fn) => async (req, res) => {
    verify(req.headers.authorization, 'secret', async (err, decoded) => {
        if(!err && decoded) {
            return await fn(req, res)
        }
        res.status(403).json({message: "unhautenticated"})
    })
}