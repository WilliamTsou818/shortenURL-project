const express = require('express')
const router = express.Router()
const URL = require('../../models/url')
const { urlInputValidation, randomUrlCode } = require('../../public/javascripts/utility')

router.get('/', (req, res) => {
  res.render('index')
})


router.post('/', async (req, res) => {
  const inputURL = req.body.originURL.trim()
  const urlValidation = !urlInputValidation(inputURL)
  if(urlValidation) return res.render('index', { urlValidation, inputURL })
  // check if input url is existed 
  const url = await URL.findOne({ originURL: inputURL }).lean()
  if(url) {
    let shortenURL = url.shortenURL
    return res.render('index', { shortenURL, inputURL })
  }
  // generate new url code
  let urlCode = randomUrlCode()
  const urlCodeArr = await URL.find().distinct('urlCode').lean()
  while(urlCodeArr.includes(urlCode)) {
    urlCode = randomUrlCode()
  }
  shortenURL = `${req.headers.host}/${urlCode}`

  return URL.create({
    originURL: inputURL,
    shortenURL,
    urlCode
  })
    .then(() => res.render('index', { shortenURL, inputURL }))
})

router.get('/:id', (req, res) => {
  const urlCode = req.params.id
  if (urlCode === 'favicon.ico') return
  return URL.findOne({ urlCode })
    .lean()
    .then(url => {
      if(!url) return res.redirect('/')
      res.redirect(url.originURL)
    })
    .catch(err => console.error(err))
})

module.exports = router