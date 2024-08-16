const express = require('express')
const app = express()
const port = 3000
const router = require('./routers')
var session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'));
app.use(express.static("style"));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: true
    }
}))

app.use('/', router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})