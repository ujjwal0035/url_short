const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const TokenModel = require('../model/Token');


require('dotenv').config();


async function createToken(ips){
    return new Promise(async function(resolve, reject) {
        try{
            const apiKey = uuidv4();
            const token = jwt.sign({ apiKey }, process.env.JWT_KEY, { expiresIn: '1h' });

            const tokenRepository = new TokenModel({
                token: token,
                validTill: "1h",
                requesterIps: ips,
            })

            await tokenRepository.save();

            resolve(token);
        }catch (e) {
            reject(e);
        }
    });
};

async function deleteToken(token){
    return new Promise(async function(resolve, reject) {
        try{

            const result = await TokenModel.findOneAndDelete({token: token});

            if(!result){
                resolve("NOT_FOUND");
            }

            resolve(result);

        }catch (e) {
            reject(e);
        }
    });
}

async function updateToken(token){
    return new Promise(async function(resolve, reject) {
        try{
            const key = uuidv4();

            const newToken = jwt.sign({key}, process.env.JWT_KEY, { expiresIn: '1h' })

            const result = await TokenModel.findOneAndUpdate({token: token}, {token: newToken, updatedAt: new Date()});

            if(!result){
                resolve("NOT_FOUND");
            }

            resolve(newToken);

        }catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    createToken,
    deleteToken,
    updateToken
}


