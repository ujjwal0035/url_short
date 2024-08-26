const urlService = require("../service/ShortService");

async function shortUrlReq(req, res, next) {
    try{
        const url = req.query.url;
        const path = await urlService.shortUrl(url);
        return res.status(200).json({
            "status": "SUCCESS",
            "shortUrl": `http://localhost:8089/short/${path}`
        })
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

async function getMapped(req, res) {
    try{
        const { shortCode } = req.params;
        const path = await urlService.getMappedUrl(shortCode, req.ip);
        return res.redirect(path.longCode);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

module.exports = {
    shortUrlReq,
    getMapped
}