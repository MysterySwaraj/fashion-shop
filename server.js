require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDBStore = require('connect-mongo')

// Database connection
mongoose.connect(process.env.MONGO_CONNECTION_URL , {useNewUrlParser:true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
});

app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: MongoDBStore.create({
      mongoUrl: process.env.MONGO_CONNECTION_URL
  }),
  saveUninitialized: false,
  cookie: { maxAge: 1000*60*60*24 } // 24 hours

}))

app.use(flash())

//Asserts
app.use(express.static('public'))

app.use(express.json())

//global middleware
app.use((req,res,next)  =>{
res.locals.session = req.session
next()
})

// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen(PORT, () => {
  console.log('Listening on port 3000')
})