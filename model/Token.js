const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema({
    token: { type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    validTill: { type: String, required: true},
    requesterIps: { type: String, required: true},
});


const TokenModel = mongoose.model('TokenModel', tokenSchema, 'token_list');

module.exports = TokenModel;