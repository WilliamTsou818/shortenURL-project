const db = require('../../config/mongoose')
const Url = require('../url')

const data = [
  {
    originURL: 'https://www.google.com',
    shortenURL: 'http://localhost:3000/q483a',
    urlCode: 'q483a'
  },
  {
    originURL: 'https://www.youtube.com/',
    shortenURL: 'https://shielded-escarpment-56257.herokuapp.com/p21ad',
    urlCode: 'p21ad'
  }
]

db.once('open', () => {
  Url.create(data)
    .then(() => console.log('Add Url seeder!'))
    .catch(err => console.error(err))
})