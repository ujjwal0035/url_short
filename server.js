const express = require('express');
const controllar = require('./controllar');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
console.log('Connected to MongoDB');
}).catch((error) => {
console.error('Connection error', error);
});

app.get('/api/token/new', controllar.createToken);
app.delete('/api/token/delete/:token', controllar.deleteToken);
app.post('/api/token/expire', controllar.deleteToken);
app.post('/api/token/extend/:token', controllar.extendToken);

app.get("/api/short", controllar.shortUrlReq);
app.get("/short/:shortCode", controllar.getMapped);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});