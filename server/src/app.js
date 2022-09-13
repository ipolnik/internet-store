require('dotenv').config();
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const productsRoutes = require('./routes/productsRoutes');
const dbConnectCheck = require('../db/dbConnectionCheck')


const app = express();

const contactsRouter = require("./routes/contactsRoute")


app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

const sessionConfig = {
  name: 'NameCookie',
  store: new FileStore(),
  secret: process.env.SESSION_S ?? 'otherkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 10,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));

const corsOptions = {
  credentials: true, 
  origin: 'http://localhost:3000' 
}
app.use(cors(corsOptions));

app.use('/', productsRoutes);
app.use('/contacts', contactsRouter)

app.use((req, res, next) => {
  console.log(req.session);
  next();
})

app.listen(PORT, async () => {
  try {
    await dbConnectCheck();
    console.log('Соединение с базой установлено!');
  } catch (err) {
    console.log(err, 'Ошибка слушателя порта');
  }
  console.log(`Серв еще не отломился на ${PORT} порту!`);
});
