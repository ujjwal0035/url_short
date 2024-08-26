
const tokenService = require("../service/TokenService");

async function createToken(req, res) {
    try {
        const generatedToken = await tokenService.createToken(req.ip);
        return res.status(200).json({
            status: "SUCCESS",
            token: generatedToken,
            data: ''
        });
    }catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "ERROE",
            token: '',
            error: err.message,
        });
    }
}

async function deleteToken(req, res) {
    const { token } = req.params;
    try {
        const tokenResult = await tokenService.deleteToken(token);
        if(tokenResult !== "NOT_FOUND") {
            return res.status(200).json({
                status: "SUCCESS",
                token: tokenResult,
                message: 'Token Expired'
            });
        }
        return res.status(200).json({
            status: "NOT_FOUND",
            token: token,
            data: ''
        });
    }catch (err) {
        return res.status(500).json({
            status: "ERROE",
            token: '',
            error: err.message,
        });
    }
}
async function extendToken(req, res, next) {
    const { token } = req.params;
    try{
        const tokenResult = await tokenService.updateToken(token);
        if(tokenResult !== "NOT_FOUND") {
            return res.status(200).json({
                status: "SUCCESS",
                oldToken: token,
                newToken: tokenResult,
            });
        }
        return res.status(200).json({
            status: "NOT_FOUND",
            token: token,
            data: ''
        });
    }catch(err){
        return res.status(500).json({
            status: "ERROE",
            token: '',
            error: err.message,
        });
    }
}


module.exports = {
    createToken,
    deleteToken,
    extendToken
};