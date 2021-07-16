const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()
const port = process.env.POST || 3000

require('./config/mongoose')


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
  secret: 'shortenURL',
  resave: false,
  saveUninitialized: true
}))

app.use(flash())
app.use((req, res, next) => {
  res.locals.error_messages = req.flash('error_messages')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${post}`)
})