require('dotenv').config(); // Loads env vars from .env

const express = require('express');
const app = express();
const paymentRouter = require('./payment.js'); // Import your router

app.use(express.json()); // Parse JSON bodies
app.use(express.static('shop')); // Serve frontend files from /shop

app.use('/', paymentRouter); // Mount the payment routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
