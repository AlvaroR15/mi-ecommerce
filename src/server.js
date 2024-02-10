const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const path = require('path');
const cookies = require('cookie-parser');

// const productRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const productApiRoutes = require('./routes/products');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const adminLoggedMiddleware = require('./middlewares/adminLoggedMiddleware');
const cookiesMiddleware = require("./middlewares/cookiesMiddleware");

const app = express();


require('dotenv').config()
const PORT = process.env.PORT || 4080;

// ***** configurando body-parser *****
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

app.use(session({secret: "nabrunwotpu"}));

app.use(userLoggedMiddleware);
app.use(adminLoggedMiddleware);

app.use(cookies());
app.use(cookiesMiddleware);

app.use(methodOverride('_method'))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.listen(PORT, () => {
    console.log("\n¡Servidor en línea! :D");
    console.log(`Iniciado en el puerto ${PORT}`);
    console.log(`Ingresá a localhost:${PORT} para empezar a visualizar el sitio`);
});

app.use('/users', usersRoutes);
// app.use('/admin', productRoutes);
app.use('/api/products', productApiRoutes);