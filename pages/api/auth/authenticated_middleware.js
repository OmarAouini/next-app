import { sign, verify } from "jsonwebtoken"
import { createLoginCookie, createLogoutCookie } from "./cookies"

//wrapper function to protect api routes with jwt verification read from cookies
export const authenticated = (fn) => async (req, res) => {
    verify(req.cookies["access_token"], process.env.JWT_SECRET, async (err, decodedAccess) => {
        if(!err && decodedAccess && decodedAccess.expiresIn > new Date().getSeconds()) { // if access token duration > now, still valid
            return await fn(req, res)
        }
        if (req.cookies["access_token"].expiresIn <= 0) { //refresh token check, if zero, get new access and refresh token
            verify(req.cookies["refresh_token"], process.env.JWT_SECRET, async (err, decodedRefresh) => {
                if(!err && decodedRefresh && decodedRefresh.expiresIn > new Date().getSeconds()) { // still have refresh token, set new access token in response
                    //sign token 1 hour access token
                    const jwt_token = sign(claims, process.env.JWT_SECRET, {expiresIn : process.env.ACCESS_TOKEN_DURATION, subject: 'user_access'})
                    
                    //sign token refresh 4 h
                    const jwt_token_refresh = sign(claims, process.env.JWT_SECRET, {expiresIn : process.env.REFRESH_TOKEN_DURATION, subject: 'user_refresh'})

                    createLoginCookie(res, jwt_token, jwt_token_refresh)

                    return await fn(req, res)
                }
            })
        }
        // does not have refresh or access token, logout unhautorized
        createLogoutCookie(res)
        res.status(403).json({message: "unhautenticated"})
    })
}