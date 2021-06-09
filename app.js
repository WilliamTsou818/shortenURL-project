const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

require('./config/mongoose')


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})
 

app.post('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`App running on http://localhost:3000`)
})