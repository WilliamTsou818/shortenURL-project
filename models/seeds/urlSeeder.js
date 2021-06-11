const db = require('../../config/mongoose')
const Url = require('../url')

const data = [
  {
    originURL: 'https://forum.gamer.com.tw/C.php?bsn=197&snA=24652&tnum=2',
    shortenURL: 'http://localhost:3000/q483a',
    urlCode: 'q483a'
  },
  {
    originURL: 'https://www.youtube.com/',
    shortenURL: 'http://localhost:3000/p21ad',
    urlCode: 'p21ad'
  }
]

db.once('open', () => {
  Url.create(data)
    .then(() => console.log('Add Url seeder!'))
    .catch(err => console.error(err))
})