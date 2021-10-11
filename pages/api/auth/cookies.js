
const accessTokenMaxAge = process.env.ACCESS_TOKEN_DURATION
const refreshTokenMaxAge = process.env.REFRESH_TOKEN_DURATION

/// middleware response
/// create access and refresh token in cookie response
export const createLoginCookie = (res, accessToken, refreshToken) => {

    res.cookie("access_token", JSON.stringify(accessToken), {
        maxAge: accessTokenMaxAge, // cookie has same duration of token
        httpOnly: true,
        sameSite : "strict"
    })

    res.cookie("refresh_token", JSON.stringify(refreshToken), {
        maxAge: refreshTokenMaxAge, //cookie has same duration of refresh token
        httpOnly: true,
        sameSite : "strict"
    })
}


// middleware response
// set access and refresh token age to 0 to destroy them
export const createLogoutCookie = (res) => {

    res.cookie("access_token", "", {
        maxAge: 0, // cookie has same duration of access token
        httpOnly: true,
        sameSite : "strict"
    })

    res.cookie("refresh_token", "", {
        maxAge: 0, //cookie has same duration of refresh token
        httpOnly: true,
        sameSite : "strict"
    })
}