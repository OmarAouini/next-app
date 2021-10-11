
const accessTokenMaxAge = process.env.ACCESS_TOKEN_DURATION
const refreshTokenMaxAge = process.env.REFRESH_TOKEN_DURATION

import cookie from 'cookie';

/// middleware response
/// create access and refresh token in cookie response
export const createLoginCookie = (res, accessToken, refreshToken) => {

    res.setHeader("Set-Cookie", [
            cookie.serialize("access_token", accessToken, {
            maxAge: accessTokenMaxAge, // cookie has same duration of token
            secure: process.env.NODE_ENV !== "dev",
            httpOnly: true,
            sameSite : "strict",
            path: "/"
        }),
        cookie.serialize("refresh_token", refreshToken, {
            maxAge: refreshTokenMaxAge, // cookie has same duration of token
            secure: process.env.NODE_ENV !== "dev",
            httpOnly: true,
            sameSite : "strict",
            path: "/"
        })
])
}

// middleware response
// set access and refresh token age to 0 to destroy them
export const createLogoutCookie = (res) => {

    res.setHeader("Set-Cookie", [
        cookie.serialize("access_token", "", {
            maxAge: -1,
            path : "/"
      }),
      cookie.serialize("refresh_token", "", {
        maxAge: -1,
        path : "/"
      }),
    ])
}