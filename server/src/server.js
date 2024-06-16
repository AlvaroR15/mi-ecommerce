const express = require("express");
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const {v4: uuidv4} = require('uuid');

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

// Session middleware to manage user sessions
app.use(session({
    genid: (req) => {
        return uuidv4();
    },
    secret: 'MySecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60*60*1000,
        secure: false,
        httpOnly: true,
        sameSite: 'lax'
    }
}));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes for user-related and product-related APIs
app.use('/api/users', usersRoutes);
app.use('/api/products', productApiRoutes);

// Start the server and listen for incoming requests on specified port
app.listen(PORT, () => {
    console.log(`[server]: running in port: ${PORT}`);
});
