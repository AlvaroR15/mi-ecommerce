const express = require("express");
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const usersRoutes = require("./routes/users");
const productApiRoutes = require('./routes/products');

const app = express();

// Load environment variables from .env file
require('dotenv').config();

// Set the port number for the server
const PORT = process.env.PORT || 4080;

// Middleware to parse incoming request bodies
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// CORS configuration to allow requests from specified origins with credentials
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

// Middleware for manage cookies
app.use(cookieParser());


// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes for user-related and product-related APIs
app.use('/api/users',usersRoutes);
app.use('/api/products',productApiRoutes);

// Start the server and listen for incoming requests on specified port
app.listen(PORT, () => {
    console.log(`[server]: running in port: ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
