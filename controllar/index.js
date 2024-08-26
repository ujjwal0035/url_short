const {
    createToken,
    deleteToken,
    extendToken
}  = require("./TokenControllar")


const {
    shortUrlReq,
    getMapped
} = require("./ShortControllar");


module.exports = {
    createToken,
    deleteToken,
    extendToken,
    shortUrlReq,
    getMapped
}