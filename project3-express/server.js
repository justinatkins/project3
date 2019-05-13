//requires
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const explainError = require('explain-error')

require('dotenv').config() // this reads env vars in your .env into the object process.env

const PORT = process.env.PORT

require('./db/db')

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

//app.use(methodOverride('_method'));

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

//CONTROLLERS
const userController = require('./controllers/userController')
app.use('/users', userController)
const listController = require('./controllers/listController')
app.use('/lists', listController)
const authController = require('./controllers/authController')
app.use('/auth', authController)
app.use(express.static('public'))

app.get('/', (req, res, next) => {
	res.render('home.ejs')
})

//APP LISTENER

app.list(PORT, () => {
	console.log('listening on port: ', 3000);
})