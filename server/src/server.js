const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const crypto = require('crypto');

const usersRoutes = require("./routes/users");
const productApiRoutes = require('./routes/products');

// const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
// const adminLoggedMiddleware = require('./middlewares/adminLoggedMiddleware');
// const cookiesMiddleware = require("./middlewares/cookiesMiddleware");

const app = express();


require('dotenv').config()
const PORT = process.env.PORT || 4080;

// ***** configurando body-parser *****
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['POST','GET'],
    credentials: true
}));


const secret = crypto.randomBytes(32).toString('hex');
app.use(session(
    {
    secret: secret,
    resave: false,
    saveUninitialized: false
}));

// app.use(userLoggedMiddleware);
// app.use(adminLoggedMiddleware);

// app.use(cookies());
// app.use(cookiesMiddleware);






app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', usersRoutes);
app.use('/api/products', productApiRoutes);


app.listen(PORT, () => {
    console.log(`[server]: running in port: ${PORT}`);
});
