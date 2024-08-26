const mongoose = require('mongoose');
const { Schema } = mongoose;

const url = new Schema({ 
    shortCode: { type: String, required: true, unique: true },
    longCode: { type: String, required: true },
    createdAt: { type: String, required: true, default: Date.now() },
    expiresAt: { type: String, default: Date.now() },
})

const urlAnalytics = new Schema({
    shortCode: { type: String, required: true, unique: true },
    clickCount: { type: Number, default: 0 },
    lastAccessed: { type: Date, default: null },
    accessDetails: [ 
        {
            ipAddress: { type: String, required: false }, // Example field
            timestamp: { type: Date, required: true },
            userAgent: { type: String, required: false } // Example field
        }
    ],
})

const UrlMapping =  mongoose.model("UrlMapping", url, "url_mapping");
const UrlAnalytics = mongoose.model("UrlAnalytics", urlAnalytics, "url_analytics");

module.exports = {
    UrlMapping, 
    UrlAnalytics
};