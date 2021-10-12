import { sign, verify } from "jsonwebtoken"
import { createLoginCookie, createLogoutCookie } from "./cookies"
import cookies from 'cookie'

//wrapper function to protect api routes with jwt verification read from cookies, can also wrap function inside getServerSideProps
export const withAuthenticated = (fn) => async (req, res) => {
    console.log("into middleware auth...");
    verify(req.cookies["access_token"], process.env.JWT_SECRET, async (err, decodedAccess) => {
        console.log("check if access_token is still valid...");
        if(!err && decodedAccess && decodedAccess.exp > new Date().getSeconds()) { // if access token duration > now, still valid
            console.log("access_token still valid, going to next step...");
            //keep going with api
            return await fn(req, res)
        }
        if (decodedAccess && decodedAccess.exp <= new Date().getSeconds()) { //refresh token check, if less than date now, get new access and refresh token
            console.log("access_token expired, checking refresh token...");
            verify(req.cookies["refresh_token"], process.env.JWT_SECRET, async (err, decodedRefresh) => {
                if(!err && decodedRefresh && decodedRefresh.exp > new Date().getSeconds()) { // still have refresh token, set new access token in response
                    console.log("refresh_token still valid, generate new tokens...");

                    //create new tokens

                    //sign token 1 hour access token
                    const jwt_token = sign(decodedAccess.claims, process.env.JWT_SECRET, {expiresIn : process.env.ACCESS_TOKEN_DURATION, subject: 'user_access'})
                    
                    //sign token refresh 4 h
                    const jwt_token_refresh = sign(decodedAccess.claims, process.env.JWT_SECRET, {expiresIn : process.env.REFRESH_TOKEN_DURATION, subject: 'user_refresh'})

                    createLoginCookie(res, jwt_token, jwt_token_refresh)

                    //keep going with api
                    return await fn(req, res)
                }
            })
        }

        if(err) {
            console.log("error:");
            console.log(err.message);
        }
        // does not have refresh or access token, logout, unhautorized
        createLogoutCookie(res)
    })
}