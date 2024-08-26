const { UrlMapping, UrlAnalytics } = require("../model/UrlMapping");
const ShortUniqueId = require('short-unique-id');

// Function to shorten URL
const shortUrl = async function(url) {
    return new Promise(async function(resolve, reject) {
        try {
            const now = new Date();
            const daysToAdd = 5;
            now.setDate(now.getDate() + daysToAdd);
    
            const uid = new ShortUniqueId({length: 8});
            const shortCode = uid.rnd();
    
            // Create new URL mapping
            const urlMapping = new UrlMapping({
                shortCode: shortCode,
                longCode: url,
                createdAt: Date.now(),
                expiresAt: now,
            });
    
            await urlMapping.save(); // Ensure the save operation completes
    
            resolve(shortCode);
        } catch (e) {
            console.error(e);
            reject(e);
        }
    })
}

// Function to get the mapped URL and update analytics
const getMappedUrl = async function(shortCode, ipData, userAgent) {
    return new Promise(async function(resolve, reject) {
        try {
            const result = await UrlMapping.findOne({ shortCode: shortCode });
            if (!result) {
                throw new Error("NOT_FOUND");
            }
    
            // Update the analytics data
            const update = {
                $inc: { clickCount: 1 },
                $set: { lastAccessed: new Date() },
                $push: {
                    accessDetails: {
                        ipAddress: ipData,
                        timestamp: new Date(),
                        userAgent: userAgent
                    }
                }
            };
    
            await UrlAnalytics.updateOne({ shortCode }, update, { upsert: true });
    
            resolve(result);
        } catch (e) {
            reject(e);
        }
    })
};

module.exports = {
    getMappedUrl,
    shortUrl
}
